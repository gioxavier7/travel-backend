/**
 * Objetivo: API responsável pelas requisições do projeto de controle de músicas
 * Data: 13/05/2025
 * Dev: giovanna
 * Versões: 1.0 
 */

/*
      Observações: 
        Para criar a API precisamos instalar:
            ->    express           npm install express --save
            ->    cors              npm install cors --save
            ->    body-parser       npm install body-parser --save
  
        Para criar a conexão com o banco de dados MYSQL precisamos instalar:
            ->    prisma            npm install prisma --save
            ->    prisma/client     npm install @prisma/client --save
        
        Após a instalação do prisma é necessário instalar:
            ->    npx prisma init

        Para sincronizar o prisma com o banco de dados podemos utilizar:
            ->    npx prisma migrate dev
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//import das controllers do projeto
const controllerUsuario = require('./controller/usuario/controllerUsuario.js')
const controllerSexo = require('./controller/sexo/controllerSexo.js')
const controllerNacionalidade = require('./controller/nacionalidade/controllerNacionalidade.js')
const controllerCategoria = require('./controller/categoria/controllerCategoria')
const controllerLocal = require('./controller/local/controllerLocal.js')
const controllerMidia = require('./controller/midia/controllerMidia.js')
const controllerViagem = require('./controller/viagem/controllerViagem.js')
const controllerCategoriaViagem = require('./controller/viagem/controllerCategoriaViagem.js')

//criando formato de dados que será recebido no body da requisição (POST/PUT)
const bodyParserJSON = bodyParser.json()

//criando o objeto app para criar a API
const app = express()

//configuração do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

/* ---------- Feed - viagens públicas mais recentes ---------- */

app.get('/v1/diario-viagem/feed', cors(), async (request, response) => {
    let result = await controllerViagem.listarFeedViagem();
    response.status(result.status_code).json(result);
});

/* ---------- USUARIO ---------- */

