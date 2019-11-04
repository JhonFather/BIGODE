'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Usuario extends Model {

    static get table(){
        return 'TB_USUARIO_USUA'
    }

    static get primaryKey(){
        return 'ID_USUA_CD_USUARIO'
    }

    static get createdAtColumn(){
        return null;
    }

    static get updatedAtColumn(){
        return null;
    }
}



module.exports = Usuario
