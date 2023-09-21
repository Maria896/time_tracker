import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {dbConnect} from "./config/db.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cors());





app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
dbConnect()
export default app;