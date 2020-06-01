const Connection = require('../DataBase/dataBase')
const Sequelize = require('sequelize')
const Notas = require('../Notas/nota')
const orcamnetos = require('../Orcamentos/orcamento')
const funcionario = require('../FuncionarioDeOrc/funcionario')
const produto = require('../Produto/produto')
const produtoOrc = Connection.define('produtosDeOrcamento',{
    name:{type:Sequelize.STRING, allowNull:false},
    value:{type:Sequelize.DOUBLE, allowNull:false},
    amount:{type:Sequelize.INTEGER,allowNull:false},
    code:{type:Sequelize.INTEGER,allowNull:false}
})



orcamnetos.hasMany(produtoOrc)
//orcamnetos.belongsTo(funcionario)
    //produtoOrc.sync({force:true})

module.exports = produtoOrc

