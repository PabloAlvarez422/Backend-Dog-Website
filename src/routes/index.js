const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRouter = require('./dogRouter.js');
const temperamentRouter = require('./temperamentRouter.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs',dogRouter);
router.use('/temperaments',temperamentRouter);


module.exports = router;
