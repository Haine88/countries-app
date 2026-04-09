
import express from "express";
import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL + "&uselibpqcompat=true",
  ssl: true,
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. addOneUser(name, email,country_name,bio)
async function addOneUser(name, email, country_name, bio) {
  const result = await db.query(
    "INSERT INTO users (name, email, country_name, bio) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, country_name, bio]
  );
  return result.rows[0];
}

// 2. getNewestUser()
async function getNewestUser() {
  const result = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
  );
  return result.rows[0] || null;
}

// 3. saveOneCountry(country_name, country_code)
async function saveOneCountry(country_name) {
  const result = await db.query(
    "INSERT INTO saved_countries (country_name) VALUES ($1) RETURNING *",
    [country_name]
  );
  return result.rows[0];
}

// 4. getAllSavedCountries()
async function getAllSavedCountries() {
  const result = await db.query("SELECT * FROM saved_countries");
  return result.rows;
}

// 5. updateOneCountryCount(country_code)
async function updateOneCountryCount(country_name) {
  const result = await db.query(
    `INSERT INTO country_counts (country_name, count)
     VALUES ($1, 1)
     ON CONFLICT (country_name)
     DO UPDATE SET count = country_counts.count + 1
     RETURNING *`,
    [country_name]
  );
  return result.rows[0];
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. POST /add-one-user
app.post("/add-one-user", async (req, res) => {
  const { name, email, country_name, bio } = req.body;
  const user = await addOneUser(name, email, country_name, bio);
  res.json(user);
});

// 2. GET /get-newest-user
app.get("/get-newest-user", async (req, res) => {
  const user = await getNewestUser();
  res.json(user);
});

// 3. POST /save-one-country
app.post("/save-one-country", async (req, res) => {
  const { country_name } = req.body;
  const country = await saveOneCountry(country_name);
  res.json(country);
});

// 4. GET /get-all-saved-countries
app.get("/get-all-saved-countries", async (req, res) => {
  const countries = await getAllSavedCountries();
  res.json(countries);
});

// 5. POST /update-one-country-count
app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;
  const count = await updateOneCountryCount(country_name);
  res.json(count);
});