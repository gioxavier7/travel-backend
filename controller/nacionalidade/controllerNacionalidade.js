/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de Nacionalidade
  * Data: 24/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const nacionalidadeDAO = require('../../model/dao/nacionalidade.js')
const { json } = require('body-parser')

//funcao pra inserir um novo Nacionalidade
const inserirNacionalidade = async function(nacionalidade, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                nacionalidade.tipo == undefined || nacionalidade.tipo == '' || nacionalidade.tipo == null || nacionalidade.tipo.length > 50
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultNacionalidade = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

                if(resultNacionalidade)
                    return MESSAGE.SUCCESS_CREATED_ITEM //201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//funcao pra listar todos as Nacionalidade
const listarNacionalidade = async function(){
    try {
        let dadosNacionalidade = {}

        //chamar a função que retorna os artistas
        let resultNacionalidade = await nacionalidadeDAO.selectAllNacionalidade()

        if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object')
        {
            //criando um objeto JSON para retornar a lista de Nacionalidades
            if(resultNacionalidade.length > 0){
                dadosNacionalidade.status = true
                dadosNacionalidade.status_code = 200
                dadosNacionalidade.item = resultNacionalidade.length
                dadosNacionalidade.nacionalidade = resultNacionalidade
                return dadosNacionalidade //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para listar uma Nacionalidade pelo ID
const buscarNacionalidade = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosNacionalidade = {}
            let resultNacionalidade = await nacionalidadeDAO.selectByIdNacionalidade(id)

            if(resultNacionalidade != false || typeof(resultNacionalidade) == 'object'){
                if(resultNacionalidade.length > 0){
                    dadosNacionalidade.status = true
                    dadosNacionalidade.status_code = 200
                    dadosNacionalidade.nacionalidade = resultNacionalidade
                    return dadosNacionalidade //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para atualizar uma Nacionalidade existente
const atualizarNacionalidade = async function(nacionalidade, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                nacionalidade.tipo == undefined || nacionalidade.tipo == '' || nacionalidade.tipo == null || nacionalidade.tipo.length > 50 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultNacionalidade = await buscarNacionalidade(id)

                if(resultNacionalidade.status_code == 200){
                    //update
                    nacionalidade.id = id //adiciona o atributo id no json e e coloca o id da Nacionalidade que chegou na controller
                    let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultNacionalidade.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
             }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para excluir uma Nacionalidade existente
const excluirNacionalidade = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultNacionalidade = await buscarNacionalidade(id)

            if(resultNacionalidade.status_code == 200){
                //delete
                let result = await nacionalidadeDAO.deleteNacionalidade(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultNacionalidade.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    atualizarNacionalidade,
    excluirNacionalidade
}