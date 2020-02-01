const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')



router.get('/:filename', (req, res) => {
    const content = fs.readFileSync(`./files/${req.params.filename}`, (err) => {
        if (err){
            res.send(err)
        } else {
            res.send('success')
        }
    })
})

router.post('/:filename', (req, res) => {
    const content = fs.writeFileSync(`./files/${req.params.filename}`, req.body.content, (err) => {
        if (err){
            res.send(err)
        } else {
            res.send('success')
        }
    })
})

router.put('/:filename', (req, res) => {
    const content = fs.appendFileSync(`./files/${req.params.filename}`, req.body.content, (err) => {
        if (err){
            res.send(err)
        } else {
            res.send('success')
        }
    })
})

router.delete('/:filename', (req, res) => {
    const content = fs.writeFileSync(`./files/${req.params.filename}`, req.body.content, (err) => {
        if (err){
            res.send(err)
        } else {
            res.send('success')
        }
    })
})

module.exports = router