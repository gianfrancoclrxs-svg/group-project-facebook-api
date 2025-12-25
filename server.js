const express = require("express");
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const path = require("path");
const config = require("./config"); // your FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, CALLBACK_URL

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Session setup
app.use(session({
  secret: "secret_key",
  resave: false,
  saveUninitialized: true
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize/deserialize
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: config.CALLBACK_URL,
    profileFields: ["id","displayName","emails","birthday"]
  },
  function(accessToken, refreshToken, profile, cb) {
    const user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || "No Email",
      birthday: profile._json.birthday || "Not available"
    };
    return cb(null, user);
  }
));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/auth/facebook", passport.authenticate("facebook", {
  scope: ["email", "user_birthday"]
}));

app.get("/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => res.redirect("/profile")
);

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.redirect("/");
  res.sendFile(path.join(__dirname, "public", "profile.html"));
});

// Provide user data (hardcoded friends)
app.get("/profile/data", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: "Not logged in" });

  res.json({
    name: req.user.name || "Test User",
    email: req.user.email || "testuser@example.com",
    birthday: req.user.birthday || "January 1, 2000",
    friends: [
      { name: "Chay Manuel" },
      { name: "Ivan Palma" }
    ]
  });
});

// Provide hardcoded photo
app.get("/profile/photos", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: "Not logged in" });

  res.json([
    { source: "/profile.jpg", name: "Profile Photo" }
  ]);
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

// Redirect unknown routes to homepage
app.get("*", (req, res) => res.redirect("/"));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
