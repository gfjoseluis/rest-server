const { Router } = require('express');
const { check } = require('express-validator');
const { esRolValido, emailExiste, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio minimo 6 caracteres').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuariosDelete);

module.exports = router;