

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertCategoriaViagem = async function(CategoriaViagem){
try {

    let sql = `insert into tbl_viagem_local  ( 
                                        id_categoria,
                                        id_viagem
                                      ) 
                                        values 
                                      (
                                        ${CategoriaViagem.id_categoria},
                                        ${CategoriaViagem.id_viagem}
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
    console.log(error)
    return false
}
}

const selectAllCategoriaViagem = async function(){

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
    console.log(error)
    return false
  }
}

const selectByIdCategoriaViagem = async function(id){
  try {
    let sql = `select * from tbl_viagem_local where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false

  } catch (error) {
    console.log(error)
    return false
  }
}

const updateCategoriaViagem = async function(CategoriaViagem){
  try {
      let sql = `update tbl_viagem_local set        id_categoria       = ${CategoriaViagem.id_categoria},
                                                    id_viagem      = ${CategoriaViagem.id_viagem}
                                        
                            where id = ${CategoriaViagem.id}                
                            `
      let resultCategoriaViagem = await prisma.$executeRawUnsafe(sql)

      if(resultCategoriaViagem)
        return true
      else
        return false

  } catch (error) {
    console.log(error)
    return false
  }
}

const deleteCategoriaViagem = async function(id){
  try {
    let sql = `delete from tbl_viagem_local where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false

  } catch (error) {
    console.log(error)
    return false
  }
}

const selectLocalByIdViagem = async function(idViagem){
  try {
      let sql = `select tbl_viagem.* from tbl_local
                          inner join tbl_viagem_local
                            on tbl_viagem.id = tbl_viagem_local.id_viagem
                          inner join tbl_local
                            on tbl_local.id = tbl_viagem_local.id_categoria
                      where tbl_viagem.id = ${idViagem}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false

  } catch (error) {
    console.log(error)
    return false
  }
}

const selectViagemByIdLocal = async function(idLocal){
  try {
      let sql = `select tbl_local.* from tbl_viagem
                          inner join tbl_viagem_local
                            on tbl_local.id = tbl_viagem_local.id_categoria
                          inner join tbl_local
                            on tbl_viagem.id = tbl_viagem_local.id_viagem
                      where tbl_local.id = ${idLocal}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false

  } catch (error) {
    console.log(error)
    return false
  }
}


module.exports = {
  insertCategoriaViagem,
  selectAllCategoriaViagem,
  selectByIdCategoriaViagem,
  updateCategoriaViagem,
  deleteCategoriaViagem,
  selectLocalByIdViagem,
  selectViagemByIdLocal
}