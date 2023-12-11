const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.get("/", (req, res) => {
    console.log('okey');
    res.json('okey');
});

const PORT = process.env.PORT;

let port
PORT ? port = "sucess" : port = "fail"

app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
});
