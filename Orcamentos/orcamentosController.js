const express = require('express')
const router = express.Router()
const Produto = require('../Produto/produto')
const ProdutoOrc = require('../ProdutosDeOrc/produtos')
const orcamentos = require('../Orcamentos/orcamento')
const funcionario = require('../Funcionarios/funcionarios')
const funcionarios = require('../FuncionarioDeOrc/funcionario')
const idValue = require('../id/id')
let list = []
let list2 = []
let nome =[]

// pagina inicial
router.get('/orcamentos',(req,res)=>{
    orcamentos.findAll().then(orcamentos=>{
    //idValue.create({value:1})

        ProdutoOrc.findAll().then(products=>{
        res.render('orcamentos/index',{orcamentos,products})
        })
        
    })
    nome =[]
    list = []
    list2 =[]
})

// novo orçamento
router.get('/orcamentos/new',(req,res)=>{

    Produto.findAll().then(products=>{
        funcionario.findAll().then(funcs=>{
            res.render('orcamentos/new',{
                list,products,funcs,nome
            })
        })
    })
   
})

// salva orçamentos
router.post('/orcamentos/save',(req,res)=>{
    const func = req.body.func
    const list3 = []
    list3.push(...list)
    list =  [] 
    let cont = 0
    let contId = {value:1}
  
    idValue.findOne({where:{id:1}}).then(id=>{
        idValue.update({value:id.value+1},{where:{id:1}})

        list3.forEach(product =>{
            product.id = contId.value
            ProdutoOrc.create({
                name:product.name,
                value:parseFloat(product.value),
                amount:parseInt(product.amount),
                code:parseInt(product.code),
                orcamentoId:id.value
            })
        })
        funcionarios.create({name:func,sales:cont,orcamentoId:id.value})
    })
    list3.forEach(product=>{
        cont+= product.value
    })
    orcamentos.create({value:cont}).then(()=>{})
    
    res.redirect('/orcamentos')
    
})

// verifica e tras os produtos no banco de dandos para o novo orçamento
router.post('/orcamentos/procuraItem',(req,res)=>{
    const nome = req.body.name
    let cont = 0
    let chave = false

    if(isNaN(nome)){
        Produto.findOne({where:{name:nome}}).then(product=>{
            const product1 = product
            product1.amount = 1
            product.descValue =0
            product.descPorc =0 
            if(list.length>0){
                list.forEach(z=>{
                    if(z.name == nome){
                        z.amount++
                        chave = true
                    }
                })
                if(!chave){list.push(product1)}
            }else{
                list.push(product1)
            }
                   
            list.forEach(product=>{
                cont++
                product.id2 = cont
            })         
            res.redirect('/orcamentos/new')
        })
    }else{
        Produto.findOne({where:{code:parseInt(nome)}}).then(product=>{
            const product1 = product
            product1.amount = 1
            product.descValue =0
            product.descPorc =0
            if(list.length>0){
                list.forEach(z=>{
                    if(z.code == nome){
                        z.amount++
                        chave = true
                    }
                })
                if(!chave){list.push(product1)}
            }else{
                list.push(product1)
            }
               list.forEach(product=>{
                cont++
                product.id2 = cont
            })  
            res.redirect('/orcamentos/new')
        })
    }
    
})

//deleta itens do novo orçamento
router.post('/orcamentos/delete/itens',(req,res)=>{
    const id = req.body.id
    const n1 = list.findIndex(n => n.id2 == id)
    if(id!=undefined){
        if(list.length>1){
        list.splice(n1,1)
        res.redirect('/orcamentos/new')
        }else{
            list = []
            res.redirect('/orcamentos/new')
        }
        
    }
})

// altera a quantidade do item no novo orçamento 
router.post('/orcamento/alteraQuantidade',(req,res)=>{
    const n = req.body.quant
    const id = req.body.id

    const n1 = list.findIndex(x=>x.id2 == id)
    list[n1].amount = n
    

    res.redirect('/orcamentos/new')
})

