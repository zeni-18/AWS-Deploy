const express = require("express");
const ProductRoute = require("./routes/productRoute")
const dotenv = require("dotenv");
const connectdb = require("./config/db");
dotenv.config();
connectdb();
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", ProductRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
