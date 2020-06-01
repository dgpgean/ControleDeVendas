const Sequelize = require('sequelize')
const connection = require('../DataBase/dataBase')

const idValue = connection.define('idValue',{
 
    value:{type:Sequelize.INTEGER, allowNull:false}
})
   
//idValue.sync({force:true})
//idValue.create({value:1})

module.exports = idValue
