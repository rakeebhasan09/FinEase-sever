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
		// await client.connect(); // Must be comment before deploy

		// DataBase and Collections Connection
		const database = client.db("finease");
		const transactionsCollection = database.collection("transactions");

		// Get All Transaction
		app.get("/transactions", async (req, res) => {
			const email = req.query.email;
			const query = {};
			if (email) {
				query.email = email;
			}
			const cursor = transactionsCollection.find(query).sort({
				created_at: -1,
			});
			const result = await cursor.toArray();
			res.status(200).send(result);
		});

		// Get Transaction By ID
		app.get("/transactions/:id", async (req, res) => {
			const { id } = req.params;
			const query = { _id: new ObjectId(id) };
			const result = await transactionsCollection.findOne(query);
			res.status(200).send(result);
		});

		// Insert Transaction
		app.post("/transactions", async (req, res) => {
			const newTransaction = req.body;
			const result = await transactionsCollection.insertOne(
				newTransaction
			);
			res.send(result);
		});

		// Update Transaction
		app.patch("/transactions/:id", async (req, res) => {
			const { id } = req.params;
			const query = { _id: new ObjectId(id) };
			const updateInfo = req.body;
			const update = {
				$set: {
					transaction_type: updateInfo.transaction_type,
					transaction_category: updateInfo.transaction_category,
					transaction_amount: updateInfo.transaction_amount,
					description: updateInfo.description,
					transaction_date: updateInfo.transaction_date,
				},
			};
			const result = await transactionsCollection.updateOne(
				query,
				update
			);
			res.send(result);
		});

		// Delete Transaction
		app.delete("/transactions/:id", async (req, res) => {
			const { id } = req.params;
			const query = { _id: new ObjectId(id) };
			const result = await transactionsCollection.deleteOne(query);
			res.status(200).send(result);
		});

		// await client.db("admin").command({ ping: 1 });
		// console.log(
		// 	"Pinged your deployment. You successfully connected to MongoDB!"
		// );
	} finally {
	}
}
run().catch(console.dir);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
