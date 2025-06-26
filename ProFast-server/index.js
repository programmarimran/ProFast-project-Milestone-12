const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
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
async function run() {
  try {
    // Connect to the "sample_mflix" database and access its "movies" collection
    const database = client.db("ProFastDB");
    parcelCollection = database.collection("parcels");
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
app.get("/", (req, res) => {
  res.send("🚚 Parcel Monitoring Server is Running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
