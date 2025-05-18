const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 8000;

let users = [];
let count = 1;

app.get("/users", (req, res) => {
  let filterUsers = users.map((user) => ({
    firstname: user.firstname,
    lastname: user.lastname,
    fullname: user.firstname + " " + user.lastname,
    id: user.id,
  }));
  res.json(filterUsers);
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;

  let foundIndex = findUser(id);

  console.log(foundIndex);

  if (foundIndex === -1) {
    return res.send({ error: "not found user with id : ", id });
  }

  res.json({
    user: users[foundIndex],
  });
});

app.post("/users", (req, res) => {
  let user = req.body;
  console.log("user");
  console.log(user);
  user.id = count;
  users.push(user);
  count++;

  console.log("users");
  console.log(users);

  res.json({
    message: "success",
    user,
  });
});

app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let user = req.body;

  let foundIndex = findUser(id);

  console.log(foundIndex);

  if (foundIndex === -1) {
    return res.send({ error: "not found user with id : ", id });
  }

  users[foundIndex].firstname = user.firstname || users[foundIndex].firstname;
  users[foundIndex].lastname = user.lastname || users[foundIndex].lastname;
  users[foundIndex].age = user.age || users[foundIndex].age;

  res.json({
    message: `update user id ${id} successfully`,
    user: users[foundIndex],
  });
});

app.patch("/users/:id", (req, res) => {
  let id = req.params.id;
  let user = req.body;

  let foundIndex = findUser(id);

  if (foundIndex === -1) {
    return res.send({ error: "not found user with id : ", id });
  }

  if (user.firstname) users[foundIndex].firstname = user.firstname;
  if (user.lastname) users[foundIndex].lastname = user.lastname;
  if (user.age) users[foundIndex].age = user.age;

  res.json({
    message: `patch user id ${id} successfully`,
    user: users[foundIndex],
  });
});

app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  let foundIndex = findUser(id);

  if (foundIndex === -1) {
    return res.send({ error: "not found user with id : ", id });
  }

  let foundUser = users.splice(foundIndex, 1);

  res.json({
    message: `delete user id ${id} successfully`,
    user: foundUser,
  });
});

function findUser(id) {
  return users.findIndex((user) => user.id == id);
}

app.listen(port, (req, res) => {
  console.log("http server run at " + port);
});
