/**
 * objetivo: model responsável pelo CRUD de dados de locais no banco de dados
 * data: 27/05/2025
 * dev: giovanna
 * versão: 1.0
 */

// import da biblioteca prisma/client
const {PrismaClient} =  require('@prisma/client')

// instanciando (criando um novo objeto) para realizar a manipulacao do script SQL
const prisma = new PrismaClient()

//funcao pra inserir um novo local
const insertLocal = async function(local){
    try {
        let sql = `insert into tbl_local(
                        nome,
                        cidade,
                        estado,
                        pais,
                        latitude,
                        longitude
                    ) values (
                        '${local.nome}',
                        ${local.cidade ? `'${local.cidade}'` : null},
                        ${local.estado ? `'${local.estado}'` : null},
                        ${local.pais ? `'${local.pais}'` : null},
                        ${local.latitude ? `'${local.latitude}'` : null},
                        ${local.longitude ? `'${local.longitude}'` : null}
                    )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            let select = 'SELECT * FROM tbl_local ORDER BY id DESC LIMIT 1'
            let result = await prisma.$queryRawUnsafe(select)
            return result[0]
        }
        else
            return false

    } catch (error) {
        return false
    }
}

//função pra atualizar local
const updateLocal = async function(local){
    try {
        let sql = `update tbl_local set nome = '${local.nome}',
                                                cidade = '${local.cidade}',
                                                estado = '${local.estado}',
                                                pais = '${local.pais}',
                                                latitude = '${local.latitude}',
                                                longitude = '${local.longitude}'
                                            where id=${local.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para excluir um local existente no banco de dados
const deleteLocal = async function(id){
    try {

        let sql = 'delete from tbl_local where id='+id

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//função para retornar todos os locais do banco de dados
const selectAllLocal = async function(){
    try {
        let sql = 'select * from tbl_local order by id desc'

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

//função para listar um local pelo ID no banco de dados
const selectByIdLocal = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_local where id='+id

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
    insertLocal,
    updateLocal,
    deleteLocal,
    selectAllLocal,
    selectByIdLocal
}