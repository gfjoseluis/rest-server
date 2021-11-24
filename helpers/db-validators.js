const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`el rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya esta registrado`);
    }
}

const existeUsuarioById = async (id ) => {
    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe: ${id}`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioById
}