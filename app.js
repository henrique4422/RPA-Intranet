const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');

const app = express()
const port = 3000

const raiz = './uploads';
const directoryPath = path.join(__dirname, raiz);


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'rpalog',
});

// app inicia o sistema de cadastros
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/imagens', express.static(__dirname + 'public/imagens'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/fonte', express.static(__dirname + 'public/fonte'))

//Intranet
app.get('/indexIntranet', (req, res) => {
    res.sendFile(__dirname + '/public/html/indexIntranet.html')
})

//Cadastros
app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html')
})

// Upload 
app.get('/uploadPage', (req, res) => {
    res.sendFile(__dirname + '/public/html/upload.html')
})

//Donwload
app.get('/downloadPage', (req, res) => {
    if (res.status(200)) {
        res.sendFile(__dirname + '/public/html/download.html')
    }
})


app.get('/lista', (req, res) => {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        let fileInfos = [];
        files.forEach((file) => {
            fileInfos.push(file + '<br>');
        });

        res.json({ fileInfos })
        res.end();
    });
}
)

//Db Queries
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
    db.query('select *, month(dataAniversario) as Mes, day(dataAniversario) as Dia  from colaboradores;', (err, result) => {
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
            res.send({ acesso: false })
            return;
        } else {
            res.send(result)
        }
    })
})

app.get('/consulta/:id', (req, res) => {
    db.query('SELECT * FROM colaboradores WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.send({ acesso: false })
            return;
        } else {
            res.send(result)
        }
    })
})


app.delete('/delete/:id', (req, res) => {
    db.query('DELETE FROM colaboradores WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.log(err)
            res.send({ acesso: false })
            return;
        } else {
            res.send(result)
        }
    })
})

app.post('/insert', (req, res) => {
    db.query('INSERT INTO colaboradores (nome, dataAniversario, departamento, funcao) VALUES (?, ?, ?, ?)', [req.body.nome, req.body.dataNasc, req.body.depart, req.body.funcao], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ resultado: false })
            return;
        }
        res.send({ resultado: true })
    })
})


//Upload e Donwload
const folderPath = __dirname + "/uploads/";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) + path.extname(file.originalname);
    }

})

const upar = multer({ storage })
app.post("/uploads", upar.array("file[]"), (req, res) => {
    res.sendFile(__dirname + '/public/html/upload.html');
})

app.get("/download/:name", function (req, res) {
    const file = folderPath + [req.params.name];
    res.download(file);
    console.log(file);
});

app.listen(port, () => console.info('App listening on port ' + port))
