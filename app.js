const express = require('express')
const cors = require('cors')
const app = express()
const application = express ()
const port = 3000
const porta = 3001
const mysql = require('mysql')


const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'rpalog',
});

// Application inicia o Intranet 
application.use(express.urlencoded({ extended: true }));
application.use(express.json())


application.use(express.static('public'))
application.use('/css', express.static(__dirname + 'public/css'))
application.use('/imagens', express.static(__dirname + 'public/imagens'))
application.use('/js', express.static(__dirname + 'public/js'))
application.use('/fonte', express.static(__dirname + 'public/fonte'))

application.get('/consultaAniver', (req, res) => {
    db.query('select *, month(dataAniversario) as Mes, day(dataAniversario) as Dia  from colaboradores;', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
            
    })
})


// app inicia o sistema de cadastros
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/imagens', express.static(__dirname + 'public/imagens'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/fonte', express.static(__dirname + 'public/fonte'))

app.get('/consulta', (req, res) => {
    db.query('select * from colaboradores;', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
            
    })
})

app.get('/consultaAniver', (req, res) => {
    db.query('select *, month(dataAniversario) as Mes, day(dataAniversario) as Dia from colaboradores', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
            
    })
})


app.get('/:nome', (req, res) => {
    db.query('SELECT * FROM colaboradores WHERE nome = ?', [req.params.nome], (err, result) => {
        if (err) {
            console.log(err)
            res.send({acesso: false})
            return;
        }else{
            res.send(result)
        }
    })
})

app.get('/consulta/:id', (req, res) => {
    db.query('SELECT * FROM colaboradores WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.send({acesso: false})
            return;
        }else{
            res.send(result)
        }
    })
})


app.delete('/delete/:id', (req, res) => {
    db.query('DELETE FROM colaboradores WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.send({acesso: false})
            return;
        }else{
            res.send(result)
        }
    })
})

app.post('/insert', (req, res) => {
    db.query('INSERT INTO colaboradores (nome, dataAniversario, departamento, funcao) VALUES (?, ?, ?, ?)', [req.body.nome, req.body.dataNasc, req.body.depart, req.body.funcao], (err, result) => {
        if (err) {
            console.log(err);
            res.send({resultado: false})
            return;
        }
        res.send({resultado: true})
    })
})

app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html')
})

application.get('', (req, res) => {
    res.sendFile(__dirname + '/public/html/indexIntranet.html')
})


app.listen(port, () => console.info('Listening on port  '+ port))
application.listen(porta, () => console.info('Listening on port  '+ porta))
