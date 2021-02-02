// imports
const express = require('express')
const app = express()
const port = 1234
const mysql = require('mysql')


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
    const info_players = [{
        nom_invocateur : "Robert",
        lvl: "45"
    },
    {
        nom_invocateur :"Nemesis",
        lvl:"18"
    }]
    res.render('index',{info_players: info_players})
})

app.get('/register',(req,res) => {
    res.render('register')
})