//procura produtos no banco para a edição do orçamento
router.post('/orcamentos/procuraItem2',(req,res)=>{
    const nome = req.body.name
    const chave = req.body.chave
    let cont = 0
    

    if(isNaN(nome)){
        Produto.findOne({where:{name:nome}}).then(product=>{
            const product1 = product
            product1.amount = 1
            list2.push(product1)       
            res.redirect(`/orcamentos/edit/${chave}`)
        })
    }else{
        Produto.findOne({where:{code:parseInt(nome)}}).then(product=>{
            const product1 = product
            product1.amount = 1
            list2.push(product1)
            res.redirect(`/orcamentos/edit/${chave}`)
        })
    }
    
})

//deleta itens na edição do orçamento
router.post('/orcamentos/delete/itens2',(req,res)=>{
    const id = req.body.id
    const id2 = req.params.id
    const n1 = list2.findIndex(n => n.id2 == id)
    if(id!=undefined){
        if(list2.length>1){
        list2.splice(n1,1)
        res.redirect('/orcamentos/edit/'+id2)
        }else{
            list2 = []
            res.redirect('/orcamentos/edit/'+id2)
        }  
    }
})

//altera quantidade na edição do orçamento
router.post('/orcamento/alteraQuantidade2',(req,res)=>{
    const n = req.body.quant
    const id = req.body.id
    const id2 = req.body.id2

    const n1 = list2.findIndex(x=>x.id2 == id)
    list2[n1].amount =n
    

        res.redirect('/orcamentos/edit/'+id2)
})

// edita os itens do orçamento
router.get('/orcamentos/edit/:id',(req,res)=>{
    const id = req.params.id
    const fun = req.body.funcionario
    let cont = 0
    Produto.findAll().then(products=>{
        ProdutoOrc.findAll({where:{orcamentoId:id}}).then(productsOrc=>{
            if(list2.length<=0){
            list2.push(...productsOrc)
            }
            list2.forEach(list=>{
                cont++
                list.id2=cont
            })
            funcionario.findAll().then(funcs=>{
                funcionarios.findOne({where:{orcamentoId:id}}).then(funcsdeOrc=>{
                    
                    res.render('orcamentos/edit',{products,list:list2,funcs,funcsdeOr})

                })
            })
        })
    })
})

//fixa o vendedor e cliente no orcamento
router.post('/orcamento/fixaDados',(req,res)=>{
    const name = req.body.funcionario
    const desc = req.body.desc
    const id = req.body.id
    if(id != undefined){
        const n = list.findIndex(n => n.id2 == id)
    let desconto = (list[n].value / 100) * desc 
    list[n].descValue = desconto
    list[n].descPorc = desc
    }
    
    nome[0] = name
    res.redirect('/orcamentos/new')
})

//atualiza os itens do orçmento no banco
router.post('/orcamentos/update',(req,res)=>{
    const idAtual = req.body.id
    const func = req.body.func
    let cont = 0
    let contId = {value:1}
    
   // idValue.findOne({where:{id:1}}).then(id=>{
    //idValue.update({value:id.value+1},{where:{id:1}})
    
    list2.forEach(products=>{
        ProdutoOrc.destroy({where:{orcamentoId:idAtual}})
    })

    list2.forEach(product =>{
        product.id = contId.value
        ProdutoOrc.create({
            name:product.name,
            value:parseFloat(product.value),
            amount:parseInt(product.amount),
            code:parseInt(product.code),
            orcamentoId:idAtual
                })
        })
    
    list2.forEach(product=>{
        cont+= product.value * product.amount
    })
    orcamentos.update({value:cont},{where:{id:idAtual}}).then(()=>{funcionarios.create({name:func,sales:cont})}) 
    
    res.redirect('/orcamentos')
})
//deleta orçamento 
router.post('/orcamentos/delete',(req,res)=>{
    const id = req.body.id


    ProdutoOrc.destroy({where:{orcamentoId:id}})
    
    orcamentos.destroy({where:{id:id}}).then(()=>{
        ProdutoOrc.destroy({where:{orcamentoId:id}}).then(()=>{
            res.redirect('/orcamentos')
        })
    })
  
})



module.exports = router