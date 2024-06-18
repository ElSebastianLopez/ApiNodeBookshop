/** @format */

const { Router } = require('express');
const {
	getByIdBooks,
	getBooks,
    crearBook,
	actualizarBook,
	eliminarBook,
} = require('./Controllers/BookController');

const router = Router();

router.get('/', getBooks);
router.get('/:id', getByIdBooks);
router.post('/', crearBook);
router.put(
	'/:id',actualizarBook,
);
router.delete('/:id', eliminarBook);

module.exports = router;
