"use strict";
const express = require('express');
const path = require('path');
const app = express();

const frontEndPath = path.join(__dirname, '..', 'front-end', 'dist', 'front-end');

app.use(express.static(frontEndPath));

app.get('/', (reg, res) => {
    res.sendFile(path.join(frontEndPath, 'index.html'));
})

app.get('/admin', (reg, res) => {
    res.sendFile(path.join(frontEndPath, 'index.html'));
})

app.get('/cart', (reg, res) => {
    res.sendFile(path.join(frontEndPath, 'index.html'));
})

app.get('/products/*', (reg, res) => {
    res.sendFile(path.join(frontEndPath, 'index.html'));
})

app.get('/404', (reg, res) => {
    res.sendFile(path.join(frontEndPath, 'index.html'));
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(frontEndPath, 'index.html'));
  });

const port = 3000;

app.listen(port, () => {
    console.log('Застосунок запускається');
    console.log(`Сервер запущено на порті ${port} або за посиланням http://localhost:${port}/`);
}).on('error', (err) => {
    console.error('Помилка запуску сервера', err.message);
})