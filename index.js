const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDatabase = require("./src/configs/db.config");
dotenv.config();

connectDatabase;

const port = process.env.PORT || 3333;
const isProduction = process.env.NODE_ENV === "production";
const app = express();

app.use(helmet());

const accessLogStream = rfs("access.log", {
  interval: "1d",
  path: join(__dirname, "log"),
});
app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);
app.use(cors());
app.use(express.json());

app.use("/api", require("./src/routes/router").default);

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.get("*", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.listen(port, () => {
  console.log(__dirname);
  console.log(`Server is running on port: ${port}`);
});
