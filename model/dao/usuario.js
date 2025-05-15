/**
 * objetivo: model responsável pelo CRUD de dados de usuários no banco de dados
 * data: 17/04/2025
 * dev: giovanna
 * versão: 1.0
 */

// import da biblioteca prisma/client
const {PrismaClient} =  require('@prisma/client')

// instanciando (criando um novo objeto) para realizar a manipulacao do script SQL
const prisma = new PrismaClient()

//função para inserir um novo usuário
const insertUsuario = async function(usuario){
    try {
        let sql = `insert into tbl_usuario (
                                            nome,
                                            username,
                                            email,
                                            senha,
                                            palavra_chave,
                                            biografia,
                                            data_conta,
                                            foto_perfil
                                        )
                                    values (
                                            '${usuario.nome}',
                                            '${usuario.username}',
                                            '${usuario.email}',
                                            '${usuario.senha}',
                                            '${usuario.palavra_chave}',
                                            '${usuario.biografia}',
                                            '${usuario.data_conta}',
                                            '${usuario.foto_perfil}'
                                            )`

        //executa o script sql do banco de dados e aguarda o retorno 
        let result  = await prisma .$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função pra atualizar usuário
const updateUsuario = async function(usuario){
    try {
        let sql = `update into tbl_usuario set nome = '${usuario.nome}',
                                                username = '${usuario.username}',
                                                email = '${usuario.email}',
                                                senha = '${usuario.senha}',
                                                palavra_chave = '${usuario.palavra_chave}',
                                                biografia = '${usuario.biografia}',
                                                data_conta = '${usuario.data_conta}',
                                                foto_perfil = '${usuario.foto_perfil}'
                                            where id=${usuario.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir uma usuário existente no banco de dados
const deleteUsuario = async function(id){
    try {

        let sql = 'delete from tbl_usuario where id='+id

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todos os usuarios do banco de dados
const selectAllUsuario = async function(){
    try {
        let sql = 'select * from tbl_usuario order by id desc'

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

//função para listar um usuário pelo ID no banco de dados
const selectByIdUsuario = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_usuario where id='+id

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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selectByIdUsuario
}