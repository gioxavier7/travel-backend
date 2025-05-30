const {PrismaClient} =  require('@prisma/client')

// instanciando (criando um novo objeto) para realizar a manipulacao do script SQL
const prisma = new PrismaClient()

//função para inserir um novo categoria
const insertCategoria = async function(categoria){
    try {
        let sql = `insert into tbl_categoria (
                                            nome_categoria
                                        )
                                    values (
                                            '${categoria.nome_categoria}'
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

const selectAllCategorias = async function(){
    try {
        let sql = 'select * from tbl_categoria order by id desc'

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


const selectByIdCategoria = async function(id){
    try {
        //script sql
        let sql = 'select * from tbl_categoria where id='+id

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

const updateCategoria = async function(categoria){
    try {
        let sql = `UPDATE tbl_categoria SET nome_categoria = '${categoria.nome_categoria}' WHERE id = ${categoria.id}`


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

const deleteCategoria = async function(id) {
    try {
      // Apaga os relacionamentos que usam essa categoria
      await prisma.$executeRawUnsafe(`DELETE FROM tbl_categoria_viagem WHERE id_categoria = ${id}`);
  
      // Apaga a categoria
      let sql = 'DELETE FROM tbl_categoria WHERE id=' + id;
      let result = await prisma.$executeRawUnsafe(sql);
  
      if (result)
        return true;
      else
        return false;
  
    } catch (error) {
      console.log(error);
      return false;
    }
  }



module.exports ={
    insertCategoria,
    selectAllCategorias,
    selectByIdCategoria,
    updateCategoria,
    deleteCategoria
}