const Sequelize = require('sequelize')
const connection =  require('../DataBase/dataBase')
const produtos = require('../Produto/produto')
const orcamentos = connection.define('orcamentos',{
    value:{type:Sequelize.FLOAT, allowNull:false}
})


    //orcamentos.sync({force:true})

module.exports = orcamentos