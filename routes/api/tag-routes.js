const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
        {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
    ]
})
    .then(tags => res.json(tags))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
        id: req.params.id,
    },
    // ,
    include: [
        {
            //include associated procucts using ProductTag model 
            model: Product,
            through: ProductTag,
        }
    ]
})
    .then(tags => {
        if (!tags) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }
        res.json(tags);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//create new tag 
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name})
    .then(tag => res.json(tag))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // req.body should look like { 
// tag_name: "purple"
  // } 
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
})
    .then(tag => {
        if (!tag[0]) {
            res.status(404).json({ message: 'No tag found with id' });
            return;
        }
        res.json(tag);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete tag by its id value
  Tag.destroy({
    where: {
        id: req.params.id
    }
})
    .then(deletedTag => {
        if (!deletedTag) {
            res.status(404).json({ message: 'Did not delete because no tag found with this id.' });
            return;
        }
        res.json(deletedTag);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
