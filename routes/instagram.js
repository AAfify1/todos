var express = require("express");
var router = express.Router();

db = {
  posts: [
    {
      id: 1,
      image: 1,
      likes: 0,
      author: "Denver",
      authorId: "denver@lcdp.com",
      authorInitials: "D",
    },
    {
      id: 2,
      image: 1,
      likes: 12,
      author: "Helsenki",
      authorId: "helsenki@lcdp.com",
      authorInitials: "H",
    },
  ],
  bucketlists: [
    {
      id: "nairobi@lcdp.com",
      cities: ["London", "Rome", "Paris", "LA"],
    },
    {
      id: "helsenki@lcdp.com",
      cities: ["Cairo", "Barcelona", "Paris", "Texas"],
    },
    {
      id: "denver@lcdp.com",
      cities: ["Cairo", "Rome", "Paris", "Zurich"],
    },
  ],
  users: [
    {
      email: "denver@lcdp.com",
      password: "1234",
      name: "Denver",
      age: 29,
      initials: "D",
    },
    {
      email: "helsenki@lcdp.com",
      password: "1234",
      name: "Helsenki",
      age: 35,
      initials: "H",
    },
    {
      email: "nairobi@lcdp.com",
      password: "1234",
      name: "Nairobi",
      age: 31,
      initials: "N",
    },
  ],
};
/* GET users listing. */
router.get("/users/:email", function (req, res, next) {
  let users = db.users;
  let correctUser = {};

  for (var i = 0; i < users.length; i++) {
    if (users[i].email == req.params.email) {
      correctUser = users[i];
      break;
    }
  }

  res.send([correctUser]);
});

router.get("/posts", function (req, res, next) {
  let posts = db.posts;

  res.send([posts]);
});
router.post("/posts", function (req, res, next) {
  console.log(req.body);

  let post = req.body.post;
  db.posts.push(post);

  res.send([db.posts]);
});

router.get("/bucketlist/:email", function (req, res, next) {
  let bucketlists = db.bucketlists;
  let correctList = {};

  for (var i = 0; i < bucketlists.length; i++) {
    if (bucketlists[i].id == req.params.email) {
      correctList = bucketlists[i];
      break;
    }
  }

  res.send([correctList]);
});
router.put("/bucketlist/:email", function (req, res, next) {
  console.log(req.body);

  let city = req.body.city;
  let bucketlists = db.bucketlists;
  let updatedList = [];
  for (var i = 0; i < bucketlists.length; i++) {
    if (bucketlists[i].id == req.params.email) {
      db.bucketlists[i].cities.push(city);
      updatedList = db.bucketlists[i];
      break;
    }
  }

  res.send([updatedList]);
});
router.delete("/bucketlist/:email/:city", function (req, res, next) {
  console.log(req.body);

  let city = req.params.city;
  console.log("city", city);

  let bucketlists = db.bucketlists;
  console.log(bucketlists);
  let updatedList = [];
  for (var i = 0; i < bucketlists.length; i++) {
    console.log(i, bucketlists.length);
    console.log("bucketlist", bucketlists[i]);
    if (bucketlists[i].id == req.params.email) {
      let cities = bucketlists[i].cities;

      for (var j = 0; j < cities.length; j++) {
        if (cities[j] == city) {
          cities.splice(j, 1);
          console.log("spliced cities", cities);
        }
      }
      db.bucketlists[i].cities = cities;
      updatedList = db.bucketlists[i];
      console.log("updated list", updatedList);
    }
  }

  res.send([updatedList]);
});

module.exports = router;
