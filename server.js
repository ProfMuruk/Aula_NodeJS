//framework web para node.js
const express = require('express')

//biblioteca para trabalhar com mongo db
const mongoose = require('mongoose')

//cors "meio campo" para permitir requisições 
//entre diferentes dominios (hosts / servidor)
const cors = require('cors')

const app = express()

app.use(cors()) //permitir que o front acesse a API
app.use(express.json())// permitir o envio de dados no formato JSON

mongoose.connect('mongodb://localhost/produtos', 
{useNewUrlParser: true, UseUnifiedTopology: true})

//definir o schema para produtos

const produtosSchema = new mongoose.Schema({
    nome: String,
    quantidade: Number,
    imagem: String,
    preco: Number
})

const Produto = mongoose.model('Produto', produtosSchema);

// '/produtos' é uma rota para obter todos os produtos
app.get('/produtos', async (requisicao, resposta) =>{
    const produtos = await Produto.find()
    resposta.json(produtos)
})

app.post('/produtos', async(req, res) =>{
    const novoProduto = new Produto(req.body);
    await novoProduto.save();
    res.json(novoProduto);
})

app.put('/produtos/:id', async(req, res)=>{
    const produtoAtualizado = await Produto.findByIdAndUpdate(
        req.params.id, req.body, {new: true})
        res.json(produtoAtualizado)
        res.json({message: "Produto editado"})
})

app.delete('/produtos/:id', async(req, res) =>{
    await Produto.findByIdAndDelete(req.params.id);
    res.json({message: "Produto deletado"})
})

app.listen(3000, ()=>{
    console.log('Api rodando na porta 3000')
})

