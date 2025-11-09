require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5170;

// Middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x65kkeb.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

app.get("/", (req, res) => {
	res.send("FinEase Server is running soomthly..");
});

async function run() {
	try {
		await client.connect(); // Must be comment before deploy

		// DataBase and Collections Connection
		const database = client.db("finease");
		const transactionsCollection = database.collection("transactions");

		// Insert Transaction
		app.post("/transactions", async (req, res) => {
			const newTransaction = req.body;
			const result = await transactionsCollection.insertOne(
				newTransaction
			);
			res.send(result);
		});

		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
	}
}
run().catch(console.dir);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
