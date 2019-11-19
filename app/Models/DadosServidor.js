'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DadosServidor extends Model {
    static get table(){
        return 'TTB_COLETA_DADOS_CODA'
    }

    static get primaryKey(){
        return 'ID_CODA_CD_COLETA'
    }

    static get createdAtColumn(){
        return null;
    }

    static get updatedAtColumn(){
        return null;
    }
}

module.exports = DadosServidor
