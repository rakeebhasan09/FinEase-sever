require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5170;

// Middlewares
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x65kkeb.mongodb.net/?appName=Cluster0`;

// const client = new MongoClient(uri, {
// 	serverApi: {
// 		version: ServerApiVersion.v1,
// 		strict: true,
// 		deprecationErrors: true,
// 	},
// });

app.get("/", (req, res) => {
	res.send("Assignment Server is running soomthly..");
});

// async function run() {
// 	try {
// 		await client.connect(); // Must be comment before deploy

// 		// DataBase and Collections Connection
// 		const database = client.db("assignment_DB");
// 		const productsCollection = database.collection("products");

// 		// Products Related API's
// 		// Get All Product
// 		app.get("/products", async (req, res) => {
// 			const cursor = productsCollection.find();
// 			const result = await cursor.toArray();
// 			res.send(result);
// 		});

// 		// Get Single Product
// 		app.get("/products/:id", async (req, res) => {
// 			const { id } = req.params;
// 			const query = { _id: new ObjectId(id) };
// 			const result = await productsCollection.findOne(query);
// 			res.send(result);
// 		});

// 		// Insert A Product
// 		app.post("/products", async (req, res) => {
// 			const newProduct = req.body;
// 			const result = await productsCollection.insertOne(newProduct);
// 			res.send(result);
// 		});

// 		// Update Product
// 		app.patch("/products/:id", async (req, res) => {
// 			const { id } = req.params;
// 			const query = { _id: new ObjectId(id) };
// 			const updateInfo = req.body;
// 			const update = {
// 				$set: {
// 					name: updateInfo.name,
// 					email: updateInfo.email,
// 					mobile: updateInfo.mobile,
// 				},
// 			};

// 			const result = await productsCollection.updateOne(query, update);
// 			res.send(result);
// 		});

// 		app.delete("/products/:id", async (req, res) => {
// 			const { id } = req.params;
// 			const query = { _id: new ObjectId(id) };
// 			const result = await productsCollection.deleteOne(query);
// 			res.send(result);
// 		});

// 		await client.db("admin").command({ ping: 1 });
// 		console.log(
// 			"Pinged your deployment. You successfully connected to MongoDB!"
// 		);
// 	} finally {
// 	}
// }
// run().catch(console.dir);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
