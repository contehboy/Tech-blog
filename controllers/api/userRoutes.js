const router = require("express").Router();
const { User } = require("../../models");

// this is at the /api endpoint

// route to verify user login credentials
router.post("/login", async (req, res) => {
  try {
    // validating username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res.status(400).json({ message: "Incorrect username, please try again" });
      return;
    }

    //validating password based on user credentials
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      //res.json({ user: userData, message: "You are now logged in!" });

      // render homepage if valid credentials given by user
      res.render("home");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new user upon submission in user registration form

router.post("/registerUser", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    // save user_id and logged_in into session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

    // render homepage if valid credentials are given
    res.render("home");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  console.log(`\n Logged in: ${req.session.logged_in}  \n`);

  if (req.session.logged_in) {
    res.render("login");
  }
});

// Make new blog post route
router.post("/newPost/makePost", async (req, res) => {
  // validating username
  const userData = await User.findOne({
    where: { username: req.body.username },
  });
  if (!userData) {
    res
      .status(400)
      .json({ message: "Incorrect username, please enter valid username" });
    return;
  }

  const newPost = await User.create(req.body);

  // render homepage if valid credentials are given
  res.render("home");
});

// GET - user by username with associations to blogposts and comments
router.get("/:username", async (req, res) => {
  try {
    console.log(
      `\n Getting data for user with username: ${req.params.username} \n`
    );

    const userData = await User.findOne({
      where: { username: req.params.username },
    });

    // check to see if user data was returned
    if (!userData) {
      res.status(404).json({ message: "No users found with this username" });
    } else {
      res.status(200).json(userData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
