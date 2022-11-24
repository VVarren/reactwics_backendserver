const {
	initializeApp,
	applicationDefault,
	cert,
} = require("firebase-admin/app");
const {
	getFirestore,
	Timestamp,
	FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./yorbs.json");
var admin = require("firebase-admin");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://yorbs-63c97-default-rtdb.firebaseio.com",
});

const db = getFirestore();

const blogRef = db.collection("blogs");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const l = [];
app.use(cors());
app.use(express.json());

app.get("/blogs", async (req, res) => {
	let blogArr = [];
	(await blogRef.get()).forEach((doc) => {
		blogArr.push(doc.data());
	});
	res.send(blogArr);
});

app.post("/blog", async (req, res) => {
	console.log(l.push(req.body));
	const docRef = blogRef.doc(Date());
	await docRef.set(req.body);
	res.send("Got a POST request");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
