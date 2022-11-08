require("dotenv").config();
const express = require('express');
const cors = require('cors');

const client = require("./configs/database.js");

client.connect((err) => {
    if (err) {
        console.log(err);
        console.log("Not connected to database");
    }
    else
        console.log("connected to database");
})

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Now, Port:8000 is working!");
})

app.post("/sendquery", (req, res) => {
    const { query, email } = req.body;
    console.log(query, " ", email);

    client.query(`INSERT INTO users(query,email) VALUES ('${query}', '${email}')`).then(data => {
        console.log(data);

        res.status(200).json({
            message: "Query has been successfully sended.",
        })
    }).catch((err) => {
        console.error(err);
    })
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});