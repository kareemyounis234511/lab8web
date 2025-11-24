// ================================
//  FULL REST API (WORKING VERSION)
// ================================

const express = require("express");
const app = express();
app.use(express.json());

// -----------------------------
// In-Memory Storage
// -----------------------------
let users = [];
let reservations = [];

// -----------------------------
// USERS ENDPOINTS
// -----------------------------

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// POST create user
app.post("/users", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ message: "name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;

  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const exists = users.some(u => u.id == req.params.id);
  if (!exists) return res.status(404).json({ message: "User not found" });

  users = users.filter(u => u.id != req.params.id);
  res.sendStatus(204);
});

// -----------------------------
// RESERVATIONS ENDPOINTS
// -----------------------------

// GET all reservations
app.get("/reservations", (req, res) => {
  res.json(reservations);
});

// GET reservation by ID
app.get("/reservations/:id", (req, res) => {
  const r = reservations.find(x => x.id == req.params.id);
  if (!r) return res.status(404).json({ message: "Reservation not found" });
  res.json(r);
});

// POST create reservation
app.post("/reservations", (req, res) => {
  if (!req.body.userId || !req.body.date || !req.body.time) {
    return res.status(400).json({ message: "userId, date, time are required" });
  }

  const newReservation = {
    id: reservations.length + 1,
    userId: req.body.userId,
    date: req.body.date,
    time: req.body.time
  };

  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

// PUT update reservation
app.put("/reservations/:id", (req, res) => {
  const r = reservations.find(x => x.id == req.params.id);
  if (!r) return res.status(404).json({ message: "Reservation not found" });

  r.userId = req.body.userId ?? r.userId;
  r.date = req.body.date ?? r.date;
  r.time = req.body.time ?? r.time;

  res.json(r);
});

// DELETE reservation
app.delete("/reservations/:id", (req, res) => {
  const exists = reservations.some(x => x.id == req.params.id);
  if (!exists) return res.status(404).json({ message: "Reservation not found" });

  reservations = reservations.filter(x => x.id != req.params.id);
  res.sendStatus(204);
});

// -----------------------------
// SERVER START
// -----------------------------
app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});
