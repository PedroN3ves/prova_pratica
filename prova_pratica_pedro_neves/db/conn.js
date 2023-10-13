const mysql = require('mysql2')

//Configuração e conexão com banco
const conn = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: '', // É opcional.
  user: 'aluno_medio',
  password: '@lunoSenai23.',
  database: 'system_products',
})

// É necessário exporta esse modulo
module.exports = conn;
