const connection = require('./DataBase/dataBase')
const express = require('express')
const app = express()

const Nota = require('./Notas/nota')
const Produto = require('./Produto/produto')
const ProdutoDeOrc = require('./ProdutosDeOrc/produtos')
const funcionarios = require('./Funcionarios/funcionarios')
const funcionariosDeOrc = require('./FuncionarioDeOrc/funcionario')
const orcamnetos = require('./Orcamentos/orcamento')
const idValue = require('./id/id')


const NotaController = require('./Notas/notraController')
const ProdutoController = require('./Produto/produtoController')
const FuncController = require('./Funcionarios/funcController')
const orcamentoContoller = require('./Orcamentos/orcamentosController')


// dados dos formularios
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// para usar as roas externas
//app.use('/',NotaController)
app.use('/',ProdutoController)
app.use('/',FuncController)
app.use('/',orcamentoContoller)

//conexao com o banco
connection.authenticate().then(()=>{
    console.log('Conectado ao Banco!')
}).catch((err)=>{
    console.log(err)
})

// configuração do ejs
app.set('view engine','ejs')
//pasta Public
app.use(express.static('Public'))



app.get('/',(req,res)=>{
    res.render('index')
})



app.listen(5050,()=>{
    console.log('Servidor Rodando')
})
