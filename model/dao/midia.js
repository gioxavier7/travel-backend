/**
 * objetivo: model responsável pelo CRUD de dados de midias no banco de dados
 * data: 29/05/2025
 * dev: giovanna
 * versão: 1.0
 */

// import da biblioteca prisma/client
const {PrismaClient} =  require('@prisma/client')

// instanciando (criando um novo objeto) para realizar a manipulacao do script SQL
const prisma = new PrismaClient()

//função para inserir uma nova midia
const insertMidia = async function(midia){
    try {
        let sql = `INSERT INTO tbl_midia (
                                tipo,
                                url,
                                id_viagem
                                ) values (
                                 '${midia.tipo}',
                                 '${midia.url}',
                                 '${midia.id_viagem}'
                                 )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    } catch (error) {
        console.log(error);
        return false
    }
}


//função pra atualizar midia
const updateMidia = async function(midia){
    try {
        let sql = `update tbl_midia set tipo = '${midia.tipo}',
                                                url = '${midia.url}',
                                                id_viagem = '${midia.id_viagem}'
                                            where id=${midia.id}`

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

//função para excluir uma midia existente no banco de dados
const deleteMidia = async function(id){
    try {

        let sql = 'delete from tbl_midia where id='+id

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todas as midias do banco de dados
const selectAllMidia= async function(){
    try {
        let sql = 'select * from tbl_midia order by id desc'

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

//função para listar uma midia pelo ID no banco de dados
const selectByIdMidia = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_midia where id='+id

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

// função para retornar todas as mídias de uma viagem específica
const selectMidiaByIdViagem = async function(idViagem) {
    try {
        let sql = `SELECT * FROM tbl_midia WHERE id_viagem = ${idViagem}`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    insertMidia,
    updateMidia,
    deleteMidia,
    selectAllMidia,
    selectByIdMidia,
    selectMidiaByIdViagem
}