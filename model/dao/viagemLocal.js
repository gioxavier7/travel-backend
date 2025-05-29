

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertViagemLocal = async function(ViagemLocal){
try {

    let sql = `insert into tbl_viagem_local  ( 
                                        id_local,
                                        id_viagem
                                      ) 
                                        values 
                                      (
                                        ${ViagemLocal.id_local},
                                        ${ViagemLocal.id_viagem}
                                      )`
    //console.log(sql)

    //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
    //saber se deu certo                                  
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false

} catch (error) {
    
    return false
}
}

const selectAllViagemLocal = async function(){

  try {
    //ScriptSQL para retornar todos os dados
    let sql = 'select * from tbl_viagem_local order by id desc'

    //Executa o scriptSQL no BD e aguarda o retorno dos dados
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
      return result
    else
      return false

  } catch (error) {
    return false
  }
}

const selectByIdViagemLocal = async function(id){
  try {
    let sql = `select * from tbl_viagem_local where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false

  } catch (error) {
    return false
  }
}



const updateViagemLocal = async function(ViagemLocal){
  try {
      let sql = `update tbl_viagem_local set        id_local       = ${ViagemLocal.id_local},
                                                    id_viagem      = ${ViagemLocal.id_viagem}
                                        
                            where id = ${ViagemLocal.id}                
                            `
      let resultViagemLocal = await prisma.$executeRawUnsafe(sql)

      if(resultViagemLocal)
        return true
      else
        return false

  } catch (error) {
    return false
  }
}

const deleteViagemLocal = async function(id){
  try {
    let sql = `delete from tbl_viagem_local where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false

  } catch (error) {
    return false
  }
}

const selectLocalByIdViagem = async function(idViagem){
  try {
      let sql = `
        SELECT tbl_local.*
        FROM tbl_local
        INNER JOIN tbl_viagem_local ON tbl_local.id = tbl_viagem_local.id_local
        INNER JOIN tbl_viagem ON tbl_viagem.id = tbl_viagem_local.id_viagem
        WHERE tbl_viagem.id = ${idViagem}
      `

      let result = await prisma.$queryRawUnsafe(sql)
      return result || false

  } catch (error) {
      return false
  }
}

const selectViagemByIdLocal = async function(idLocal){
  try {
      let sql = `
        SELECT tbl_viagem.*
        FROM tbl_viagem
        INNER JOIN tbl_viagem_local ON tbl_viagem.id = tbl_viagem_local.id_viagem
        INNER JOIN tbl_local ON tbl_local.id = tbl_viagem_local.id_local
        WHERE tbl_local.id = ${idLocal}
      `

      let result = await prisma.$queryRawUnsafe(sql)
      return result || false

  } catch (error) {
      return false
  }
}



module.exports = {
  insertViagemLocal,
  selectAllViagemLocal,
  selectByIdViagemLocal,
  updateViagemLocal,
  deleteViagemLocal,
  selectLocalByIdViagem,
  selectViagemByIdLocal
}