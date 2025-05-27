//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const categoriaDAO = require('../../model/dao/categoria.js')
const { json } = require('body-parser')

//funcao pra inserir uma nova categoria
const inserirCategoria = async function(categoria, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                categoria.nome_categoria == undefined || categoria.nome_categoria == '' || categoria.nome_categoria == null || categoria.nome_categoria.length > 45
                ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                let resultCategoria = await categoriaDAO.insertCategoria(categoria)

                if(resultCategoria)
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

//funcao pra listar todas as categorias
const listarCategoria = async function(){
    try {
        let dadosCategoria = {}

        //chamar a função que retorna as categorias
        let resultCategoria = await categoriaDAO.selectAllCategorias()

        if(resultCategoria != false || typeof(resultCategoria) == 'object')
        {
            //criando um objeto JSON para retornar a lista de categorias
            if(resultCategoria.length > 0){
                dadosCategoria.status = true
                dadosCategoria.status_code = 200
                dadosCategoria.item = resultCategoria.length
                dadosCategoria.categoria = resultCategoria
                return dadosCategoria //200
            }else{
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para listar uma categoria pelo ID
const buscarCategoria = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosCategoria = {}
            let resultCategoria = await categoriaDAO.selectByIdCategoria(id)

            if(resultCategoria != false || typeof(resultCategoria) == 'object'){
                if(resultCategoria.length > 0){
                    dadosCategoria.status = true
                    dadosCategoria.status_code = 200
                    dadosCategoria.sexo = resultCategoria
                    return dadosCategoria //200
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

const atualizarCategoria = async function(categoria, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                categoria.nome_categoria == undefined || categoria.nome_categoria == '' || categoria.nome_categoria == null || categoria.nome_categoria.length > 50 ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultCategoria = await buscarCategoria(id)

                if(resultCategoria.status_code == 200){
                    //update
                    categoria.id = id //adiciona o atributo id no json e e coloca o id da categoria que chegou na controller
                    let result = await categoriaDAO.updateCategoria(categoria)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultCategoria.status_code == 404){
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

//função para excluir uma categoria existente
const excluirCategoria = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            //validar se o id existe
            let resultCategoria = await buscarCategoria(id)

            if(resultCategoria.status_code == 200){
                //delete
                let result = await categoriaDAO.deleteCategoria(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultCategoria.status_code == 404){
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
    inserirCategoria,
    listarCategoria,
    buscarCategoria,
    atualizarCategoria,
    excluirCategoria
}