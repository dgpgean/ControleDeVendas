const express = require('express')
const router = express.Router()
const Nota = require('../Notas/nota')
const Produto = require('../Produto/produto')



router.get('/admin/produtos/new',(req,res)=>{
        Produto.findAll().then(products=>{
                res.render('admin/produtos/new',{products})
        })    
})

router.post('/Produto/save',(req,res)=>{
        const name = req.body.name
        const amount = req.body.amount
        const value = req.body.value
        const code = req.body.code

        Produto.create({
                name:name,
                value:parseFloat(value),
                amount:parseInt(amount),
                code:parseInt(code)
        }).then(()=>[
                res.redirect('/admin/produtos/new')
        ]).catch((err=>{
                console.log(err)
        }))
       
     
})

router.get('/admin/produtos',(req,res)=>{
        
        Produto.findAll().then(products=>{
                res.render('admin/produtos/index',{products})
        })
      
})

router.get('/admin/produtos/edit/:id',(req,res)=>{
        const id = req.params.id
        Produto.findAll().then(products=>{
                Produto.findOne({where:{id:id}}).then(product=>{
                        res.render('admin/produtos/edit',{product,products})
                })
                
        })
        
})

router.post('/Produto/update',(req,res)=>{
        const id = req.body.id
        const name = req.body.name
        const amount = req.body.amount
        const value = req.body.value
        const code = req.body.code
        const nameAtual = req.body.nameAtual
        const codeAtual = req.body.codeAtual
        let chave = []
        
        Produto.update({
                name:name,
                value:parseFloat(value),
                amount:parseInt(amount),
                code:parseInt(code)
        },{where:{id:id}}).then(()=>[
                res.redirect('/admin/produtos')
        ]).catch((err=>{
                res.redirect('/admin/produtos')
        }))
})

router.post('/Produto/delete/:id',(req,res)=>{
        const id = req.params.id
        Produto.destroy({where:{id:id}}).then(()=>{
                res.redirect('/admin/produtos')
        })
        
})
module.exports = router