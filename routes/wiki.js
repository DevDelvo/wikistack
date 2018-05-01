const express = require('express');
const router = express.Router();
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views')
const layOut = require("../views/layout");
const { Page, User } = require("../models");


router.get ('/', async (req, res, next) => {
    try {
        const pages = await Page.findAll();
        res.send(main(pages));
    } catch(err) { next(err) }
});

router.post('/', async (req, res, next) => {
    // const page = new Page({
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status
    // });
    // const page = new Page(req.body);

    try {
        const [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        });

        const page = await Page.create(req.body);
    
        page.setAuthor(user);

        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    } catch(err) {next(err)}
});

// /wiki/add
router.get('/add', (req, res, next) => {
    res.send(addPage());
});

// wiki/:slug
router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        if (page === null) {
            res.sendStatus(404);
        }
        const author = await page.getAuthor();

        res.send(wikiPage(page, author));
    } catch(err) { next(err) }
});

router.post('/:slug', async (req, res, next) => {
    try {
        const [updatedRowCount, updatedPages] = await Page.update(req.body, {
            where: {
                slug: req.params.slug
            },
            returning: true
        });
        res.redirect(`/wiki/${updatedPages[0].slug}`);
    } catch(err) { next(err) }
});

router.get('/:slug/delete', async (req, res, next) => {
    try {
        await Page.destroy({
            where: {
                slug: req.params.slug
            }
        });
        res.redirect('/wiki');
    } catch(err) { next(err) }
});

router.get('/:slug/edit', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });

        if (page === null) {
            res.sendStatus(404);
        } else{
            const author = await page.getAuthor();
            res.send(editPage(page, author))
        }
    } catch(err) { next(err) }
});

router.post('', (req, res, next) => {

});


module.exports = router