SELECT * FROM notes;

SELECT * FROM notes LIMIT 5;

SELECT id, title FROM notes
ORDER BY title ASC;

SELECT id, title FROM notes
ORDER BY title DESC;

SELECT * FROM notes
WHERE title = 'The most incredible article about cats you''ll ever read';

SELECT * FROM notes
WHERE title LIKE '%lessons%';

UPDATE notes
SET title = 'New Note Title'
WHERE id ='1003';

UPDATE notes
SET content = 'New Note Content'
WHERE id ='1003';

SELECT * FROM notes
WHERE id ='1003';

INSERT INTO notes (id, title, content, created)
VALUES ('1009', 'Fifteen ways cats can help you live to 100', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', CURRENT_DATE);


SELECT * FROM notes
WHERE id ='1009';

DELETE FROM notes WHERE id = '1001';

ALTER TABLE Notes
ALTER COLUMN id SERIAL;