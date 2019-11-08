'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Servidor extends Model {

    static get table(){
        return 'TB_MAQUINA_MAQU'
    }

    static get primaryKey(){
        return 'ID_MAQU_CD_MAQUINA'
    }

    static get createdAtColumn(){
        return null;
    }

    static get updatedAtColumn(){
        return null;
    }
}

module.exports = Servidor
