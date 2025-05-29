/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de usuário
  * Data: 15/05/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')

//import do arquivo DAO de midia para manipular o db
const midiaDAO = require('../../model/dao/midia.js')

//import pra fazer a relacao de midia e viagem
const controllerViagem = require('../viagem/controllerViagem.js')

//funcao pra inserir um novo midia
const inserirMidia = async function (midia, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            // verificação dos campos obrigatórios
            if (
                midia.tipo == undefined || midia.tipo == '' || midia.tipo == null ||
                midia.url == undefined || midia.url == '' || midia.url == null || midia.url.length > 500 ||
                midia.id_viagem == undefined || midia.id_viagem == '' || midia.id_viagem == null || midia.id_viagem.length > 1
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

            let resultMidia = await midiaDAO.insertMidia(midia);

            if (resultMidia)
                return MESSAGE.SUCCESS_CREATED_ITEM; // 201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

//funcao pra listar todos os midias
const listarMidia = async function(){
    try {
        const arrayMidias = []

        let dadosMidia = {}

        //chamar a funcao que retorna todos os midias
        let resultMidia = await midiaDAO.selectAllMidia()

        if(resultMidia != false || typeof(resultMidia) == 'object')
        {
            //criando um json pra retornar a lista de midias
            if(resultMidia.length > 0){
                dadosMidia.status = true
                dadosMidia.status_code = 200
                dadosMidia.item = resultMidia.length
                
                for(itemMidia of resultMidia){
                    let dadosViagem = await controllerViagem.buscarViagem(itemMidia.id_viagem)
                    itemMidia.viagem = dadosViagem.usuario
                    delete itemMidia.id_viagem

                    arrayMidias.push(itemMidia)
                }
                dadosMidia.midia = arrayMidias
                return dadosMidia
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

//função para listar um midia pelo ID
const buscarMidia = async function(id){
    try {
        const arrayMidias = []

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosMidia = {}
            let resultMidia = await midiaDAO.selectByIdMidia(id)

            if(resultMidia != false || typeof(resultMidia) == 'object'){

            //criando um json pra retornar a lista de midias
            if(resultMidia.length > 0){
                dadosMidia.status = true
                dadosMidia.status_code = 200
                dadosMidia.item = resultMidia.length
                
                for(itemMidia of resultMidia){
                    let dadosViagem = await controllerViagem.buscarViagem(itemMidia.id_viagem)
                    itemMidia.viagem = dadosViagem.usuario
                    delete itemMidia.id_viagem

                    arrayMidias.push(itemMidia)
                }
                dadosMidia.midia = arrayMidias
                return dadosMidia
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

//função para atualizar um midia existente
const atualizarMidia = async function(midia, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                midia.tipo == undefined || midia.tipo == '' || midia.tipo == null ||
                midia.url == undefined || midia.url == '' || midia.url == null ||
                midia.id_viagem == undefined || midia.id_viagem == '' || midia.id_viagem == null || midia.id_viagem.length > 1 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultMidia = await buscarMidia(id)

                if(resultMidia.status_code == 200){
                    //update
                    midia.id = id //adiciona o atributo id no json e e coloca o id da midia que chegou na controller
                    let result = await midiaDAO.updateMidia(midia)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultMidia.status_code == 404){
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

//função para excluir uma midia existente
const excluirMidia = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultMidia = await buscarMidia(id)

            if(resultMidia.status_code == 200){
                //delete
                let result = await midiaDAO.deleteMidia(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultMidia.status_code == 404){
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
    inserirMidia,
    listarMidia,
    buscarMidia,
    atualizarMidia,
    excluirMidia
}