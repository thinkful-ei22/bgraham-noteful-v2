// 'use strict';

// const knex = require('../knex');

// let searchTerm = 'cats';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });



// let testId = 7;
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (testId) {
//       queryBuilder.where('id', `${testId}`);
//     }
//   })
//   // .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });


// let updateObj= {id: 4, title: 'Test title', content: 'test content goes here...'};
// let updateId = updateObj.id;
// let updateTitle = updateObj.title;
// let updateContent = updateObj.content;

// knex
//   .from('notes')
//   .modify(queryBuilder => {
//     if (updateObj) {
//       //console.log(id);
//       queryBuilder.where('notes.id', `${updateId}`)
//         .update({id:`${updateId}` , title: `${updateTitle}`, content:`${updateContent}`});
//     }
//   })
//   .returning(['id', 'title', 'content'])
//   .then(([res]) => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });

// let createdObj = { title: 'Brand New Title', content: 'Brand new Content!!'};



// knex('notes')
//   .insert(createdObj, ['id', 'title', 'content'])
//   .debug(false)
//   .then(([res])=>console.log(res))
//   .catch(err=>console.log(err));

// knex('notes')
//   .select()
//   .orderBy('notes.id')
//   .then(res=>console.log(res));

// let deleteId = 2;
// knex('notes')
//   .where('id', deleteId)
//   .del()
//   .then(res=>console.log(res))
//   .catch(err=>console.log(err));

// knex('notes')
//   .select()
//   .orderBy('notes.id')
//   .then(res=>console.log(res));