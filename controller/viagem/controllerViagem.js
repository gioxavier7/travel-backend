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
const controllerViagemLocal = require('../viagem/controllerViagemLocal.js')
const controllerCategoriaViagem = require('../viagem/controllerCategoriaViagem.js')
const buscarMidiaPorViagem = require('../midia/controllerBuscarMidiaPorViagem.js');




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

            // Verificação de campos opcionais
            if (viagem.descricao && viagem.descricao.length > 200) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

            // Pega e remove os locais antes de inserir a viagem
            const locais = viagem.locais;
            delete viagem.locais;

            // Pega e remove as categorias antes de inserir a viagem
            const categorias = viagem.categorias;
            delete viagem.categorias;

            // Insere a viagem no banco
            let resultViagem = await viagemDAO.insertViagem(viagem);

            if (resultViagem) {
                // Vincula os locais
                if (locais && Array.isArray(locais)) {
                    for (let id_local of locais) {
                        const relacao = {
                            id_viagem: resultViagem.id,
                            id_local: id_local
                        };
                        await controllerViagemLocal.inserirViagemLocal(relacao, contentType);
                    }
                }

                // Vincula as categorias
                if (categorias && Array.isArray(categorias)) {
                    for (let id_categoria of categorias) {
                        const relacao = {
                            id_viagem: resultViagem.id,
                            id_categoria: id_categoria
                        };
                        await controllerCategoriaViagem.inserirCategoriaViagem(relacao, contentType);
                    }
                }

                return MESSAGE.SUCCESS_CREATED_ITEM; // 201
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

const listarViagem = async function(){
    try {
        const arrayViagem = [];
        let dadosViagem = {};

        let resultViagem = await viagemDAO.selectAllViagem();

        if (resultViagem != false || typeof(resultViagem) == 'object') {
            if (resultViagem.length > 0) {
                dadosViagem.status = true;
                dadosViagem.status_code = 200;
                dadosViagem.item = resultViagem.length;

                for (let itemViagem of resultViagem) {
                    // Buscar o usuário relacionado
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemViagem.id_usuario);
                    itemViagem.usuario = dadosUsuario.usuario;
                    delete itemViagem.id_usuario;

                    // Buscar os locais relacionados à viagem
                    let dadosLocais = await controllerViagemLocal.buscarLocalPorViagem(itemViagem.id);
                    itemViagem.locais = (dadosLocais.status && Array.isArray(dadosLocais.data)) ? dadosLocais.data : [];

                    // Buscar as categorias relacionadas à viagem
                    let dadosCategorias = await controllerCategoriaViagem.buscarCategoriaPorViagem(itemViagem.id);
                    itemViagem.categorias = (dadosCategorias.status && Array.isArray(dadosCategorias.data)) ? dadosCategorias.data : [];

                    // buscar as midias relacionadas à viagem
                    let dadosMidias = await buscarMidiaPorViagem.buscarMidiaPorViagem(itemViagem.id);
                    itemViagem.midias = (dadosMidias.status && Array.isArray(dadosMidias.midia)) ? dadosMidias.midia : [];


                    arrayViagem.push(itemViagem);
                }

                dadosViagem.viagem = arrayViagem;
                return dadosViagem;
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; // 500
        }

    } catch (error) {
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
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

          if (resultViagem != false || typeof(resultViagem) == 'object') {
            if (resultViagem.length > 0) {
                dadosViagem.status = true;
                dadosViagem.status_code = 200;
                dadosViagem.item = resultViagem.length;

                for (let itemViagem of resultViagem) {
                    // Buscar o usuário relacionado
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemViagem.id_usuario);
                    itemViagem.usuario = dadosUsuario.usuario;
                    delete itemViagem.id_usuario;

                    // Buscar os locais relacionados à viagem
                    let dadosLocais = await controllerViagemLocal.buscarLocalPorViagem(itemViagem.id);
                    itemViagem.locais = (dadosLocais.status && Array.isArray(dadosLocais.data)) ? dadosLocais.data : [];

                    // Buscar as categorias relacionadas à viagem
                    let dadosCategorias = await controllerCategoriaViagem.buscarCategoriaPorViagem(itemViagem.id);
                    itemViagem.categorias = (dadosCategorias.status && Array.isArray(dadosCategorias.data)) ? dadosCategorias.data : [];

                    // buscar as midias relacionadas à viagem
                    let dadosMidias = await buscarMidiaPorViagem.buscarMidiaPorViagem(itemViagem.id);
                    itemViagem.midias = (dadosMidias.status && Array.isArray(dadosMidias.midia)) ? dadosMidias.midia : [];

                    arrayViagem.push(itemViagem);
                }

                dadosViagem.viagem = arrayViagem;
                return dadosViagem;
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

const atualizarViagem = async function(viagem, id, contentType) {
    try {
      if (String(contentType).toLowerCase() === 'application/json') {
        if (
          !viagem.titulo || viagem.titulo.length > 50 ||
          !viagem.visibilidade || viagem.visibilidade.length > 50 ||
          !viagem.data_inicio || viagem.data_inicio.length > 10 ||
          !viagem.data_fim || viagem.data_fim.length > 10 ||
          !viagem.id_usuario || viagem.id_usuario.length > 1 ||
          id == '' || id == undefined || id == null || isNaN(id) || id <= 0
        ) {
          return MESSAGE.ERROR_REQUIRE_FIELDS; //400
        }
  
        if (viagem.descricao && viagem.descricao.length > 200) {
          return MESSAGE.ERROR_REQUIRE_FIELDS; //400
        }
  
        // Verifica se a viagem existe
        let resultViagem = await buscarViagem(id);
  
        if (resultViagem.status_code === 200) {
          // Atualiza dados da viagem
          viagem.id = id;
          let result = await viagemDAO.updateViagem(viagem);
  
          if (result) {
            // Atualiza locais relacionados, se enviados
            if (viagem.locais && Array.isArray(viagem.locais)) {
              // Remove locais atuais
              await controllerViagemLocal.excluirViagemLocal(id);
  
              // Insere os novos locais
              for (let id_local of viagem.locais) {
                const relacao = {
                  id_viagem: id,
                  id_local: id_local
                };
                await controllerViagemLocal.inserirViagemLocal(relacao, contentType);
              }
            }
  
            // Atualiza categorias relacionadas, se enviadas
            if (viagem.categorias && Array.isArray(viagem.categorias)) {
              // Remove categorias atuais
              await controllerCategoriaViagem.excluirCategoriaViagem(id);
  
              // Insere as novas categorias
              for (let id_categoria of viagem.categorias) {
                const relacao = {
                  id_viagem: id,
                  id_categoria: id_categoria
                };
                await controllerCategoriaViagem.inserirCategoriaViagem(relacao, contentType);
              }
            }
  
            return MESSAGE.SUCCESS_UPDATED_ITEM; //200
          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
          }
        } else if (resultViagem.status_code === 404) {
          return MESSAGE.ERROR_NOT_FOUND; //404
        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
        }
      } else {
        return MESSAGE.ERROR_CONTENT_TYPE; //415
      }
    } catch (error) {
      console.log(error);
      return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
  };
  
  

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