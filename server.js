var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1} 
    slides[slideIndex-1].style.display = "block"; 
    setTimeout(showSlides, 4000); // Change image every 2 seconds
}

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Setup the express App
var app = express();
var Port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// table array 
var tables = [{
	customerName: "Francis Serrano",
	customerEmail: "fserrano@gmail.com",
	phone: "6192324445",
	tableID:"firstCustomer"

}, {

	customerName: "Richard Ma",
	customerEmail: "rma@gmail.com",
	phone: "6192424445",
	tableID:"secondCustomer"


}, {

	customerName: "Sean Opina",
	customerEmail: "sopina@gmail.com",
	phone: "6192323335",
	tableID:"thirdCustomer"

}];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Get all tables
app.get("/all", function(req, res) {
  res.json(tables);
});

// Search for Specific table (or all tables) - provides JSON
app.get("/api/:tables?", function(req, res) {
  var chosen = req.params.tables;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].tableID) {
        return res.json(tables[i]);
      }
    }
    return res.json(false);
  }
  return res.json(tables);
});

// Create New Table Reservations - takes in JSON input
app.post("/api/new", function(req, res) {
  var newtable = req.body;
  newtable.customerName = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  tables.push(newtable);

  res.json(newtable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});