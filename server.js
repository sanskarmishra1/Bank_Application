const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Simple Users
let users = {
    "anch": { password: "1234", balance: 30000, history: [] },
    "sam": { password: "5678", balance: 20000, history: [] }
};

// LOGIN
app.post("/login", (req, res) => {
    let { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        return res.json({ success: true, username });
    }
    res.json({ success: false });
});

// BALANCE
app.get("/balance", (req, res) => {
    let user = req.query.user;
    if (!users[user]) return res.status(400).json({ message: "Invalid user" });
    res.json({ balance: users[user].balance });
});

// TRANSFER
app.post("/transfer", (req, res) => {
    let { from, to, amount } = req.body;

    setTimeout(() => {
        if (!users[from] || !users[to]) {
            return res.json({ message: "Invalid Accounts" });
        }
        if (users[from].balance < amount) {
            return res.json({ message: "Insufficient Balance" });
        }

        users[from].balance -= amount;
        users[to].balance += amount;

        users[from].history.push(`Sent ₹${amount} to ${to}`);
        users[to].history.push(`Received ₹${amount} from ${from}`);

        res.json({ message: "Transfer Successful" });
    }, 900);
});

// HISTORY
app.get("/history", (req, res) => {
    let user = req.query.user;
    if (!users[user]) return res.status(400).json({ message: "Invalid user" });
    res.json(users[user].history);
});

// LOGOUT
app.get("/logout", (_, res) => res.json({ message: "Logged Out" }));

app.listen(3000, () =>
    console.log("Crimson Bank Backend running on port 3000"));