const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "apparel_store",
});

////////////////////LOGIN/////////////////

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/server')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')|| 0 === req.url.indexOf('/register')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         id, name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1 }); // user not logged
        } else {
            if ('admin' === req.query.role) {
               
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2 }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3, id: result[0].id }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4, id: result[0].id }); // is user
            }
        }
    });
});

app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.status(401).send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key, text: 'Thanks for coming back ' + req.body.user + ' ! :)', type: 'info' });
        }
    });
});

app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users (name, psw, session)
    VALUES (?, ?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'ok', key, text: 'Welcome to our world!', type: 'info' });
    });
});

///////////////////LOGIN END////////////////////

//CREATE
app.post("/server/garments", (req, res) => {
    const sql = `
    INSERT INTO garments (type, color, size, price, image)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.type, req.body.color, req.body.size, req.body.price, req.body.image], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'A new item has been added.', type: 'success' });
    });
});

app.post("/orders/", (req, res) => {
    const sql = `
    INSERT INTO orders (order_confirmed, order_sum, garment_id, user_id)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.order_confirmed, req.body.order_sum, req.body.garment_id, req.body.user_id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'Thanks for the order. It will be confirmed soon', type: 'info' });
    });
});

// READ (all)
app.get("/server/garments", (req, res) => {
    const sql = `
    SELECT *
    FROM garments
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/home/garments", (req, res) => {
    const sql = `
    SELECT *
    FROM garments
    ORDER BY type
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/garments/noorders", (req, res) => {
    const sql = `
    SELECT g.*, o.id AS cid, o.order_confirmed 
    FROM garments AS g
    INNER JOIN orders AS o
    ON o.garment_id = g.id
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/garments/noorders/:id", (req, res) => {
    const sql = `
    SELECT g.*, o.id AS cid, u.id AS userID, o.order_confirmed
    FROM garments AS g
    INNER JOIN orders AS o
    ON o.garment_id = g.id
    INNER JOIN users AS u
    ON o.user_id = u.id
    WHERE u.id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//DELETE
app.delete("/server/garments/:id", (req, res) => {
    const sql = `
    DELETE FROM garments
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The item has been deleted.', type: 'info' });
    });
});

app.delete("/server/orders/:id", (req, res) => {
    const sql = `
    DELETE FROM orders
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'An order has been deleted.', type: 'info' });
    });
});


//EDIT

// ORDER APPROVAL by admin

app.put("/server/orders/:id", (req, res) => {
  const sql = `
    UPDATE orders
    SET order_confirmed = ?
    WHERE id = ?
    `;
  con.query(sql, [req.body.order_confirmed, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ msg: 'OK', text: 'The order has been confirmed', type: 'info' });
  });
});

//GARMENT EDIT

app.put("/server/garments/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE garments
        SET type = ?, color = ?, size = ?, price = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.type, req.body.color, req.body.size, req.body.price, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE garments
        SET type = ?, color = ?, size = ?, price = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.type, req.body.color, req.body.size, req.body.price, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE garments
        SET type = ?, color = ?, size = ?, price = ?
        WHERE id = ?
        `;
        r = [req.body.type, req.body.color, req.body.size, req.body.price, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send({ msg: 'OK', text: 'The item has been edited.', type: 'success' });
    });
});

app.listen(port, () => {
    console.log(`Rubai yra renkami per ${port} portą!`)
});






// // READ
// // SELECT column1, column2, ...
// // FROM table_name;

// // app.get("/trees/:tipas", (req, res) => {

// //     // console.log(req.query.sort);

// //     const sql = `
// //     SELECT id, type, title, height
// //     FROM trees
// //     WHERE type = ? OR type = ?
// //     `;
// //     con.query(sql, [req.params.tipas, req.query.sort], (err, result) => {
// //         if (err) throw err;
// //         res.send(result);
// //     });
// // });

// // INNER JOIN
// // SELECT column_name(s)
// // FROM table1
// // INNER JOIN table2
// // ON table1.column_name = table2.column_name;
// app.get("/get-it/inner-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     INNER JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/left-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     LEFT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/right-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     RIGHT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });





// // READ (all)
// app.get("/trees", (req, res) => {
//     const sql = `
//     SELECT id, type, title, height
//     FROM trees
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// //CREATE
// // INSERT INTO table_name (column1, column2, column3, ...)
// // VALUES (value1, value2, value3, ...);
// app.post("/trees", (req, res) => {
//     const sql = `
//     INSERT INTO trees (title, height, type)
//     VALUES (?, ?, ?)
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //DELETE
// // DELETE FROM table_name WHERE condition;
// app.delete("/trees/:id", (req, res) => {
//     const sql = `
//     DELETE FROM trees
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //EDIT
// // UPDATE table_name
// // SET column1 = value1, column2 = value2, ...
// // WHERE condition;
// app.put("/trees/:id", (req, res) => {
//     const sql = `
//     UPDATE trees
//     SET title = ?, height = ?, type = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });