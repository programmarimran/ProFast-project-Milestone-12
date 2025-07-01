const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.DB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let parcelCollection = null;
let paymentCollection = null;
async function run() {
  try {
    // Connect to the "sample_mflix" database and access its "movies" collection
    const database = client.db("ProFastDB");
    parcelCollection = database.collection("parcels");
    paymentCollection = database.collection("payments");
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.post("/parcels", async (req, res) => {
  const data = req.body;
  const result = await parcelCollection.insertOne(data);
  res.send(result);
});
app.get("/parcels", async (req, res) => {
  const result = await parcelCollection.find().toArray();
  res.send(result);
});
// ✅ GET parcels by senderEmail
app.get("/myparcels", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).send({ error: "senderEmail query is required" });
  }

  const query = { senderEmail: email };
  const result = await parcelCollection.find(query).toArray();
  res.send(result);
});
app.get("/", (req, res) => {
  res.send("🚚 Parcel Monitoring Server is Running...");
});
app.get("/payment/parcel/:id", async (req, res) => {
  const id = req.params.id;
  const result = await parcelCollection.findOne({ _id: new ObjectId(id) });
  res.send(result);
});
app.delete("/parcels/:id", async (req, res) => {
  const id = req.params.id;
  const result = await parcelCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// created payment intregration system related api
// ✅ GET /payments/user?email=imran@gmail.com

app.get("/payments/user", async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).json({ message: "Email is required." });
    }

    const payments = await paymentCollection
      .find({ userEmail: userEmail }) // filter by email
      .sort({ _id: -1 }) // latest first (MongoDB ObjectId is time-based)
      .toArray();

    res.json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// payment korar onomoti
app.post("/create-payment-intent", async (req, res) => {
  const amountInCents = req.body.amountInCents;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // amount in cents
      currency: "usd",
      // Add any additional options here
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Save payment info after success
app.post("/payments/record", async (req, res) => {
  try {
    const paymentData = req.body;
    const parcelId = paymentData.parcelId;

    // Prevent duplicate entries
    const exists = await paymentCollection.findOne({
      paymentIntentId:paymentData.paymentIntentId,
    });
    if (exists) {
      return res.status(400).json({ message: "Payment already recorded." });
    }

    // Add timestamp manually
    paymentData.paid_at_string = new Date().toISOString();
    paymentData.paid_at = new Date();
    paymentData.isRefunded = false; // default value

    const result = await paymentCollection.insertOne(paymentData);
    res
      .status(201)
      .json({ message: "✅ Payment saved", insertedId: result.insertedId });
    await parcelCollection.updateOne(
      { _id: new ObjectId(parcelId) },
      { $set: { paymentStatus: "paid" } }
    );
  } catch (err) {
    console.error("❌ Error saving payment:", err);
    res
      .status(500)
      .json({ message: "Error saving payment", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
