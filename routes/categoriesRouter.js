const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    price: 2000,
  });
});

module.exports = router;
