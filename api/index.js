import cors from "cors";
import express from "express";

var corsOptions = {
	origin: ["https://smartplant.mqrco.xyz"],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
	res.send(".");
});

app.listen(7428, () => console.log("SmartPlant API is running on port 7428"));
