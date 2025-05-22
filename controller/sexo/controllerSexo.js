/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de Sexo
  * Data: 24/04/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const sexoDAO = require('../../model/dao/sexo.js')
const { json } = require('body-parser')

//funcao pra inserir um novo Sexo
const inserirSexo = async function(sexo, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                sexo.nome == undefined || sexo.nome == '' || sexo.nome == null || sexo.nome.length > 50 ||
                sexo.sigla == undefined || sexo.sigla == '' || sexo.sigla == null || sexo.sigla.length > 50
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultSexo = await sexoDAO.insertSexo(sexo)

                if(resultSexo)
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

//funcao pra listar todos as Sexo
const listarSexo = async function(){
    try {
        let dadosSexo = {}

        //chamar a função que retorna os artistas
        let resultSexo = await sexoDAO.selectAllSexo()

        if(resultSexo != false || typeof(resultSexo) == 'object')
        {
            //criando um objeto JSON para retornar a lista de Sexos
            if(resultSexo.length > 0){
                dadosSexo.status = true
                dadosSexo.status_code = 200
                dadosSexo.item = resultSexo.length
                dadosSexo.sexo = resultSexo
                return dadosSexo //200
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

//função para listar uma Sexo pelo ID
const buscarSexo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosSexo = {}
            let resultSexo = await sexoDAO.selectByIdSexo(id)

            if(resultSexo != false || typeof(resultSexo) == 'object'){
                if(resultSexo.length > 0){
                    dadosSexo.status = true
                    dadosSexo.status_code = 200
                    dadosSexo.sexo = resultSexo
                    return dadosSexo //200
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

//função para atualizar uma Sexo existente
const atualizarSexo = async function(sexo, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                sexo.tipo == undefined || sexo.tipo == '' || sexo.tipo == null || sexo.tipo.length > 50 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultSexo = await buscarSexo(id)

                if(resultSexo.status_code == 200){
                    //update
                    sexo.id = id //adiciona o atributo id no json e e coloca o id da Sexo que chegou na controller
                    let result = await sexoDAO.updateSexo(sexo)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultSexo.status_code == 404){
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

//função para excluir uma Sexo existente
const excluirSexo = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultSexo = await buscarSexo(id)

            if(resultSexo.status_code == 200){
                //delete
                let result = await sexoDAO.deleteSexo(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultSexo.status_code == 404){
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
    inserirSexo,
    listarSexo,
    buscarSexo,
    atualizarSexo,
    excluirSexo
}