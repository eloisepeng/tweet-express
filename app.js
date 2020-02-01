const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser')

const file = require('./file.js')
const tweets = require('./tweets')

const port = 3000

app.set('views', path.join(__dirname,'views'))
app.set('view engine','pug')

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))

app.get('/', (req, res) => {
    res.render('index',{tweets})
})

app.use('/file/', file)

app.use((req, res, next) => {
    const err = new Error('Page Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.send(err.message)
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})