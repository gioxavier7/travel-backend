/**
 * objetivo: model responsável pelo CRUD de dados de viagens no banco de dados
 * data: 29/05/2025
 * dev: giovanna
 * versão: 1.0
 */

// import da biblioteca prisma/client
const {PrismaClient} =  require('@prisma/client')

// instanciando (criando um novo objeto) para realizar a manipulacao do script SQL
const prisma = new PrismaClient()

//função para inserir um novo usuário
const insertViagem = async function(viagem){
    try {
        let sql = `INSERT INTO tbl_viagem (
                                titulo,
                                descricao,
                                data_inicio,
                                data_fim,
                                visibilidade,
                                data_criacao,
                                id_usuario
                                ) values (
                                 '${viagem.titulo}',
                                 ${viagem.descricao ? `'${viagem.descricao}'` : null},
                                 '${viagem.data_inicio}',
                                 '${viagem.data_fim}',
                                 '${viagem.visibilidade}',
                                 ${viagem.data_criacao ? `'${viagem.data_criacao}'` : null},
                                 '${viagem.id_usuario}'
                                 )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let select = 'SELECT * FROM tbl_viagem ORDER BY id DESC LIMIT 1'
            let result = await prisma.$queryRawUnsafe(select)
            return result[0]
        }
        else
            return false

    } catch (error) {
        console.log(error);
        return false
    }
}


//função pra atualizar viagem
const updateViagem = async function(viagem){
    try {
        let sql = `update tbl_viagem set titulo = '${viagem.titulo}',
                                                descricao = '${viagem.descricao}',
                                                data_inicio = '${viagem.data_inicio}',
                                                data_fim = '${viagem.data_fim}',
                                                visibilidade = '${viagem.visibilidade}',
                                                id_usuario= '${viagem.id_usuario}'
                                            where id=${viagem.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error);
        
        return false
    }
}

//função para excluir uma viagem existente no banco de dados
const deleteViagem = async function(id){
    try {

        let sql = 'delete from tbl_viagem where id='+id

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todas as viagens do banco de dados
const selectAllViagem = async function(){
    try {
        let sql = 'select * from tbl_viagem order by id desc'

        //executa o script sql no db e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//função para listar um viagem pelo ID no banco de dados
const selectByIdViagem = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_viagem where id='+id

        //executa o script
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    insertViagem,
    updateViagem,
    deleteViagem,
    selectAllViagem,
    selectByIdViagem
}