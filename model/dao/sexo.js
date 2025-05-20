/**
 * objetivo: model responsável pelo CRUD de dados de sexo no banco de dados
 * data: 17/04/2025
 * dev: giovanna
 * versão: 1.0
 */

// import da biblioteca prisma/client
const {PrismaClient} =  require('@prisma/client')

// instanciando (criando um novo objeto) para realizar a manipulacao do script SQL
const prisma = new PrismaClient()

//função para inserir um novo sexo
const insertSexo = async function(sexo){
    try {
        let sql = `insert into tbl_sexo (
                                            nome,
                                            sigla
                                        )
                                    values (
                                            '${sexo.nome}',
                                            '${sexo.sigla}'
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

//função pra atualizar sexo
const updateSexo = async function(sexo){
    try {
        let sql = `update into tbl_sexo set nome = '${sexo.nome}',
                                                sigla = '${sexo.sigla}'
                                            where id=${sexo.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir uma sexo existente no banco de dados
const deleteSexo = async function(id){
    try {

        let sql = 'delete from tbl_sexo where id='+id

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todos os sexos do banco de dados
const selectAllSexo = async function(){
    try {
        let sql = 'select * from tbl_sexo order by id desc'

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

//função para listar um sexo pelo ID no banco de dados
const selectByIdSexo = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_sexo where id='+id

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
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}