var express = require('express')

var peopleData = require("./peopleData.json")
console.log("== peopleData:", peopleData)

var port = process.env.PORT || 8000
var app = express()

app.set("view engine", "ejs")

app.use(express.static('static'))

app.get("/card-test", function (req, res) {
  res.status(200).render("photoCard", {
    url: "https://picsum.photos/512",
    caption: "Some random thing from Lorem Picsum"
  })
})

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/static/people.html')
})

app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase()
  var personData = peopleData[person]
  console.log("  -- personData:", personData)
  if (personData) {
    res.status(200).render("photoPage", {
      name: personData.name,
      photos: personData.photos,
      bannerText: false
    })
  } else {
    next()
  }
})

app.get("/*splat", function (req, res, next) {
  res.status(404).sendFile(__dirname + '/static/404.html')
})

app.listen(port, function (err) {
  if (err) {
    throw err
  }
  console.log("== Server listening on port:", port)
})
