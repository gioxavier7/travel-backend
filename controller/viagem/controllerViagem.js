/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de viagem
  * Data: 29/05/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de viagem para manipular o db
const viagemDAO = require('../../model/dao/viagem.js')
const { json } = require('body-parser')

//Import das controlleres para criar as relações com usuario
const controllerUsuario = require('../usuario/controllerUsuario.js')

// função para inserir uma nova viagem
const inserirViagem = async function (viagem, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            // Verificações dos campos obrigatórios
            if (
                !viagem.titulo || viagem.titulo.length > 50 ||
                !viagem.visibilidade || viagem.visibilidade.length > 50 ||
                !viagem.data_inicio || viagem.data_inicio.length > 10 ||
                !viagem.data_fim || viagem.data_fim.length > 10 ||
                !viagem.id_usuario || viagem.id_usuario.length > 1
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

            // verificações dos campos opcionais (só verifica o tamanho se o campo existir)
            if (
                (viagem.descricao && viagem.descricao.length > 200)
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

            let resultViagem = await viagemDAO.insertViagem(viagem);

            if (resultViagem)
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

const listarViagem = async function(){
  try {
      //objeto do tipo array pra utilizar no foreach para carregar os dados do viagem, nacionalidade e sexo
      const arrayViagem = []

      //objeto json
      let dadosViagem = {}

      //chamar a função que retorna os viagems
      let resultViagem = await viagemDAO.selectAllViagem()

      if(resultViagem != false || typeof(resultViagem) == 'object')
      {
          //criando um objeto JSON para retornar a lista de viagems
          if(resultViagem.length > 0){
              dadosViagem.status = true
              dadosViagem.status_code = 200
              dadosViagem.item = resultViagem.length

              //for of para requisição assíncrona e await
              for(itemViagem of resultViagem){
                  //busca os dados do sexo na controller usando o id do sexo
                  let dadosUsuario = await controllerUsuario.buscarUsuario(itemViagem.id_usuario)
                
                  //adicionando um atributo (sexo) no json de viagems
                  itemViagem.usuario = dadosUsuario.usuario
                

                  //remove o atributo id_sexo e id_nacionalidade do json de usuario, pois ja tem o id dentro dos dados de sexo e nacionalidade
                  delete itemViagem.id_usuario

                  //adiciona o json do usuario, agora com os dados de sexo e nacionalidade em um array
                  arrayViagem.push(itemViagem)
              }
              //adiciona o novo array de usuario no json pra retornar no app
              dadosViagem.usuario = arrayViagem

              return dadosViagem
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

const buscarViagem = async function(id){
  try {
      let arrayViagem = []
      
      let dadosViagem = {}

      if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
          return MESSAGE.ERROR_REQUIRE_FIELDS //400
      }else{
          let resultViagem = await viagemDAO.selectByIdViagem(parseInt(id))

          if(resultViagem != false || typeof(resultViagem) == 'object'){
            if(resultViagem.length > 0){
                dadosViagem.status = true
                dadosViagem.status_code = 200
                dadosViagem.item = resultViagem.length
  
                //for of para requisição assíncrona e await
                for(itemViagem of resultViagem){
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemViagem.id_usuario)
                    itemViagem.usuario = dadosUsuario.usuario
                    delete itemViagem.id_usuario
                    arrayViagem.push(itemViagem)
                }
                dadosViagem.usuario = arrayViagem
                return dadosViagem
              }else{
                  return MESSAGE.ERROR_NOT_FOUND //404
              }
          }else{
              return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
          }
      }
  } catch (error) {
      console.log(error);
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

//função para atualizar um usuário existente
const atualizarViagem = async function(viagem, id, contentType){
  try {
      if(String(contentType).toLowerCase() == 'application/json')
      {
          if(
            !viagem.titulo || viagem.titulo.length > 50 ||
            !viagem.visibilidade || viagem.visibilidade.length > 50 ||
            !viagem.data_inicio || viagem.data_inicio.length > 10 ||
            !viagem.data_fim || viagem.data_fim.length > 10 ||
            !viagem.id_usuario || viagem.id_usuario.length > 1 ||
            id == '' || id == undefined || id == null || isNaN(id) || id <= 0
          ){
              return MESSAGE.ERROR_REQUIRE_FIELDS //400
          }else{
              //validar se o id existe no db
              let resultViagem = await buscarViagem(id)
            
              if (
                (viagem.descricao && viagem.descricao.length > 200)
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

              if(resultViagem.status_code == 200){
                  //update
                  viagem.id = id //adiciona o atributo id no json e e coloca o id do usuario que chegou na controller
                  let result = await viagemDAO.updateViagem(viagem)

                  if(result){
                      return MESSAGE.SUCCESS_UPDATED_ITEM //200
                  }else{
                      return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                  }
              }else if(resultViagem.status_code == 404){
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

const excluirViagem = async function(id){
  try {
      if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
          return MESSAGE.ERROR_REQUIRE_FIELDS //400
      }else{
          // validar se o ID existe
          let resultViagem = await buscarViagem(id)

          if(resultViagem.status_code == 200){
              // delete do user
              let result = await viagemDAO.deleteViagem(id)
              if(result){
                  return MESSAGE.SUCCESS_DELETED_ITEM //200
              }else{
                  return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
              }
          }else if(resultviagem.status_code == 404){
              return MESSAGE.ERROR_NOT_FOUND //404
          }else{
              return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
          }
      }
  } catch (error) {
      console.log(error);
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
  }
}

module.exports = {
  inserirViagem,
  listarViagem,
  buscarViagem,
  atualizarViagem,
  excluirViagem
}