/**
 * objetivo: model responsável pelo CRUD de dados de nacionalidade no banco de dados
 * data: 17/04/2025
 * dev: giovanna
 * versão: 1.0
 */

// import da biblioteca prisma/client
const {PrismaClient} =  require('@prisma/client')

// instanciando (criando um novo objeto) para realizar a manipulacao do script SQL
const prisma = new PrismaClient()

//função para inserir um novo nacionalidade
const insertNacionalidade = async function(nacionalidade){
    try {
        let sql = `insert into tbl_nacionalidade (
                                            pais,
                                            sigla
                                        )
                                    values (
                                            '${nacionalidade.pais}',
                                            '${nacionalidade.sigla}'
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

//função pra atualizar nacionalidade
const updateNacionalidade = async function(nacionalidade){
    try {
        let sql = `update into tbl_nacionalidade set pais = '${nacionalidade.pais}',
                                                sigla = '${nacionalidade.sigla}'
                                            where id=${nacionalidade.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir uma nacionalidade existente no banco de dados
const deleteNacionalidade = async function(id){
    try {

        let sql = 'delete from tbl_nacionalidade where id='+id

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todos os nacionalidades do banco de dados
const selectAllNacionalidade = async function(){
    try {
        let sql = 'select * from tbl_nacionalidade order by id desc'

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

//função para listar um nacionalidade pelo ID no banco de dados
const selectByIdNacionalidade = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_nacionalidade where id='+id

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
    insertNacionalidade,
    updateNacionalidade,
    deleteNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade
}