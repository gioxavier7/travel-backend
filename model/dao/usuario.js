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
                                            email,
                                            username,
                                            foto_perfil,
                                            biografia,
                                            senha,
                                            palavra_chave,
                                            data_conta
                                        )
                                    values (
                                            '${usuario.nome}',
                                            '${usuario.email}',
                                            '${usuario.foto_perfil}',
                                            '${usuario.biografia}',
                                            '${usuario.senha}',
                                            '${usuario.palavra_chave}',
                                            '${usuario.data_conta}',
                                            '${usuario.username}'
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
co