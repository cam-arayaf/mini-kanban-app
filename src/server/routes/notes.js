const express = require('express');
const Notes = require('./../models/notes');
const app = express();

const defaultError = (resp, error) => resp.status(500).json({ ok: false, error });
const customError = resp => resp.status(400).json({ ok: false, error: { message: 'Note(s) not found' } });
const defaultResp = (resp, { _id, type, text }) => resp.json({ ok: true, note: { _id, type, text } });

app.get('/notes', async (req, resp) => {
    const selectors = {};
    const returnFields = 'type text';
    const sortFields = { type: 1, text: 1 };
    await Notes.find(selectors, returnFields).sort(sortFields).exec((errFind, notes) => {
        if (notes.length === 0) return customError(resp);
        if (errFind) return defaultError(resp, errFind);
        Notes.countDocuments((errCount, total) => {
            if (errCount) return defaultError(resp, errCount);
            resp.json({ ok: true, total, notes });
        });
    });
});

app.post('/notes', async (req, resp) => {
    const { type, text } = req.body;
    const body = { type, text };
    await new Notes(body).save((error, note) => {
        if (error) return defaultError(resp, error);
        defaultResp(resp, note);
    });
});

app.put('/notes/:id', async (req, resp) => {
    const { id } = req.params;
    const { type, text } = req.body;
    const body = { type, text };
    const options = { new: true, runValidators: true, context: 'query' };
    await Notes.findByIdAndUpdate(id, body, options).exec((error, note) => {
        if (Object.is(error, null) && !note) return customError(resp);
        if (error) return defaultError(resp, error);
        defaultResp(resp, note);
    });
});

app.delete('/notes/:id', async (req, resp) => {
    const { id } = req.params;
    await Notes.findByIdAndRemove(id).exec((error, note) => {
        if (Object.is(error, null) && !note) return customError(resp);
        if (error) return defaultError(resp, error);
        defaultResp(resp, note);
    });
});

module.exports = app;