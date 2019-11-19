'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with usuarios
 */
const Usuario = use('App/Models/Usuario')
class UsuarioController {
  /**
   * Show a list of all usuarios.
   * GET usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const retornoSQL = Usuario.all();

    return retornoSQL;
  }

  /**
   * Render a form to be used for creating a new usuario.
   * GET usuarios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {


  }

  /**
   * Create/save a new usuario.
   * POST usuarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const usuario = new Usuario()


    const { user, email, senha, indicacao, tipo } = request.body;

    //console.log(request.body)

    const verify = await Usuario.findBy('USUA_NO_EMAIL', email);
    if (verify === null) {
      usuario.USUA_NO_USUARIO = user
      usuario.USUA_NO_EMAIL = email
      usuario.USUA_CD_SENHA = senha
      usuario.USUA_NO_INDICACAO = indicacao
      usuario.USUA_TP_USUARIO = tipo

      await usuario.save()

      let response = "Cadastrado com sucesso"

      return response;
    } else {    
        let response = "Usuário já existente"

        return response;     
    }
   
  }

  /**
   * Display a single usuario.
   * GET usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing usuario.
   * GET usuarios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update usuario details.
   * PUT or PATCH usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {

    const id = params.id
    const usuario = await Usuario.find(id)


    const { user, email, senha } = request.body;

    usuario.USUA_NO_USUARIO = user
    usuario.USUA_NO_EMAIL = email
    usuario.USUA_CD_SENHA = senha


    await usuario.save()

    return usuario

  }

  /**
   * Delete a usuario with id.
   * DELETE usuarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const id = params.id

    const usuario = await Usuario.find(id)

    await usuario.delete()

    return "Excluido com sucesso"
  }

  async login({ params, request, response }) {

    const { email, senha } = request.body;

    const retornoSQL = await Usuario.findBy('USUA_NO_EMAIL', email);
    if (retornoSQL === null) {
      let response = { data: null }

      return response;
    } else {
      if (email === retornoSQL.USUA_NO_EMAIL && senha === retornoSQL.USUA_CD_SENHA) {
        let response = { data: retornoSQL }

        return response;
      } else {
        let response = { data: null }

        return response;
      }
    }

  }
}

module.exports = UsuarioController
