

//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertCategoriaViagem = async function(CategoriaViagem){
try {

    let sql = `insert into tbl_categoria_viagem  ( 
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
    let sql = 'select * from tbl_categoria_viagem order by id desc'

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
    let sql = `select * from tbl_categoria_viagem where id = ${id}`

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
      let sql = `update tbl_categoria_viagem set        id_categoria       = ${CategoriaViagem.id_categoria},
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
    let sql = `delete from tbl_categoria_viagem where id = ${id}`

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

const selectCategoriaByIdViagem = async function(idViagem) {
  try {
    // SQL para buscar todas as categorias vinculadas a uma viagem específica
    let sql = `SELECT tbl_categoria.* 
               FROM tbl_categoria_viagem
               INNER JOIN tbl_categoria
                 ON tbl_categoria.id = tbl_categoria_viagem.id_categoria
               WHERE tbl_categoria_viagem.id_viagem = ${idViagem}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (result)
      return result;
    else
      return false;

  } catch (error) {
    console.log(error);
    return false;
  }
}

const selectViagemByIdCategoria = async function(idCategoria) {
  try {
    // SQL para buscar todas as viagens vinculadas a uma categoria específica
    let sql = `SELECT tbl_viagem.* 
               FROM tbl_categoria_viagem
               INNER JOIN tbl_viagem
                 ON tbl_viagem.id = tbl_categoria_viagem.id_viagem
               WHERE tbl_categoria_viagem.id_categoria = ${idCategoria}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (result)
      return result;
    else
      return false;

  } catch (error) {
    console.log(error);
    return false;
  }
}





module.exports = {
  insertCategoriaViagem,
  selectAllCategoriaViagem,
  selectByIdCategoriaViagem,
  updateCategoriaViagem,
  deleteCategoriaViagem,
  selectCategoriaByIdViagem,
  selectViagemByIdCategoria
}