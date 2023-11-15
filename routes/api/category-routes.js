const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories

  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
})
    .then(categories => res.json(categories))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
  // be sure to include its associated Products

router.get('/:id',  (req, res) => {

  Category.findOne({
    where: {
        id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
})
    .then(categories => {
        if (!categories) {
            res.status(404).json({message: 'No category with that id'});
            return;}
            res.json(categories);
        })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
  // find one category by its `id` value
  // be sure to include its associated Products


router.post('/', (req, res) => {
  // create a new category
  const newCategory = Category.create({
    category_name: req.body.category_name})
    .then(newCategory=>
      res.json(newCategory)
    ).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
})
    .then(categoryUpdate => {
        if (!categoryUpdate[0]) {
            res.status(404).json({ message: 'No Category found with this id' });
            return;
        }
        res.json(categoryUpdate);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
        id: req.params.id
    }
})
    .then(deleteData => {
        if (!deleteData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
        }
        res.json(deleteData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
