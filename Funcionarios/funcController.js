const express = require('express')
const router = express.Router();
const funcionario = require('./funcionarios')

router.get('/admin/funcionarios',(req,res)=>{
    
    funcionario.findAll().then(funcionarios=>{
        res.render('admin/funcionarios/index',{funcionarios})
    })
})
router.get('/admin/funcionarios/new',(req,res)=>{
    funcionario.findAll().then(funcionarios=>{
        res.render('admin/funcionarios/new',{funcionarios})
    })
})

router.post('/funcionarios/save',(req,res)=>{
    const name = req.body.name
    const password = req.body.password
    const adm = req.body.adm
    let chave = false
    let cont = []

    funcionario.create({
        name:name,
        password:password,
        acess:adm,
        sales:0
        
    }).then(()=>{
        res.redirect('/admin/funcionarios')
    })
})

router.get('/admin/funcionarios/edit/:id',(req,res)=>{
    const id = req.params.id
     funcionario.findAll().then(funcionarios=>{
        funcionario.findOne({where:{id:id}}).then(funcionario=>{
            if(funcionario!=undefined){
                res.render('admin/funcionarios/edit',{funcionario,funcionarios})
            }else{
                res.redirect('/admin/funcionarios/index')
            }
        })
     })
})
router.post('/funcionarios/update',(req,res)=>{
    const password = req.body.password
    const name = req.body.name
    const id = req.body.id
    const adm = req.body.adm
    const nameAtual = req.body.nameAtual
    let chave = []

    funcionario.update({
        name:name,
        password:parseInt(password),
        acess:adm},
        {where:{id:parseInt(id)}}).then(()=>{
        res.redirect('/admin/funcionarios')
        })
})
router.post('/funcionarios/delete/:id',(req,res)=>{
    const id = req.params.id

    funcionario.destroy({where:{id:id}}).then(()=>{
        res.redirect('/admin/funcionarios')
    })
})

module.exports = router