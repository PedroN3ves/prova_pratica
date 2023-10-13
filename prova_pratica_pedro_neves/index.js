const { request, response } = require('express');
const express = require('express');
const exphbs = require('express-handlebars');

const PORT = 3333;
//Importar o módulo conn para as operações com o banco
const conn = require('./db/conn');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//Middleware para arquivos estáticos
app.use(express.static('public'));

// Listar Produtos
app.get('/', (request, response)=>{
  const sql = `SELECT * FROM products`;

    conn.query(sql, (error, result) => {
      if(error) throw console.log(error);

        const products = result;

        return response.render('home', { products });
    });
});

// Listar um único produto
app.get('/products/:id', (request, response) => {
  const { id } = request.params;

  const sql = `SELECT * FROM products WHERE id = ${id}`;

  conn.query(sql, (error, result) => {
    if(error) throw console.log(error);

     const products = result[0];

     return response.render('', { products })
  })
})

// Atualizar um produto
app.get('/products/edit/:id', (req, res) => {
  const { id } = request.params;
  const sql = `SELECT * FROM products WHERE id = ${id};`;

  conn.query(sql, (error, result) => {
     if(error) throw console.log(error);

      const product = result[0];

      return res.render('atualizar', { product })
  });
});

app.post('/products/update/:id', (request,response) => {
  const { id } = request.params;
  const {name, category, description, price, quantity} = request.body;

  const sql = `UPDATE books SET name = '${name}', category = '${category}', description = '${description}', price = ${price}, quantity = ${quantity} WHERE id = ${id} `;

  conn.query(sql, (error) => {
    if(error) throw console.log(error);

      return response.redirect('home')
  });
});

// Cadastrar Produtos
app.get('/products/signup', (request, response)=>{
  return response.render('cadastro');
});

app.post('/products/signup', (request, response)=>{
  const {name, category, description, price, quantity} = request.body;

  const sql = `INSERT INTO products(name, category, description, price, quantity) VALUES('${name}', '${category}', '${description}', ${price}, ${quantity});`;

  conn.query(sql, (error) => {
    if(error) throw console.log(error);

    return response.redirect('/');
  });
});

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`);
});
