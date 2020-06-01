const Sequelize = require('sequelize')
const connection = require('../DataBase/dataBase')

const funcionarios = connection.define('funcionariosdeOrcamento',{
    name:{type:Sequelize.STRING,allowNull:false},
    sales:{type:Sequelize.FLOAT,allowNull:false},
    orcamentoId:{type:Sequelize.INTEGER, allowNull:true}
})

//funcionarios.sync({force:true})

module.exports = funcionarios
