const express = require("express");
const port = 9001;
const bodyParser = require('body-parser');
const appServer = require('./bin/app/server');
const db = require('./bin/helpers/databases/connection');

const cors = require('cors');
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const imgur = require("imgur");
const fs = require("fs");

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});
const upload = multer({
    storage: storage

})

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json({
    extended: false
}));
app.use(express.urlencoded({
    extended: true
}));
// app.use(upload.any());

app.listen(port, () => {
    const ctx = 'app-listen';
    console.log(ctx, `${appServer.name} started, listening at http://localhost:${port}`, 'initate application');
});

const statusCode = {
    success: 200,
};

app.post('/upolads/', upload.single('files'), async (req, res, next) => {
    let file = req.file.buffer;

    let buff = new Buffer(file);
    let base64data = buff.toString('base64');

    // return
    try {
        const url = await imgur.uploadBase64(base64data);
        res.json({
            message: url
        });
    } catch (error) {
        console.log("error", error);
    }
})

// app.post("/upolads/", async (req, res) => {
//     const file = req.files[0];
//     try {
//         const url = await imgur.uploadFile(`./uploads/${file.filename}`);
//         res.json({
//             message: url
//         });
//         fs.unlinkSync(`./uploads/${file.filename}`);
//     } catch (error) {
//         console.log("error", error);
//     }
// });


// LOGIN API START
app.post('/login', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        let sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
        db.query(sql, [username, password], (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                res.write(JSON.stringify({
                    statusCode: 200,
                    message: 'Successfully login',
                }));
            } else {
                res.write(JSON.stringify({
                    statusCode: 400,
                    message: 'Incorrect Username and/or Password!',
                }));
            }
            res.end();
        });
    } else {
        res.write(JSON.stringify({
            statusCode: 409,
            message: 'Please enter Username and Password!',
        }));
        res.end();
    }
});
// LOGIN API START

// ======================================================================================================================================

// DASHBOARD API START
app.get('/dashboard', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });
    db.query('SELECT * FROM dashboard', (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});

app.get('/dashboard/:id', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });

    let id = req.params.id;

    db.query('SELECT * FROM dashboard WHERE id = ?', [id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});

app.post('/dashboard', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let title = req.body.title;
    let description = req.body.description;
    let image_id = req.body.image_id;
    let created_date = new Date();

    let sql = 'INSERT INTO dashboard (title, description, image_id, created_date) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, description, image_id, created_date], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully created',
        }));
        res.end();
    });
});

app.put('/dashboard', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let id = req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let image_id = req.body.image_id;
    let created_date = new Date();

    let sql = 'UPDATE dashboard SET title = ?, description = ?, image_id = ?, created_date = ? WHERE id = ?';
    db.query(sql, [title, description, image_id, created_date, id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully updated'
        }));
        res.end();
    });
});

app.delete('/dashboard', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let id = req.body.id;

    let sql = 'DELETE FROM dashboard WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully deleted'
        }));
        res.end();
    });
});
// DASHBOARD API END

// ======================================================================================================================================

// PARIWISATA API START
app.get('/pariwisata', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });
    db.query('SELECT * FROM pariwisata', (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});


app.get('/pariwisata/:id', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });

    let id = req.params.id;

    db.query('SELECT * FROM pariwisata WHERE id = ?', [id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});

app.post('/pariwisata', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let title = req.body.title;
    let price = req.body.price;
    let location = req.body.location;
    let opening_hours = req.body.opening_hours;
    let closing_hours = req.body.closing_hours;
    let image_id = req.body.image_id;
    let image_cover = req.body.image_cover;
    let created_date = new Date();

    let sql = 'INSERT INTO pariwisata (title, price, location, opening_hours, closing_hours, image_id, image_cover, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, price, location, opening_hours, closing_hours, image_id, image_cover, created_date], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully created',
        }));
        res.end();
    });
});

