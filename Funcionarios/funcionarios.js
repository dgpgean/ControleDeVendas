const Sequelize = require('sequelize')
const connection = require('../DataBase/dataBase')

const funcionarios = connection.define('funcionarios',{
    name:{type:Sequelize.STRING,allowNull:false},
    password:{type:Sequelize.INTEGER, allowNull:false},
    sales:{type:Sequelize.FLOAT,allowNull:false},
    acess:{type:Sequelize.STRING, allowNull:false}
})

//funcionarios.sync({force:true})

module.exports = funcionarios
