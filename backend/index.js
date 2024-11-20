import express from "express";
import cors from 'cors';
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorHandlerMiddleware.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('LiviFy App is Running');
})

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})