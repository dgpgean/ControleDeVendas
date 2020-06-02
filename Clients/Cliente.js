const Sequelize = require('sequelize')
const connection = require('../DataBase/dataBase')

const clientes = connection.define('clientes',{
    name:{type:Sequelize.STRING,allowNull:true},
    mail:{type:Sequelize.STRING,allowNull:true},
    fone:{type:Sequelize.INTEGER, allowNull:true},
    cpf:{type:Sequelize.INTEGER,allowNull:true}
    
})

//clientes.sync({force:true})

module.exports = clientes


