const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(bodyParser.json(), cors());
const port = 8000;

// TODO remove
let users = [];
let count = 1;

let conn = null;

const initMySQL = async () => {
  conn = await mysql.createConnection({
    // TODO change to try-js-db when use env
    host: "localhost",
    user: "root",
    password: "root",
    database: "tutorial",
    port: 3306,
  });
};

app.get("/testdb", async (req, res) => {
  try {
    let result = await conn.query("SELECT * FROM users");
    console.log(result);
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching users: ", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/users", async (req, res) => {
  try {
    let result = await conn.query("SELECT id,firstname,lastname FROM users");
    console.log(result);
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching users: ", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/users/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let result = await conn.query("SELECT * FROM users WHERE id=?", [id]);
    console.log(result);

    if (result[0].length == 0) {
      console.log("asdasdasdas");

      throw { message: "Specific user not found", statusCode: 404 };
    }

    res.json(result[0][0]);
  } catch (error) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Error fetching specific user";
    console.error("Error fetching specific user: ", error.message);
    res.status(statusCode).json({ error: message });
  }
});

app.post("/users", async (req, res) => {
  let user = req.body;

  console.log("user", user);

  try {
    let result = await conn.query("INSERT INTO users SET ?", user);
    console.log(result);

    res.json({
      message: "success",
    });
  } catch (error) {
    console.error("Error creating users: ", error.message);
    res.status(500).json({ error: "Error creating users" });
  }
});

app.put("/users/:id", async (req, res) => {
  let user = req.body;
  let id = req.params.id;
  console.log("user", user);

  try {
    let result = await conn.query("UPDATE users SET ? WHERE id=?", [user, id]);
    console.log("result");
    console.log(result);

    if (result[0].affectedRows == 0) {
      throw { message: "Specific user not found", statusCode: 404 };
    }
    res.json({
      message: "Update success",
    });
  } catch (error) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Error updating specific user";
    console.error("Error updating specific user: ", error.message);
    res.status(statusCode).json({ error: message });
  }
});

app.delete("/users/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let result = await conn.query("DELETE FROM users WHERE id=?", [id]);
    console.log(result);

    if (result[0].affectedRows == 0) {
      throw { message: "Specific user not found", statusCode: 404 };
    }

    res.json({ message: "Delete success" });
  } catch (error) {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Error deleting specific user";
    console.error("Error deleting specific user: ", error.message);
    res.status(statusCode).json({ error: message });
  }
});

app.listen(port, async (req, res) => {
  await initMySQL();

  console.log("http server run at " + port);
});
