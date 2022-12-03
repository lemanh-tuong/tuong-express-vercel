const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const { v4 } = require("uuid");
const app = express();
const port = process.env.PORT || 49054;

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/posts", (req, res) => {
	const posts = JSON.parse(fs.readFileSync("./posts.json", "utf8"));
	res.json(posts);
});

app.post("/posts", (req, res) => {
	const data = { id: v4(), ...req.body };
	const posts = JSON.parse(fs.readFileSync("./posts.json", "utf8")).concat(data);
	fs.writeFileSync("./posts.json", JSON.stringify(posts, undefined, 2));
	res.json(data);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
