/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de usuário
  * Data: 15/05/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')

//import do arquivo DAO de local para manipular o db
const localDAO = require('../../model/dao/local.js')

//funcao pra inserir um novo local
const inserirLocal = async function (local, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            // verificação dos campos obrigatórios
            if (
                !local.nome || local.nome.length > 100
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

            // verificações de tamanho para campos opcionais
            if (
                (local.cidade && local.cidade.length > 100) ||
                (local.estado && local.estado.length > 100) ||
                (local.pais && local.pais.length > 100)
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

            // validação de latitude e longitude (opcionais, mas se presentes, precisam ser numéricos)
            if (
                (local.latitude && isNaN(local.latitude)) ||
                (local.longitude && isNaN(local.longitude))
            ) {
                return MESSAGE.ERROR_INVALID_DATA; // 422
            }

            let resultLocal = await localDAO.insertLocal(local); //

            if (resultLocal) {
                // se resultLocal tiver o objeto do local com o ID, vai ser retornado com sucesso
                return { 
                    status: true, 
                    status_code: 201, 
                    message: MESSAGE.SUCCESS_CREATED_ITEM.message,
                    local: resultLocal // retorna o objeto do local com o ID
                };
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

//funcao pra listar todos os locais
const listarLocal = async function(){
    try {
        let dadosLocal = {}

        //chamar a funcao que retorna todos os locais
        let resultLocal = await localDAO.selectAllLocal()

        if(resultLocal != false || typeof(resultLocal) == 'object')
        {
            //criando um json pra retornar a lista de locais
            if(resultLocal.length > 0){
                dadosLocal.status = true
                dadosLocal.status_code = 200
                dadosLocal.item = resultLocal.length
                dadosLocal.local = resultLocal
                return dadosLocal //200
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

//função para listar um local pelo ID
const buscarLocal = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosLocal = {}
            let resultLocal = await localDAO.selectByIdLocal(id)

            if(resultLocal != false || typeof(resultLocal) == 'object'){
                if(resultLocal.length > 0){
                    dadosLocal.status = true
                    dadosLocal.status_code = 200
                    dadosLocal.local = resultLocal
                    return dadosLocal //200
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

//função para atualizar um local existente
const atualizarLocal = async function(local, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                local.nome == undefined || local.nome == '' || local.nome == null || local.nome.length > 50 ||
                local.cidade == undefined || local.cidade == '' || local.cidade == null || local.cidade.length > 50 ||
                local.estado == undefined || local.estado == '' || local.estado == null || local.estado.length > 50 ||
                local.pais == undefined || local.pais == '' || local.pais == null || local.pais.length > 50 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultLocal = await buscarLocal(id)

                if(resultLocal.status_code == 200){
                    //update
                    local.id = id //adiciona o atributo id no json e e coloca o id da local que chegou na controller
                    let result = await localDAO.updateLocal(local)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultLocal.status_code == 404){
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

//função para excluir uma local existente
const excluirLocal = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultLocal = await buscarLocal(id)

            if(resultLocal.status_code == 200){
                //delete
                let result = await localDAO.deleteLocal(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultLocal.status_code == 404){
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
    inserirLocal,
    listarLocal,
    buscarLocal,
    atualizarLocal,
    excluirLocal
}