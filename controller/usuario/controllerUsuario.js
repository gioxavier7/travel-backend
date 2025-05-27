/**
  * Objetivo: Controller responsável pela manipilação do CRUD de dados de usuário
  * Data: 15/05/2025
  * Dev: Giovanna
  * Versão: 1.0
  */

//import do arquivo de configurações de mensagens de status cpde
const MESSAGE = require('../../modulo/config.js')
 
//import do arquivo DAO de música para manipular o db
const usuarioDAO = require('../../model/dao/usuario.js')
const { json } = require('body-parser')

//Import das controlleres para criar as relações com usuario e sexo
const controllerSexo = require('../../controller/sexo/controllerSexo.js')
const controllerNacionalidade = require('../../controller/nacionalidade/controllerNacionalidade.js')

// função para inserir um novo usuário
const inserirUsuario = async function (usuario, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            // Verificações dos campos obrigatórios
            if (
                !usuario.nome || usuario.nome.length > 50 ||
                !usuario.username || usuario.username.length > 50 ||
                !usuario.email || usuario.email.length > 50 ||
                !usuario.senha || usuario.senha.length > 20 ||
                !usuario.palavra_chave || usuario.palavra_chave.length > 100
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

            // Verificações dos campos opcionais (só verifica o tamanho se o campo existir)
            if (
                (usuario.biografia && usuario.biografia.length > 200) ||
                (usuario.foto_perfil && usuario.foto_perfil.length > 200)
            ) {
                return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
            }

            let resultUsuario = await usuarioDAO.insertUsuario(usuario);

            if (resultUsuario)
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

const listarUsuario = async function(){
    try {
        //objeto do tipo array pra utilizar no foreach para carregar os dados do usuario, nacionalidade e sexo
        const arrayUsuario = []

        //objeto json
        let dadosUsuario = {}

        //chamar a função que retorna os usuarios
        let resultUsuario = await usuarioDAO.selectAllUsuario()

        if(resultUsuario != false || typeof(resultUsuario) == 'object')
        {
            //criando um objeto JSON para retornar a lista de usuarios
            if(resultUsuario.length > 0){
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.item = resultUsuario.length

                //for of para requisição assíncrona e await
                for(itemUsuario of resultUsuario){
                    //busca os dados do sexo na controller usando o id do sexo
                    let dadosSexo = await controllerSexo.buscarSexo(itemUsuario.id_sexo)
                    //busca os dados da nacionalidade na controller usando o id da nacionalidade
                    let dadosNacionalidade = await controllerNacionalidade.buscarNacionalidade(itemUsuario.id_nacionalidade)

                    //adicionando um atributo (sexo) no json de usuarios
                    itemUsuario.sexo = dadosSexo.sexo
                    //adicionando um atrito (nacionalidade) no json de usuario
                    itemUsuario.nacionalidade = dadosNacionalidade.nacionalidade

                    //remove o atributo id_sexo e id_nacionalidade do json de usuario, pois ja tem o id dentro dos dados de sexo e nacionalidade
                    delete itemUsuario.id_sexo
                    delete itemUsuario.id_nacionalidade

                    //adiciona o json do usuario, agora com os dados de sexo e nacionalidade em um array
                    arrayUsuario.push(itemUsuario)
                }
                //adiciona o novo array de usuario no json pra retornar no app
                dadosUsuario.usuario = arrayUsuario

                return dadosUsuario
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

//função para listar um usuario pelo ID
const buscarUsuario = async function(id){
    try {
        let arrayUsuario = []

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            let dadosUsuario = {}
            let resultUsuario = await usuarioDAO.selectByIdUsuario(parseInt(id))

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                    dadosUsuario.status = true
                    dadosUsuario.status_code = 200
                    
                //for of para requisição assíncrona e await
                for(itemUsuario of resultUsuario){
                    //busca os dados do sexo na controller usando o id do sexo
                    let dadosSexo = await controllerSexo.buscarSexo(itemUsuario.id_sexo)
                    //busca os dados da nacionalidade na controller usando o id da nacionalidade
                    let dadosNacionalidade = await controllerNacionalidade.buscarNacionalidade(itemUsuario.id_nacionalidade)

                    //adicionando um atributo (sexo) no json de usuarios
                    itemUsuario.sexo = dadosSexo.sexo
                    //adicionando um atrito (nacionalidade) no json de usuario
                    itemUsuario.nacionalidade = dadosNacionalidade.nacionalidade

                    //remove o atributo id_sexo e id_nacionalidade do json de usuario, pois ja tem o id dentro dos dados de sexo e nacionalidade
                    delete itemUsuario.id_sexo
                    delete itemUsuario.id_nacionalidade

                    //adiciona o json do usuario, agora com os dados de sexo e nacionalidade em um array
                    arrayUsuario.push(itemUsuario)
                }
                //adiciona o novo array de usuario no json pra retornar no app
                dadosUsuario.usuario = arrayUsuario

                return dadosUsuario
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
const atualizarUsuario = async function(usuario, id, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(
                usuario.nome == undefined || usuario.nome == '' || usuario.nome == null || usuario.nome.length > 50 ||
                usuario.username == undefined || usuario.username == '' || usuario.username == null || usuario.username.length > 50 ||
                usuario.email == undefined || usuario.email == '' || usuario.email == null || usuario.email.length > 50 ||
                usuario.senha == undefined || usuario.senha == '' || usuario.senha == null || usuario.senha.length > 20 ||
                usuario.biografia == undefined || usuario.biografia.length > 200 ||
                usuario.foto_perfil == undefined || usuario.foto_perfil > 250 ||
                usuario.palavra_chave == undefined || usuario.palavra_chave == '' || usuario.palavra_chave == null || usuario.palavra_chave.length > 100 ||
                usuario.id_sexo == undefined || usuario.id_sexo == '' ||
                usuario.id_nacionalidade == undefined || usuario.id_nacionalidade == '' ||
                id == '' || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRE_FIELDS //400
            }else{
                //validar se o id existe no db
                let resultUsuario = await buscarUsuario(id)

                if(resultUsuario.status_code == 200){
                    //update
                    usuario.id = id //adiciona o atributo id no json e e coloca o id do usuario que chegou na controller
                    let result = await usuarioDAO.updateUsuario(usuario)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATED_ITEM //200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else if(resultUsuario.status_code == 404){
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

//função para excluir uma música existente
const excluirUsuario = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRE_FIELDS //400
        }else{
            // validar se o ID existe
            let resultUsuario = await buscarUsuario(id)

            if(resultUsuario.status_code == 200){
                // delete do user
                let result = await usuarioDAO.deleteUsuario(id)
                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else if(resultUsuario.status_code == 404){
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

const recuperarSenha = async function(dados) {
    try {
        if (!dados.email || !dados.palavra_recuperacao || !dados.nova_senha)
            return MESSAGE.ERROR_REQUIRE_FIELDS

        let usuarioValido = await usuarioDAO.verificarEmailEPalavra(dados.email, dados.palavra_recuperacao)

        if (!usuarioValido)
            return MESSAGE.ERROR_INVALID_USER 

        let atualizado = await usuarioDAO.atualizarSenha(dados.email, dados.nova_senha)

        if (atualizado)
            return MESSAGE.SUCCESS_UPDATED_ITEM
        else
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL

    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const loginUsuario = async (email, senha) => {
    try {
        if (!email || !senha) {
            return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
        }

        const usuario = await usuarioDAO.selectByEmail(email);

        if (!usuario) {
            return {
                status_code: 401,
                message: 'Email não encontrado.'
            };
        }

        if (usuario.senha !== senha) {
            return {
                status_code: 401,
                message: 'Senha incorreta.'
            };
        }

        return {
            status_code: 200,
            message: 'Login realizado com sucesso.',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                username: usuario.username
            }
        };
    } catch (error) {
        console.log(error);
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};


module.exports = {
    inserirUsuario,
    listarUsuario,
    buscarUsuario,
    atualizarUsuario,
    excluirUsuario,
    recuperarSenha,
    loginUsuario
}