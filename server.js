const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");
const personRouter = require("./routes/person");

connectDB();
app.use(express.json());
app.use("/api/persons", personRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
