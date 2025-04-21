var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
//passport and local strategy
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

//function call users from json file
function getUsers() {
  const filePath = path.resolve(__dirname, "../data/users.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

//configure local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      const users = getUsers();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        return done(null, false, { message: "Invalid username or password" });
      }

      return done(null, user);
    }
  )
);

//serialize
passport.serializeUser((user, done) => {
  done(null, user.username); // just store username in session
});

//deserialize
passport.deserializeUser((username, done) => {
  const users = getUsers();
  const user = users.find((u) => u.username === username);
  if (user) {
    done(null, user);
  } else {
    done(new Error("User not found"), null);
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Parts for your needs" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

//login post with passport
router.post("/loginoriginal", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.user = user; // can get in front end
      //return res.redirect("/parts"); // redirect
      return res.status(200).json({ redirectTo: "/parts" });
    });
  })(req, res, next);
});

// login post with passport and role cookie for Next.js
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      //  Set session (for embedded app)
      req.session.user = user;

      //  Set cookies for Next.js middleware to read
      res.cookie("role", user.role, {
        httpOnly: false, // So it's accessible to the browser and Next.js middleware
        sameSite: "lax",
      });

      res.cookie("username", user.username, {
        httpOnly: false,
        sameSite: "lax",
      });

      //  Respond to frontend
      return res.status(200).json({ redirectTo: "/parts" });
    });
  })(req, res, next);
});

//sign up page
router.get("/signup", function (req, res, next) {
  res.render("signup", { title: "login" });
});

//sign up post
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required." });
  }

  const users = getUsers();

  const exists = users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
  if (exists) {
    return res.status(400).json({ error: "Username already taken." });
  }

  // Create new user
  const newUser = {
    username,
    password,
    role: "user", // default role
  };

  users.push(newUser);

  const filePath = path.resolve(__dirname, "../data/users.json");
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

  return res.status(200).json({ message: "User registered successfully." });
});

//logout
router.get("/logout", function (req, res, next) {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//logout for next
router.get("/logout/json", function (req, res, next) {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }

    res.status(200).json({ message: "Logged out" });
  });
});

//session
router.get("/session", (req, res) => {
  if (req.session?.user) {
    return res.json({ user: req.session.user });
  }
  res.json({ user: null });
});

module.exports = router;
