'use strict';
const express = require ('express');

const knex = require('../knex');

const router = express.Router();


//Get ALL tags (and search by query)

router.get ('/', (req, res, next) => {

  const searchTerm = req.query.searchTerm;
  knex.select('id', 'name')
    .from('tags')
    .modify(function (queryBuilder) {
      if (searchTerm) {
        queryBuilder.where('name', 'like', `%${searchTerm}%`);
      }
    })
    .then(results => {
      res.json(results);
    })
    .catch (err => next (err));
});

//Get a single tag by id

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex.first('id', 'name')
    .from ('tags')
    .where('tags.id', id)
    .then(result => {
      if (result) {
        res.json(result);
      }
      else {
        next();
      }
    })
    .catch(err => {
      next(err).status(404);
    });
});

/* ========== POST/CREATE ITEM ========== */
router.post('/', (req, res, next) => { 
  const { name } = req.body;
  
  /***** Never trust users. Validate input *****/ 
  if (!name) { 
    const err = new Error('Missing name in request body'); 
    err.status = 400; 
    return next(err); 
  }
  
  const newItem = { name };
  console.log(newItem);

  knex.insert(newItem) 
    .into('tags') 
    .returning(['id', 'name']) 
    .then((results) => { // Uses Array index solution to get first item in results array 
      const result = results[0]; 
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result); 
    }) 
      
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
  const { id, name } = req.body;
  
  const updateObj = { 
    id, name,
  };
  
    /***** Never trust users - validate input *****/
  const updateableFields = ['id', 'name'];
  
  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  
  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  
  knex.update(updateObj)
    .from('tags')
    .returning('id')
    .modify(queryBuilder => {
      if(id && updateObj){
        queryBuilder.where('tags.id', `${id}`);
      }
    })
    .then(([id]) => {
      return knex.select('id', 'name')
        .from('tags')
        .where('tags.id', id);
    })
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});
  
// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
    
  knex('tags')
    .where('id', id)
    .del()
    .then(()=> res.sendStatus(204))
    .catch(err=>next(err));
});

module.exports = router;