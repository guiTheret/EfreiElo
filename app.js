// imports
const express = require('express')
const app = express()
const port = 1234

// Listen on port 3000
app.listen(port,() => console.info(`Lisenting on port ${port}`))

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Views
app.set('views','./views')
app.set('view engine','ejs')

app.get('',(req,res) => {
    res.render('index',{text : 'Test'})
})

app.get('/register',(req,res) => {
    res.render('register')
})

