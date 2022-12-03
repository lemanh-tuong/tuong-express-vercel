const express = require("express");
const fs = require("fs");
const { v4 } = require("uuid");
const app = express();

app.use(express.json({ extended: false }));

let posts = [];

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/posts", (req, res) => {
	res.json(posts);
});

app.post("/posts", (req, res) => {
	const data = { id: v4(), ...req.body };
	posts.push(data);
	res.json({
		message: "Created",
		info: data,
	});
});

app.delete("/posts/:id", (req, res) => {
	const { id } = req.params;
	posts = posts.filter((post) => post.id !== id);
	res.json({
		message: "Deleted",
	});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
