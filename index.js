const express = require('express')
const res = require('express/lib/response')
const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})
db.connect(err => {
    if (err) {
        throw err
    }
    console.log("MySQL connected")
})
const app = express()
app.get('/creatdb', (req, res) => {
    let sql = "CREATE DATABASE nodemysql"
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send("Database Created")
    })
})

app.get('/createmployee', (req, res) => {
    let sql = "CREATE TABLE employee (id int AUTO_INCREMENT, name varchar(255), PRIMARY KEY(id))"

    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send("Employee Created")
    })
})
app.get('/employee1', (req, res) => {
    let post = { name: "Jack" }
    let sql = "INSERT INTO employee SET ?"
    let query = db.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send("Employee added")
    })
})
app.get('/getemployee', (err, result) => {
    let sql = "SELECT * FROM employee"
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        console.log(result);
        res.send("Employee detail fetched")
    })
})
app.get('/updateemployee/:id', (req, res) => {
    let newName = "Tran Xuan An"
    let sql = `Update employee SET name=  '${newName}' WHERE id=${req.params.id}   `
    let query = db.query(sql, err => {
        if (err) {
            throw err
        }

        res.send("Employee update")
    })
})
app.get('/deleteemployee/:id', (req, res) => {
    let sql = `Delete FROM employee WHERE id=${req.params.id}   `
    let query = db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send("Employee delete")
    })
})

app.listen('3000', () => {
    console.log("Server start on port 3000")
})