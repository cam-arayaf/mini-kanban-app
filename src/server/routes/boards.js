const express = require('express');
const Boards = require('./../models/boards');
const app = express();

const defaultError = (resp, error) => resp.status(500).json({ ok: false, error });
const customError = resp => resp.status(400).json({ ok: false, error: { message: 'Board(s) not found' } });

app.get('/boards', async (req, resp) => {
    const selectors = {};
    const returnFields = 'class_name title';
    const sortFields = { class_name: 1, title: 1 };
    await Boards.find(selectors, returnFields).sort(sortFields).exec((errFind, boards) => {
        if (boards.length === 0) return customError(resp);
        if (errFind) return defaultError(resp, errFind);
        Boards.countDocuments((errCount, total) => {
            if (errCount) return defaultError(resp, errCount);
            resp.json({ ok: true, total, boards });
        });
    });
});

module.exports = app;