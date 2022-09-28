const express = require("express");
const router = new express.Router();
const items = require("../fakeDb");

// 1. GET /items =>
// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
router.get('/', (req, res, next) => {
  try {
    return res.json({ items });
  } catch (err) {
      return next(err)
  }
});

/* 2 POST /items
{“name”:”popsicle”, “price”: 1.45}
=> {“added”: {“name”: “popsicle”, “price”: 1.45 } } */
router.post('/', (req, res, next) => {
  try {
    if (!req.body.name)
      throw { message: "Name is required", status: 400 };
    let newItem = { name: req.body.name, price: req.body.price };
    // console.log(req);
      items.push(newItem);
    return res.status(201).json({ added: newItem });
  } catch (err) {
      return next(err)
  }
});

// 3 GET /items/:name => {“name”: “popsicle”, “price”: 1.45}
router.get('/:name', (req, res, next) => {
  try {
    let foundItem = items.find(prop => prop.name === req.params.name);
    if (foundItem === undefined) 
      throw { message: "Not Found", status: 404 }
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err)
  }
});

/* 4 PATCH /items/:name
{“name”:”new popsicle”, “price”: 2.45}
=> {“updated”: {“name”: “new popsicle”, “price”: 2.45 } } */
router.patch('/:name', (req, res, next) => {
  try {
    let foundItem = items.find(prop => prop.name === req.params.name);
    if (foundItem === undefined)
      throw { message: "Not Found", status: 404 }
    foundItem.name = req.body.name;
    foundItem.price = req.body.price;
    return res.json({ updated: foundItem });
  } catch (err) {
    return next(err)
  }
});

// 5 DELETE /items/:name => {message: “Deleted”}
router.delete('/:name', (req, res, next) => {
  try {
    let foundItem = items.find(prop => prop.name === req.params.name);
    if (foundItem === undefined)
      throw { message: "Not Found", status: 404 }
    items.splice(foundItem, 1);
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return next(err)
  }
});


module.exports = router;