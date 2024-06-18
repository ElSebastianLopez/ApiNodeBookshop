const { Router } = require('express');
const {
	getPedidosByIdUsuarios,
	crearPedidos,
    getDetallesByPedidosId,
    crearPedidosDet,
	// actualizarUsuarios,
	// eliminarUsuario,
	// getByIdUsuarios,
} = require('./Controllers/PedidosController');



const router = Router();

router.get('/:id', getPedidosByIdUsuarios);
router.get('/DetPedidos/:id', getDetallesByPedidosId);
// router.get('/:id', getByIdUsuarios);
router.post('/', crearPedidos);
router.post('/DetPedidos', crearPedidosDet);
// router.put(
// 	'/:id',actualizarUsuarios,
// );

// router.delete('/:id', eliminarUsuario);

module.exports = router;