//endpoint para inserir um usuario
app.post('/v1/diario-viagem/usuario', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de usuarios
app.get('/v1/diario-viagem/usuario', cors(), async function(request, response){

    //chama a função para retornar uma lista de usuario
    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um usuario pelo id
app.get('/v1/diario-viagem/usuario/:id', cors(), async function(request, response){

    let idUsuario = request.params.id

    let result = await controllerUsuario.buscarUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um usuário
app.put('/v1/diario-viagem/usuario/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idUsuario = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerUsuario.atualizarUsuario(dadosBody, idUsuario, contentType)

    response.status(result.status_code)
    response.json(result)
})

//recuperar senha
app.post('/v1/diario-viagem/usuario/recuperar-senha', cors(), bodyParserJSON, async (request, response) => {
    let dados = request.body
    let result = await controllerUsuario.recuperarSenha(dados)

    response.status(result.status_code)
    response.json(result)
})


// endpoint para deletar um usuário
app.delete('/v1/diario-viagem/usuario/:id', cors(), async function(request, response){
    let idUsuario = request.params.id

    let result = await controllerUsuario.excluirUsuario(idUsuario)

    response.status(result.status_code)
    response.json(result)
})

/* ---------- SEXO ---------- */

//endpoint para inserir um sexo
app.post('/v1/diario-viagem/sexo', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerSexo.inserirSexo(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de sexos
app.get('/v1/diario-viagem/sexo', cors(), async function(request, response){

    //chama a função para retornar uma lista de usuario
    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um sexo pelo id
app.get('/v1/diario-viagem/sexo/:id', cors(), async function(request, response){

    let idSexo = request.params.id

    let result = await controllerSexo.buscarSexo(idSexo)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um sexo
app.put('/v1/diario-viagem/sexo/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idSexo = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerSexo.atualizarSexo(dadosBody, idSexo, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um sexo
app.delete('/v1/diario-viagem/sexo/:id', cors(), async function(request, response){
    let idSexo = request.params.id

    let result = await controllerSexo.excluirSexo(idSexo)

    response.status(result.status_code)
    response.json(result)
})

/* ---------- NACIONALIDADE ---------- */

//endpoint para retornar lista de nacionalidade
app.get('/v1/diario-viagem/nacionalidade', cors(), async function(request, response){

    //chama a função para retornar uma lista de usuario
    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um nacionalidade pelo id
app.get('/v1/diario-viagem/nacionalidade/:id', cors(), async function(request, response){

    let idNacionalidade = request.params.id

    let result = await controllerNacionalidade.buscarNacionalidade(idNacionalidade)

    response.status(result.status_code)
    response.json(result)

})

/* ---------- LOGIN ---------- */

//endpoint do login
app.post('/v1/diario-viagem/login', cors(), bodyParserJSON, async (request, response) => {
    const { email, senha } = request.body

    const result = await controllerUsuario.loginUsuario(email, senha)

    response.status(result.status_code)
    response.json(result)
})

/* ---------- LOCAL ---------- */

//endpoint para inserir um Local
app.post('/v1/diario-viagem/local', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerLocal.inserirLocal(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de Local
app.get('/v1/diario-viagem/local', cors(), async function(request, response){

    //chama a função para retornar uma lista de Local
    let result = await controllerLocal.listarLocal()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um Local pelo id
app.get('/v1/diario-viagem/local/:id', cors(), async function(request, response){

    let idLocal = request.params.id

    let result = await controllerLocal.buscarLocal(idLocal)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um local
app.put('/v1/diario-viagem/local/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idLocal = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerLocal.atualizarLocal(dadosBody, idLocal, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um local
app.delete('/v1/diario-viagem/local/:id', cors(), async function(request, response){
    let idLocal = request.params.id

    let result = await controllerLocal.excluirLocal(idLocal)

    response.status(result.status_code)
    response.json(result)
})

/* ---------- CATEGORIA ---------- */

//endpoint para inserir um categoria
app.post('/v1/diario-viagem/categoria', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerCategoria.inserirCategoria(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de categorias
app.get('/v1/diario-viagem/categoria', cors(), async function(request, response){

    //chama a função para retornar uma lista de usuario
    let result = await controllerCategoria.listarCategoria()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um categoria pelo id
app.get('/v1/diario-viagem/categoria/:id', cors(), async function(request, response){

    let idCategoria = request.params.id

    let result = await controllerCategoria.buscarCategoria(idCategoria)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um categoria
app.put('/v1/diario-viagem/categoria/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idCategoria = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerCategoria.atualizarCategoria(dadosBody, idCategoria, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um categoria
app.delete('/v1/diario-viagem/categoria/:id', cors(), async function(request, response){
    let idCategoria = request.params.id

    let result = await controllerCategoria.excluirCategoria(idCategoria)

    response.status(result.status_code)
    response.json(result)
})

/* ---------- MÍDIA ---------- */

//endpoint para inserir uma midia
app.post('/v1/diario-viagem/midia', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerMidia.inserirMidia(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de midias
app.get('/v1/diario-viagem/midia', cors(), async function(request, response){

    //chama a função para retornar uma lista de usuario
    let result = await controllerMidia.listarMidia()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um midia pelo id
app.get('/v1/diario-viagem/midia/:id', cors(), async function(request, response){

    let idMidia = request.params.id

    let result = await controllerMidia.buscarMidia(idMidia)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um midia
app.put('/v1/diario-viagem/midia/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idMidia = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerMidia.atualizarMidia(dadosBody, idMidia, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um midia
app.delete('/v1/diario-viagem/midia/:id', cors(), async function(request, response){
    let idMidia = request.params.id

    let result = await controllerMidia.excluirMidia(idMidia)

    response.status(result.status_code)
    response.json(result)
})

/* ---------- VIAGEM ---------- */

//endpoint para inserir uma viagem
app.post('/v1/diario-viagem/viagem', cors(), bodyParserJSON, async function(request, response){

    //recebe o content type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerViagem.inserirViagem(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//endpoint para retornar lista de viagems
app.get('/v1/diario-viagem/viagem', cors(), async function(request, response){

    //chama a função para retornar uma lista de usuario
    let result = await controllerViagem.listarViagem()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para buscar um viagem pelo id
app.get('/v1/diario-viagem/viagem/:id', cors(), async function(request, response){

    let idViagem = request.params.id

    let result = await controllerViagem.buscarViagem(idViagem)

    response.status(result.status_code)
    response.json(result)

})

//endpoint pr atualizar um viagem
app.put('/v1/diario-viagem/viagem/:id', cors(), bodyParserJSON, async function(request, response){
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da música
    let idViagem = request.params.id

    //recebe os dados do body
    let dadosBody = request.body

    let result = await controllerViagem.atualizarViagem(dadosBody, idViagem, contentType)

    response.status(result.status_code)
    response.json(result)
})

// endpoint para deletar um viagem
app.delete('/v1/diario-viagem/viagem/:id', cors(), async function(request, response){
    let idViagem = request.params.id

    let result = await controllerViagem.excluirViagem(idViagem)

    response.status(result.status_code)
    response.json(result)
})

//inicializando o servidor na porta 8080
app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})

