const express = require('express');
const app = express();
const itemsRoutes = require("./routes/items");
const ExpressError = require("./expressError");

app.use(express.json());
app.use("/items", itemsRoutes);


//404 handler
app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
});


/** generic error handler */
app.use(function (err, req, res, next) {
    // default status is 500
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});


module.exports = app