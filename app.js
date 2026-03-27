const API = "http://localhost:3000";

function login() {
    fetch(API + "/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem("user", data.username);
            document.getElementById("loginSection").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
            document.getElementById("user").innerText = data.username;
        } else {
            document.getElementById("loginMsg").innerText = "❌ Invalid Login!";
        }
    });
}

function checkBalance() {
    fetch(API + "/balance?user=" + sessionStorage.getItem("user"))
        .then(res => res.json())
        .then(data => {
            let box = document.getElementById("balance");
            box.style.display = "block";
            box.innerText = "Balance: ₹" + data.balance;
        });
}

function transfer() {
    fetch(API + "/transfer", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            from: sessionStorage.getItem("user"),
            to: document.getElementById("toUser").value,
            amount: Number(document.getElementById("amount").value)
        })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("transferMsg").innerText = data.message;
    });
}

function getHistory() {
    fetch(API + "/history?user=" + sessionStorage.getItem("user"))
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("history");
            list.innerHTML = "";
            data.forEach(item => {
                let li = document.createElement("li");
                li.innerText = item;
                list.appendChild(li);
            });
        });
}

function logout() {
    sessionStorage.clear();
    location.reload();
}
