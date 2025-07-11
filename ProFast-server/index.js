const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
//firebase SDK

// const serviceAccount = require("./firebase-admin-key.json");
// base64 থেকে JSON এ রূপান্তর
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString(
    "utf8"
  )
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

//Firebase VerifyToken
const tokenFbVerify = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "unauthorized access 1" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.decoded = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden Access 1" });
  }
};
//admin verify
const tokenAdmin = async (req, res, next) => {
  const email = req?.decoded?.email;

  const user = await usersCollection.findOne({ email: email });
  if (!user) {
    return res.status(401).send({ message: "unauthorize access 2" });
  }
  if (user?.role !== "admin") {
    return res.status(403).send({ message: "Forbidden - Not admin" });
  }
  next();
};
//Rider verify
const tokenRider = async (req, res, next) => {
  const email = req?.decoded?.email;

  const user = await usersCollection.findOne({ email: email });
  if (!user) {
    return res.status(401).send({ message: "unauthorize access 2" });
  }
  if (user?.role !== "rider") {
    return res.status(403).send({ message: "Forbidden - Not Rider" });
  }
  next();
};
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
let usersCollection = null;
let riderCollection = null;
let cashoutCollection = null;
async function run() {
  try {
    // Connect to the "sample_mflix" database and access its "movies" collection
    const database = client.db("ProFastDB");
    parcelCollection = database.collection("parcels");
    paymentCollection = database.collection("payments");
    usersCollection = database.collection("users");
    riderCollection = database.collection("riders");
    cashoutCollection = database.collection("cashouts");

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
// *************************************************************************
app.post("/users", async (req, res) => {
  const user = req.body;
  try {
    // 1. Check if email exists
    const existingUser = await usersCollection.findOne({ email: user.email });
    if (existingUser) {
      await usersCollection.updateOne(
        { email: user.email },
        { $set: { last_log_in: new Date().toISOString() } }
      );
      return res.status(409).json({ message: "User already exists" });
    }
    // 2. Insert new user
    const result = await usersCollection.insertOne(user);
    // 3. Return success
    res.status(201).json({
      message: "User created successfully",
      insertedId: result.insertedId,
    });
  } catch (err) {
    console.error("User insert error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
// ***********************************************************************
// parcels related api
app.post("/parcels", async (req, res) => {
  const data = req.body;
  const result = await parcelCollection.insertOne(data);
  res.send(result);
});
app.get("/track-parcels", async (req, res) => {
  const email = req.query.email;
  const filter = { senderEmail: email };
  const result = await parcelCollection.find(filter).toArray();
  res.send(result);
});
// ✅ GET parcels by senderEmail
app.get("/myparcels", tokenFbVerify, async (req, res) => {
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
// *****************parcel assign related api************************
app.get("/parcels", tokenFbVerify, tokenAdmin, async (req, res) => {
  const { deliveryStatus } = req.query;
  console.log(deliveryStatus);
  const filter = deliveryStatus ? { deliveryStatus: deliveryStatus } : {};
  const parcels = await parcelCollection.find(filter).toArray();
  res.send(parcels);
});

app.get("/riders/available", tokenFbVerify, tokenAdmin, async (req, res) => {
  const { upozila } = req.query;
  if (!upozila) return res.status(400).send({ error: "Area is required" });

  const riders = await riderCollection
    .find({ status: "active", upozila: upozila })
    .project({
      riderName: 1,
      email: 1,
    })
    .toArray();

  res.send(riders);
});

app.patch(
  "/parcels/:id/assign-rider",
  tokenFbVerify,
  tokenAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { riderEmail, riderName } = req.body;
    console.log(riderEmail, riderName);
    const result = await parcelCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          assignedRider: { name: riderName, email: riderEmail },
          deliveryStatus: "assigned",
        },
      }
    );

    res.send(result);
  }
);
// *****************pendingDelevery related api*****************************
app.get(
  "/pending-deliveries-parcels",
  tokenFbVerify,
  tokenRider,
  async (req, res) => {
    const { deliveryStatus } = req.query;
    console.log(deliveryStatus);
    const filter = deliveryStatus ? { deliveryStatus: deliveryStatus } : {};
    const parcels = await parcelCollection.find(filter).toArray();
    res.send(parcels);
  }
);
// PATCH: /parcels/:id/update-status
app.patch("/parcels/:id/update-status-and-earning", async (req, res) => {
  const { status, parcelCost } = req.body;
  const { id } = req.params;

  const parcel = await parcelCollection.findOne({ _id: new ObjectId(id) });
  if (!parcel) return res.status(404).send({ error: "Parcel not found" });

  const updateDoc = {
    deliveryStatus: status,
    updated_Deliveryted_at: new Date(),
  };

  // ✅ যদি স্ট্যাটাস "delivered" হয়, তাহলে earningAmount বসাও
  if (status === "delivered") {
    const cost = parseFloat(parcel.parcelCost || parcelCost || 0);
    const isSameDistrict = parcel.senderDistrict === parcel.receiverDistrict;
    const earning = isSameDistrict ? cost * 0.1 : cost * 0.15;

    updateDoc.earningInfo = {
      amount: parseFloat(earning.toFixed(2)),
      isCashedOut: false,
    };
  }

  const result = await parcelCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateDoc }
  );

  res.send({
    message: `✅ Parcel status updated to ${status}${
      status === "delivered" ? " and earning calculated" : ""
    }`,
    result,
  });
});

// **********************complited delreveries parcel**************************
app.get(
  "/complited-deliveries-parcels",
  tokenFbVerify,
  tokenRider,
  async (req, res) => {
    const { deliveryStatus } = req.query;
    console.log(deliveryStatus);
    const filter = deliveryStatus ? { deliveryStatus: deliveryStatus } : {};
    const parcels = await parcelCollection.find(filter).toArray();
    res.send(parcels);
  }
);
app.patch(
  "/parcel/:id/cashout",
  tokenFbVerify,
  tokenRider,
  async (req, res) => {
    const { id } = req.params;

    const parcel = await parcelCollection.findOne({
      _id: new ObjectId(id),
      deliveryStatus: "delivered",
      "earningInfo.isCashedOut": { $ne: true },
    });

    if (!parcel) {
      return res
        .status(404)
        .send({ error: "Parcel not eligible for cashout." });
    }

    const now = new Date();
    const batchId = `SINGLE-CASH-${now.getTime()}`;
    const earning = parcel?.earningInfo?.amount || 0;

    // ✅ Step 1: Update parcel document
    await parcelCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          "earningInfo.isCashedOut": true,
          "earningInfo.cashoutAt": now,
          "earningInfo.cashoutBatchId": batchId,
        },
      }
    );

    // ✅ Step 2: Save to cashouts collection
    const cashoutData = {
      parcelId: parcel._id,
      parcelCode: parcel.parcel_id,
      riderEmail: parcel.assignedRider.email,
      riderName: parcel.assignedRider.name || "N/A",
      amount: earning,
      status: "completed",
      cashedAt: now,
      batchId,
    };

    const result = await cashoutCollection.insertOne(cashoutData);

    res.send({
      message: "✅ Single parcel cashed out",
      insertedId: result.insertedId,
      cashoutInfo: cashoutData,
    });
  }
);
// *************************Rider Earning related api*********************
app.get("/rider/earnings-summary", tokenFbVerify, async (req, res) => {
  const email = req.decoded.email;
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastWeek = new Date(now.setDate(now.getDate() - 7));
  const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
  const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));

  const parcels = await parcelCollection
    .find({
      "assignedRider.email": email,
      deliveryStatus: "delivered",
    })
    .toArray();

  const summary = {
    totalEarning: 0,
    totalCashedOut: 0,
    pendingCashout: 0,
    todayEarning: 0,
    lastWeekEarning: 0,
    lastMonthEarning: 0,
    lastYearEarning: 0,
  };

  parcels.forEach((p) => {
    const updatedAt = new Date(p.updated_Deliveryted_at);
    const amount = p.earningInfo.amount || 0;
    if (p.earningInfo?.isCashedOut) {
      summary.totalCashedOut += amount;
    } else {
      summary.pendingCashout += amount;
    }
    summary.totalEarning += amount;

    if (updatedAt >= today) summary.todayEarning += amount;
    if (updatedAt >= lastWeek) summary.lastWeekEarning += amount;
    if (updatedAt >= lastMonth) summary.lastMonthEarning += amount;
    if (updatedAt >= lastYear) summary.lastYearEarning += amount;
  });

  res.json(summary);
});

