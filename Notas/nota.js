const Sequelize = require('sequelize')
const Connection = require('../DataBase/dataBase')

const nota = Connection.define('notas',{
    id:{type:Sequelize.INTEGER,allowNull:false,primaryKey: true},
    number:{type:Sequelize.INTEGER,allowNull:false}
   
})

//nota.sync({force:true})
module.exports = nota