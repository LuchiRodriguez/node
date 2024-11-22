const express = require('express');
const ProductsService = require('../services/productsService');
const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

//Lo que es específico como "/products/filter", debe ir antes de lo que es dinámico como "/products/:id", porque sino este último puede tomar la palabra "filter" como parte del parámetro "id" que espera recibir

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//Manejo de respuestas en base a los estados
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.delete(id);
  res.json(product);
});

module.exports = router;
