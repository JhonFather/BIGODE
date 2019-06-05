// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.get('/user',function (req, res, next) {
res.status(200);
res.send(global.user);

})

/////////////////////////////////////////////////CADASTRO NA INDEX////////////////////////////////////////////////////////////////////
router.post('/cadastrar/',function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.query)}`);
    var json = req.query;
    
    return banco.sql.query(`insert into usuario values('${json.email}','${json.nome}','${json.senha}','${json.telefone}','${json.usuarioLogin}',null)`);
  }).then(consulta => {

    
      res.status(200);
      res.send('ok');
    

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////CADASTRO NA REGISTERuSUARIO////////////////////////////////////////////////////////////////////
router.post('/cadastrarUsuario/',function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.query)}`);
    var json = req.query;
    
    return banco.sql.query(`insert into usuario values('${json.email}','${json.nome}','${json.senha}','${json.telefone}','${json.usuarioLogin}',null)`);
  }).then(consulta => {

    
      res.status(200);
      res.send('ok');
    

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.post('/entrar/', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.query)}`);
    var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    
    return banco.sql.query(`select * from Usuario where usuarioLogin='${req.query.user}' and Senha='${req.query.senha}'`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length==1) {
      res.status(200);
      res.send(consulta.recordset[0]);
      
      global.user=consulta.recordset[0];
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

// não mexa nesta linha!
module.exports = router;