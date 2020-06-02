const express = require('express')
const router = express.Router()
const clients = require('./Cliente')

router.get('/admin/clientes/new',(req,res)=>{
    clients.findAll().then(clients=>{
         res.render('admin/clientes/new',{clients})
    })
})

router.post('/admin/clientes/save',(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const cpf = req.body.cpf
    const fone = req.body.fone

    clients.create({
        name:name,
        mail:email,
        fone:fone,
        cpf:cpf
    }).then(()=>{
        res.redirect('/admin/clientes/new')
    })
})
module.exports = router