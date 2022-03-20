require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const appServer = require('./bin/app/server');
const port = 9001;
const db = require('./bin/helpers/databases/connection');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => {
    const ctx = 'app-listen';
    console.log(ctx, `${appServer.name} started, listening at http://localhost:${port}`, 'initate application');
});




const statusCode = {
    success: 200,
};


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

            res.write(JSON.stringify({
                statusCode: 200,
                message: 'Successfully login',
            }));
            res.end();
        });
    } else {
        res.write(JSON.stringify({
            statusCode: 400,
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
    let created_date = new Date();

    let sql = 'INSERT INTO pariwisata (title, price, location, opening_hours, closing_hours, image_id, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, price, location, opening_hours, closing_hours, image_id, created_date], (err, result) => {
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
    let created_date = new Date();

    let sql = 'UPDATE pariwisata SET title = ?, price = ?, location = ?, opening_hours = ?, closing_hours = ?, image_id = ?, created_date = ? WHERE id = ?';
    db.query(sql, [title, price, location, opening_hours, closing_hours, image_id, created_date, id], (err, result) => {
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