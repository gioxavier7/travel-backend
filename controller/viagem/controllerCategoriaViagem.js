// Importando o arquivo de mensagens e status code do projeto
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD de dados no Banco de Dados
const categoriaViagemDAO = require('../../model/DAO/categoriaViagem.js')

// Função para inserir um novo categoria_viagem
const inserirCategoriaViagem = async function(categoriaViagem, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                categoriaViagem.id_categoria == '' || categoriaViagem.id_categoria == undefined || categoriaViagem.id_categoria == null || isNaN(categoriaViagem.id_categoria) || categoriaViagem.id_categoria <= 0 ||
                categoriaViagem.id_viagem == '' || categoriaViagem.id_viagem == undefined || categoriaViagem.id_viagem == null || isNaN(categoriaViagem.id_viagem) || categoriaViagem.id_viagem <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                let result = await categoriaViagemDAO.insertCategoriaViagem(categoriaViagem)
                if(result)
                    return MESSAGE.SUCCESS_CREATED_ITEM
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error('Erro ao inserir categoria_viagem:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para atualizar um categoria_viagem existente
const atualizarCategoriaViagem = async function( categoriaViagem, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json') {
            if (
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0 ||
                categoriaViagem.id_categoria == '' || categoriaViagem.id_categoria == undefined || categoriaViagem.id_categoria == null || isNaN(categoriaViagem.id_categoria) || categoriaViagem.id_categoria <= 0 ||
                categoriaViagem.id_viagem == '' || categoriaViagem.id_viagem == undefined || categoriaViagem.id_viagem == null || isNaN(categoriaViagem.id_viagem) || categoriaViagem.id_viagem <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS
            } else {
                
                let resultCategoriaViagem = await categoriaViagemDAO.selectByIdCategoriaViagem(parseInt(id))

                if(resultCategoriaViagem != false || typeof(resultCategoriaViagem) == 'object'){
                    if(resultCategoriaViagem.length > 0){

                        categoriaViagem.id = parseInt(id)
                        let result = await categoriaViagemDAO.updateCategoriaViagem(categoriaViagem)

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
        console.error('Erro ao atualizar categoria_viagem:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para excluir um categoria_viagem existente
const excluirCategoriaViagem = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS
        } else {
            let resultCategoriaViagem = await categoriaViagemDAO.selectByIdCategoriaViagem(parseInt(id))
            if(resultCategoriaViagem != false || typeof(resultCategoriaViagem) == 'object'){
                if(resultCategoriaViagem.length > 0){
                    let result = await categoriaViagemDAO.deleteCategoriaViagem(parseInt(id))
                    if(result)
                        return MESSAGE.SUCESS_DELETED_ITEM
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
        console.error('Erro ao excluir categoria_viagem:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para listar todos os categoria_viagem
const listarCategoriaViagem = async function(){
    try {
        let dadosCategoriaViagem = {}

        let resultCategoriaViagem = await categoriaViagemDAO.selectAllCategoriaViagem()

        if(resultCategoriaViagem != false || typeof(resultCategoriaViagem) == 'object'){
            if(resultCategoriaViagem.length > 0){

                dadosCategoriaViagem.status = true
                dadosCategoriaViagem.status_code = 200
                dadosCategoriaViagem.items = resultCategoriaViagem.length
                dadosCategoriaViagem.data = resultCategoriaViagem
                return dadosCategoriaViagem

            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        console.error('Erro ao listar categoria_viagem:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para buscar um categoria_viagem pelo ID
const buscarCategoriaViagem = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIELDS
        } else {
            let dadosCategoriaViagem = {}

            let resultCategoriaViagem = await categoriaViagemDAO.selectByIdCategoriaViagem(parseInt(id))

            if(resultCategoriaViagem != false || typeof(resultCategoriaViagem) == 'object'){
                if(resultCategoriaViagem.length > 0){

                    dadosCategoriaViagem.status = true
                    dadosCategoriaViagem.status_code = 200
                    dadosCategoriaViagem.data = resultCategoriaViagem

                    return dadosCategoriaViagem //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.error('Erro ao buscar categoria_viagem:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para buscar categorias por id da desenvolvedora
const buscarCategoriaPorViagem = async function(idViagem){
    try {
        if(idViagem == '' || idViagem == undefined || idViagem == null || isNaN(idViagem) || idViagem <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosCategoria = {}

            let resultCategoria = await categoriaViagemDAO.selectCategoriaByIdViagem(parseInt(idViagem))
            
            if(resultCategoria != false || typeof(resultCategoria) == 'object'){
                if(resultCategoria.length > 0){
                    dadosCategoria.status = true
                    dadosCategoria.status_code = 200
                    dadosCategoria.data = resultCategoria

                    return dadosCategoria //200
                }else{
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        console.error('Erro ao buscar categoria por viagem:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Função para buscar desenvolvedoras por id do categoria
const buscarViagemPorCategoria = async function(idCategoria){
    try {
        if(idCategoria == '' || idCategoria == undefined || idCategoria == null || isNaN(idCategoria) || idCategoria <=0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosViagem = {}

            let resultViagem = await categoriaViagemDAO.selectViagemByIdCategoria(parseInt(idCategoria))
            
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
                console.error('Erro ao buscar viagem por categoria:', error)
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        console.error('Erro ao buscar viagem por categoria:', error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirCategoriaViagem,
    atualizarCategoriaViagem,
    excluirCategoriaViagem,
    listarCategoriaViagem,
    buscarCategoriaViagem,
    buscarCategoriaPorViagem,
    buscarViagemPorCategoria
}