//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const viagemLocalDAO = require('../../model/dao/viagemLocal.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirFilmeGenero = async function(viagemLocal, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    viagemLocal.id_viagem              == ''           || viagemLocal.id_viagem     == undefined    || viagemLocal.id_viagem  == null || isNaN(viagemLocal.id_viagem)  || viagemLocal.id_viagem <=0 ||
                    viagemLocal.id_local             == ''           || viagemLocal.id_local    == undefined    || viagemLocal.id_local == null || isNaN(viagemLocal.id_local) || viagemLocal.id_local<=0
                )
                {
                    return message.ERROR_REQUIRE_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultgenero = await viagemLocalDAO.insertFilmeGenero(viagemLocal)

                    if(resultgenero)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

