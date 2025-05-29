//Import do arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const viagemLocalDAO = require('../../model/dao/viagemLocal.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirViagemLocal = async function(viagemLocal, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    viagemLocal.id_viagem              == ''           || viagemLocal.id_viagem     == undefined    || viagemLocal.id_viagem  == null || isNaN(viagemLocal.id_viagem)  || viagemLocal.id_viagem <=0 ||
                    viagemLocal.id_local             == ''           || viagemLocal.id_local    == undefined    || viagemLocal.id_local == null || isNaN(viagemLocal.id_local) || viagemLocal.id_local<=0
                )
                {
                    return MESSAGE.ERROR_REQUIRE_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultviagem = await viagemLocalDAO.insertViagemLocal(viagemLocal)

                    if(resultviagem)
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

const atualizarViagemLocal = async function( viagemLocal, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                viagemLocal.id_viagem == '' || viagemLocal.id_viagem == undefined || viagemLocal.id_viagem == null || isNaN(viagemLocal.id_viagem) || viagemLocal.id_viagem <= 0 ||
                viagemLocal.id_local == '' || viagemLocal.id_local == undefined || viagemLocal.id_local == null || isNaN(viagemLocal.id_local) || viagemLocal.id_local <= 0
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS
            } else {
                
                let resultViagem = await viagemLocalDAO.selectByIdViagemLocal(parseInt(id))

                if(resultViagem != false || typeof(resultViagem) == 'object'){
                    if(resultViagem.length > 0){

                        viagemLocal.id = parseInt(id)
                        let result = await viagemLocalDAO.updateViagemLocal(categoriaViagem)

                        if(result)
                            return MESSAGE.SUCCESS_UPDATED_ITEM
                        else
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL

                    } else {
                        return MESSAGE.ERROR_NOT_FOUND
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const excluirViagemLocal = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let resultViagemLocal = await viagemLocalDAO.selectByIdViagemLocal(parseInt(id))
            if(resultViagemLocal != false || typeof(resultViagemLocal) == 'object'){
                if(resultViagemLocal.length > 0){
                    let result = await viagemLocalDAO.deleteViagemLocal(parseInt(id))
                    if(result)
                        return MESSAGE.SUCCESS_DELETED_ITEM
                    else
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                } else {
                    return MESSAGE.ERROR_NOT_FOUND
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarViagemlocal = async function(){
    try {
        let dadosViagemLocal = {}

        let resultViagemLocal = await viagemLocalDAO.selectAllViagemLocal()

        if(resultViagemLocal != false || typeof(resultViagemLocal) == 'object'){
            if(resultViagemLocal.length > 0){

                dadosViagemLocal.status = true
                dadosViagemLocal.status_code = 200
                dadosViagemLocal.items = resultViagemLocal.length
                dadosViagemLocal.data = resultViagemLocal
                return dadosViagemLocal

            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.error('Erro ao listar viagem_local:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        
    }
}

const buscarViagemLocal = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let dadosViagemLocal = {}

            let resultViagemLocal = await viagemLocalDAO.selectByIdViagemLocal(parseInt(id))


            if(resultViagemLocal != false || typeof(resultViagemLocal) == 'object'){
                if(resultViagemLocal.length > 0){

                    dadosViagemLocal.status = true
                    dadosViagemLocal.status_code = 200
                    dadosViagemLocal.data = resultViagemLocal

                    return dadosViagemLocal //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.error('Erro ao buscar local_viagem:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarViagemPorLocal = async function(idLocal){
    try {
        if(idLocal == '' || idLocal == undefined || idLocal == null || isNaN(idLocal) || idLocal <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosViagem = {}

            let resultViagem = await viagemLocalDAO.selectViagemByIdLocal(parseInt(idLocal))
            
            if(resultViagem != false || typeof(resultViagem) == 'object'){
                if(resultViagem.length > 0){
                    dadosViagem.status = true
                    dadosViagem.status_code = 200
                    dadosViagem.data = resultViagem

                    return dadosViagem //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        console.error('Erro ao buscar viagem por local:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarLocalPorViagem = async function(idViagem){
    try {
        if(idViagem == '' || idViagem == undefined || idViagem == null || isNaN(idViagem) || idViagem <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosLocal = {}

            let resultLocal = await viagemLocalDAO.selectLocalByIdViagem(parseInt(idViagem))
            
            if(resultLocal != false || typeof(resultLocal) == 'object'){
                if(resultLocal.length > 0){
                    dadosLocal.status = true
                    dadosLocal.status_code = 200
                    dadosLocal.data = resultLocal

                    return dadosLocal //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                
            }
        }

    } catch (error) {
        console.error('Erro ao buscar local por :', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
    }
}




module.exports = {
    inserirViagemLocal,
    atualizarViagemLocal,
    excluirViagemLocal,
    listarViagemlocal,
    buscarLocalPorViagem,
    buscarViagemLocal,
    buscarViagemPorLocal
}