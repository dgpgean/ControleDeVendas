const Connection = require('../DataBase/dataBase')
const Sequelize = require('sequelize')
const Notas = require('../Notas/nota')
const orcamnetos = require('../Orcamentos/orcamento')
const funcionario = require('../Funcionarios/funcionarios')
const produto = Connection.define('produtos',{
    name:{type:Sequelize.STRING, allowNull:false},
    value:{type:Sequelize.DOUBLE, allowNull:false},
    amount:{type:Sequelize.INTEGER,allowNull:false},
    code:{type:Sequelize.INTEGER,allowNull:false}
})


//produto.sync({force:true})

module.exports = produto

