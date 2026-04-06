# 🌍 Where in the World? — Countries App

## 📌 Project Description & Purpose

This project is a full-stack web app that lets users explore countries around the world. Users can search and browse country details, save their favorite countries, and track how many times they've viewed each country's page. The app is connected to a PostgreSQL database and a custom-built Express API.

## 🚀 Live Site

Here's the link to view the live app: https://haine-countries-app.netlify.app/

## 🖼️ Screenshots

![Home page](./version-3/client/public/Screenshot%202026-04-06%20at%2010.46.39 AM.png)

## ✨ Features

This is what you can do on the app:
- Browse and search through countries from around the world
- View detailed info about each country including population, region, and capital
- Save countries to your personal saved list
- Track how many times you've viewed each country's detail page
- Submit a profile form and see a personalized welcome message

## 🛠️ Tech Stack

**Frontend**

- **Languages:** HTML, CSS, JavaScript
- **Framework:** React (Vite)
- **Deployment:** Netlify

**Server/API**

- **Languages:** JavaScript (Node.js)
- **Framework:** Express.js
- **Deployment:** 

**Database**

- **Languages:** SQL (PostgreSQL)
- **Deployment:** Neon.tech

## 🔹 API Documentation

These are the API endpoints I built:
1. `POST /add-one-user` — saves submitted form data to the users table
2. `GET /get-newest-user` — returns the most recently added user
3. `POST /save-one-country` — saves a country to the saved_countries table
4. `GET /get-all-saved-countries` — returns all saved countries
5. `POST /update-one-country-count` — increments the view count for a country

## 🗄️ Database Schema

Here's the SQL I used to create my tables:
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  country_name VARCHAR(255),
  bio TEXT
);

CREATE TABLE saved_countries (
  saved_country_id SERIAL PRIMARY KEY,
  country_name VARCHAR(255)
);

CREATE TABLE country_counts (
  country_count_id SERIAL PRIMARY KEY,
  country_name VARCHAR(255) UNIQUE,
  count INTEGER DEFAULT 0
);
```

## 💭 Reflections

**What I learned:** How to build a backend from scratch using Node.js and Express, connect it to a PostgreSQL database hosted on Neon, and link it all together with a React frontend.

**What I'm proud of:** Getting all the API endpoints working and seeing the data flow from the frontend form all the way into the database and back.

**What challenged me:** Debugging mismatches between my database column names and what the backend code expected.

**Future ideas for how I'd continue building this project:**
1. Add the ability to unsave a country
2. Add user authentication so each user has their own saved list
3. Add a leaderboard showing the most viewed countries

## 🙌 Credits & Shoutouts

- REST Countries API for the country data
- Neon.tech for PostgreSQL database hosting