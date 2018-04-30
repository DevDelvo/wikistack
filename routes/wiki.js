const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')
const layOut = require("../views/layout");
const { Page } = require("../models");


router.get ('/', (req, res, next) => {
    res.send(layOut());
});

router.post('/', async (req, res, next) => {
    // const page = new Page({
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status
    // });
    const page = new Page(req.body);

    try {
        await page.save();
        res.redirect('/');
    } catch(err) {next(err)}
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
})

module.exports = router