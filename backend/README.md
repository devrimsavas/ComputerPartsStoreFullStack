# C-Parts Inventory Web Application

It displays computer parts from a public API and includes full user authentication and session-based permission handling.

---

## Features

- View computer parts fetched from external REST API
- User Login & Registration
- Authentication-based access:
- Registered users can **Add** and **Edit** parts
- Guest users can only **View**
- Manual Refresh of parts data
- All users stored in a local `users.json` file
- Dynamic UI built with:
- Bootstrap 5
- EJS templates
- Bootstrap Icons
- txtanime.js for animated headings
- In-memory global object holds API data (no database)

---

## Installation

```bash
npm install
```

> Ensure you have **Node.js** installed.

---

## Running the App

### For development (with hot reload):

```bash
npm run dev
```

### For production:

```bash
npm start
```

Then visit the app in your browser:

```
http://localhost:3001
```

---

## Authentication & Roles

### Admin User (predefined)

```json
{
  "username": "Admin",
  "password": "Admin1",
  "role": "admin"
}
```

### New Users

- Register at: `http://localhost:3001/signup`
- Saved in `data/users.json`
- Assigned `role: "user"` by default
- Duplicate usernames are not allowed

---

## Scripts in `package.json`

```json
"scripts": {
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www --watch app --watch routes --watch views"
}
```

---

## Key Folders & Files

```
/routes/
  index.js       -> Handles login, signup, logout
  parts.js       -> Displays and refreshes parts
  part.js        -> Add/Edit parts (protected)
/data/
  users.json     -> Stores registered users
/utils/
  dataStore.js   -> Global parts object + helper methods
/views/
  *.ejs          -> Templated pages
/public/
  /js            -> Client-side logic (fetch, update, login)
  /css           -> Custom styles
```

---

## Main Endpoints

| Method | Endpoint         | Description                       |
| ------ | ---------------- | --------------------------------- |
| GET    | `/`              | Home page                         |
| GET    | `/login`         | Login page                        |
| POST   | `/login`         | Submit login form                 |
| GET    | `/signup`        | Registration page                 |
| POST   | `/signup`        | Register new user                 |
| GET    | `/logout`        | Logout current user               |
| GET    | `/parts`         | Display all parts                 |
| GET    | `/parts/refresh` | Re-fetch from API                 |
| GET    | `/part`          | Add part page (registered only)   |
| POST   | `/part/add`      | Submit new part (registered only) |
| GET    | `/part/edit`     | Edit form (registered only)       |
| POST   | `/part/edit`     | Update part (registered only)     |
| GET    | `/part/:id`      | Get part details by ID            |

---

## Data Reset Notice

- When the app starts or when `Refresh` is clicked, data is **re-fetched** from the API:
  ```
  http://backend.restapi.co.za/items/cparts
  ```
- This **overwrites the in-memory parts object** — locally added parts will be lost unless manually preserved.
- This behavior is expected for the assignment and mimics a reset on each refresh.

---

## Button Visibility Based on Login

- The **"Add Item"** and **"Edit"** buttons are only visible when a user is logged in
- Guest users will see a **disabled edit button** or no access to protected pages
- The navbar also reflects login state:
  - Shows **Sign In** for guests
  - Shows **Log out** and username if authenticated

---