//*********************************************************************** */
// created payment intregration system related api
// ✅ GET /payments/user?email=imran@gmail.com

app.get("/payments/user", tokenFbVerify, async (req, res) => {
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
      paymentIntentId: paymentData.paymentIntentId,
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
//***************************Role protected************************************************* */
// GET /api/users/role/:email
app.get("/api/users/role/:email", async (req, res) => {
  const user = await usersCollection.findOne({ email: req.params.email });
  res.send({ role: user?.role || "user" });
});

//************************************************************************** */
/* Admin related 🔍 Search users by (partial) email */
app.get("/search", async (req, res) => {
  const q = req.query.q?.trim();
  if (!q) return res.status(400).json({ error: "query missing" });

  const results = await usersCollection
    .find({ email: { $regex: q, $options: "i" } })
    // .project({ email: 1, createdAt: 1, role: 1 })   // শুধু দরকারি ফিল্ড
    .limit(10)
    .toArray();
  res.json(results);
});
/* ⚙️  Set or remove admin role */
app.patch("/:id/role", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body; // "admin" বা "user"

  if (!["admin", "user"].includes(role))
    return res.status(400).json({ error: "invalid role" });

  const result = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role } }
  );
  res.json(result);
});
//************************************************************************** */
//rider collection
app.post("/rider", async (req, res) => {
  const rider = req.body;
  rider.created_at = new Date().toISOString();
  const result = await riderCollection.insertOne(rider);
  res.send(result);
});
// GET /riders/pending
app.get("/riders/pending", tokenFbVerify, tokenAdmin, async (req, res) => {
  const pending = await riderCollection.find({ status: "pending" }).toArray();
  res.send(pending);
});
//get /riders/active
app.get("/riders/active", tokenFbVerify, tokenAdmin, async (req, res) => {
  const activeRiders = await riderCollection
    .find({ status: "active" })
    .toArray();
  res.send(activeRiders);
});
// PATCH /riders/approve/:id
app.patch(
  "/riders/approve/:id",
  tokenFbVerify,
  tokenAdmin,
  async (req, res) => {
    const id = req.params.id;
    const result = await riderCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "active" } }
    );
    const { email } = await riderCollection.findOne({ _id: new ObjectId(id) });
    usersCollection.updateOne({ email: email }, { $set: { role: "rider" } });
    res.send(result);
  }
);

// Deactived /riders/:id
app.patch("/riders/deactivate/:id", async (req, res) => {
  const id = req.params.id;
  const { email } = req.body;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = { $set: { status: "deactivated" } };
  const result = await riderCollection.updateOne(filter, updateDoc);
  usersCollection.updateOne({ email: email }, { $set: { role: "user" } });
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
