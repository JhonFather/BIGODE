'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pessoas
 * 
 * 
 */

 const Pessoas = use('App/Models/Pessoa')
class PessoaController {
  /**
   * Show a list of all pessoas.
   * GET pessoas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const retornoSQL = await Pessoas.all()

    return retornoSQL
  }

  /**
   * Render a form to be used for creating a new pessoa.
   * GET pessoas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new pessoa.
   * POST pessoas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const pessoa = new Pessoas()

    const {nome, idade, rg, cpf} = request.body;

    pessoa.nome = nome
    pessoa.idade = idade
    pessoa.rg = rg
    pessoa.cpf = cpf

    await pessoa.save()

    return pessoa
  }

  /**
   * Display a single pessoa.
   * GET pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const id = params.id
    const retornoSQL = await Pessoas.find(id)

    return retornoSQL

  }

  /**
   * Render a form to update an existing pessoa.
   * GET pessoas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update pessoa details.
   * PUT or PATCH pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const id = params.id
    const pessoa = await Pessoas.find(id)


    const {nome, idade, rg, cpf} = request.body;

    pessoa.nome = nome
    pessoa.idade = idade
    pessoa.rg = rg
    pessoa.cpf = cpf

    await pessoa.save()

    return pessoa
  }

  /**
   * Delete a pessoa with id.
   * DELETE pessoas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id = params.id

    const pessoa = await Pessoas.find(id)

    await pessoa.delete()

    return "Excluido com sucesso"

  }
}

module.exports = PessoaController
