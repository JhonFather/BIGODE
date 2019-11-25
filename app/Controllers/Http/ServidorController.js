'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servidors
 */

const Servidor = use('App/Models/Servidor')
class ServidorController {
  /**
   * Show a list of all servidors.
   * GET servidors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const retornoSQL = await Servidor
      .query()
      .where('MAQU_DS_TIPO_MAQUINA', 'Servidor')
      .fetch()

    return retornoSQL;
  }

  /**
   * Render a form to be used for creating a new servidor.
   * GET servidors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new servidor.
   * POST servidors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single servidor.
   * GET servidors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const id = params.id
    const retornoSQL = await Servidor.find(id)

    return retornoSQL;

  }

  /**
   * Render a form to update an existing servidor.
   * GET servidors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update servidor details.
   * PUT or PATCH servidors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a servidor with id.
   * DELETE servidors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const id = params.id

    const servidor = await Servidor.find(id)

    await servidor.delete()

    return "Excluido com sucesso"
  }
}

module.exports = ServidorController
