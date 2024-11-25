const express = require('express');
const ProductsService = require('../services/productsService');
const { validatorHandler } = require('../middlewares/validatorHandler');
const {
  createProductDto,
  updateProductDto,
  getProductDto,
} = require('../schemas/productDto');
const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

//Lo que es específico como "/products/filter", debe ir antes de lo que es dinámico como "/products/:id", porque sino este último puede tomar la palabra "filter" como parte del parámetro "id" que espera recibir

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

//Manejo de respuestas en base a los estados
router.get(
  '/:id',
  validatorHandler(getProductDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductDto, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductDto, 'params'),
  validatorHandler(updateProductDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);
  res.json(product);
});

module.exports = router;
