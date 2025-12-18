const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sistema.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS CATEGORIA (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nom_categoria TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS COMERCIO (cnpj_comercio TEXT PRIMARY KEY, nom_fantasia TEXT, email TEXT, senha TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS ASSOCIADO (cpf_associado TEXT PRIMARY KEY, nom_associado TEXT, email TEXT, senha TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS CUPOM (num_cupom TEXT PRIMARY KEY, tit_cupom TEXT, cnpj_comercio TEXT, dta_inicio DATE, dta_fim DATE, desconto REAL)");
    db.run("CREATE TABLE IF NOT EXISTS RESERVA (id INTEGER PRIMARY KEY AUTOINCREMENT, num_cupom TEXT, cpf_associado TEXT)");
});

module.exports = db;