app.put('/pariwisata', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let id = req.body.id;
    let title = req.body.title;
    let price = req.body.price;
    let location = req.body.location;
    let opening_hours = req.body.opening_hours;
    let closing_hours = req.body.closing_hours;
    let image_id = req.body.image_id;
    let image_cover = req.body.image_cover;
    let created_date = new Date();

    let sql = 'UPDATE pariwisata SET title = ?, price = ?, location = ?, opening_hours = ?, closing_hours = ?, image_id = ?, image_cover = ?, created_date = ? WHERE id = ?';
    db.query(sql, [title, price, location, opening_hours, closing_hours, image_id, image_cover, created_date, id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully updated'
        }));
        res.end();
    });
});

app.delete('/pariwisata', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let id = req.body.id;

    let sql = 'DELETE FROM pariwisata WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully deleted'
        }));
        res.end();
    });
});
// PARIWISATA API END

// ======================================================================================================================================

// UMKM API START
app.get('/umkm', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });
    db.query('SELECT * FROM umkm', (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});


app.get('/umkm/:id', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });

    let id = req.params.id;

    db.query('SELECT * FROM umkm WHERE id = ?', [id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});

app.post('/umkm', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let title = req.body.title;
    let price = req.body.price;
    let location = req.body.location;
    let opening_hours = req.body.opening_hours;
    let closing_hours = req.body.closing_hours;
    let image_id = req.body.image_id;
    let created_date = new Date();

    let sql = 'INSERT INTO umkm (title, price, location, opening_hours, closing_hours, image_id, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, price, location, opening_hours, closing_hours, image_id, created_date], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully created',
        }));
        res.end();
    });
});

app.put('/umkm', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let id = req.body.id;
    let title = req.body.title;
    let price = req.body.price;
    let location = req.body.location;
    let opening_hours = req.body.opening_hours;
    let closing_hours = req.body.closing_hours;
    let image_id = req.body.image_id;
    let created_date = new Date();

    let sql = 'UPDATE umkm SET title = ?, price = ?, location = ?, opening_hours = ?, closing_hours = ?, image_id = ?, created_date = ? WHERE id = ?';
    db.query(sql, [title, price, location, opening_hours, closing_hours, image_id, created_date, id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully updated'
        }));
        res.end();
    });
});

app.delete('/umkm', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let id = req.body.id;

    let sql = 'DELETE FROM umkm WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully deleted'
        }));
        res.end();
    });
});
// UMKM API END


// ======================================================================================================================================

// BERITA API START
app.get('/berita', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });
    db.query('SELECT * FROM berita', (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});


app.get('/berita?', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });

    let search = req.query.search;

    db.query('SELECT * FROM berita WHERE title LIKE %?%', [search], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});

app.get('/berita/slug/:slug', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });

    let slug = req.params.slug;

    db.query('SELECT * FROM berita WHERE slug = ?', [slug], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});

app.get('/berita/:id', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });

    let id = req.params.id;

    db.query('SELECT * FROM berita WHERE id = ?', [id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});

app.post('/berita', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let title = req.body.title;
    let description = req.body.description;
    let slug = req.body.slug;
    let image_id = req.body.image_id;
    let created_date = new Date();

    let sql = 'INSERT INTO berita (title, description, slug, image_id, created_date) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, description, slug, image_id, created_date], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully created',
        }));
        res.end();
    });
});

app.put('/berita', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let id = req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let slug = req.body.slug;
    let image_id = req.body.image_id;
    let created_date = new Date();

    let sql = 'UPDATE berita SET title = ?, description = ?, slug = ?, image_id = ?, created_date = ? WHERE id = ?';
    db.query(sql, [title, description, slug, image_id, created_date, id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully updated'
        }));
        res.end();
    });
});

app.delete('/berita', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'application/json'
    });

    let id = req.body.id;

    let sql = 'DELETE FROM berita WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify({
            statusCode: 200,
            message: 'Successfully deleted'
        }));
        res.end();
    });
});
// BERITA API END

// ======================================================================================================================================

// KEPALA DESA API START
app.get('/kepala-desa', (req, res) => {
    res.writeHead(statusCode.success, {
        'Content-Type': 'text/json'
    });
    db.query('SELECT * FROM kepala_desa', (err, result) => {
        if (err) throw err;

        res.write(JSON.stringify(result));
        res.end();
    });
});
// KEPALA DESA API START