'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .where('id', req.params.id)
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {

/***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['id','name'];


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
  
  knex.select('id', 'name')
    .from('folders')
    .where('id', req.params.id)
    .update(updateObj, ['id', 'name'])
    .then(([result]) => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err=>next(err));
});


router.post('/', (req, res, next) => {
  const { name } = req.body;
  
  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  knex('folders')
    .insert(newItem, ['name'])
    .debug(false)
    .then(([item])=>res.json(item).sendStatus(201).location(`http://${req.headers.host}/notes${item.id}`))
    .catch(err=> {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
    
  knex('folders')
    .where('id', id)
    .del()
    .then(()=> res.sendStatus(204))
    .catch(err=>next(err));
});

module.exports = router;