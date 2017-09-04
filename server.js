var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var EXPENSES_COLLECTION = "expenses";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// EXPENSES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/expenses"
 *    GET: finds all expenses
 *    POST: creates a new expense
 */

app.get("/api/expenses", function(req, res) {
  var startDate = new Date();
  startDate.setMilliseconds(0);
  startDate.setSeconds(0);
  startDate.setHours(0);
  startDate.setMinutes(0);
  
  db.collection(EXPENSES_COLLECTION).find({
    date: {$gte: startDate.toISOString()}
  }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get expenses.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/expenses", function(req, res) {
  var newExpense = req.body;

  if (!req.body.amount) {
    handleError(res, "Invalid user input", "Must provide an amount.", 400);
  }

  db.collection(EXPENSES_COLLECTION).insertOne(newExpense, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new expense.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/expenses/:id"
 *    GET: find expense by id
 *    PUT: update expense by id
 *    DELETE: delete expense by id
 */

app.get("/api/expenses/:id", function(req, res) {
  db.collection(EXPENSES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/expenses/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(EXPENSES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/expenses/:id", function(req, res) {
  db.collection(EXPENSES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
