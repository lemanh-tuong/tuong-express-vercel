const express = require("express");
const fs = require("fs");
const { v4 } = require("uuid");
const app = express();

app.use(express.json({ extended: false }));

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
