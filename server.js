const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const db = require('./database');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

app.get('/login', (req, res) => {
    res.render('login');
});

// Rota para a tela de Login (Credenciais CPF/CNPJ)
app.get('/entrar', (req, res) => {
    res.render('entrar');
});

// Rota para Cadastro de Associado (CPF)
app.get('/cadastro-associado', (req, res) => {
    res.render('cadastro-associado');
});

// Rota para Cadastro de Comércio (CNPJ)
app.get('/cadastro-comercio', (req, res) => {
    res.render('cadastro-comercio');
});

app.post('/gerar-cupom', (req, res) => {
    const { cnpj, titulo, inicio, fim, desconto } = req.body;
    const hash = crypto.randomBytes(6).toString('hex').toUpperCase(); // Gera 12 caracteres
    db.run(`INSERT INTO CUPOM (num_cupom, tit_cupom, cnpj_comercio, dta_inicio, dta_fim, desconto) VALUES (?,?,?,?,?,?)`,
    [hash, titulo, cnpj, inicio, fim, desconto], () => {
        res.send(`Cupom Gerado com Sucesso! Código: ${hash}`);
    });
});

app.listen(3000, () => console.log("Servidor rodando! Acesse: http://localhost:3000/login"));