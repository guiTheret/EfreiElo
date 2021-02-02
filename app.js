// imports
const express = require('express')
const app = express()
const port = 1234
const mysql = require('mysql')


// Listen on port 3000
app.listen(port,() => console.info(`Lisenting on port ${port}`))

app.use(express.static('views'))
app.use('views', express.static(__dirname + 'views'))


// Set Views
app.set('views','./views')
app.set('view engine','ejs')

app.get('',(req,res) => {
    const info_players = [{
        icone : "Image",
        nom_invocateur : "Robert",
        lvl: "45",
        Elo: "Master"
    },
    {
        icone : "Image",
        nom_invocateur : "Robert",
        lvl: "45",
        Elo: "Master"
    },{
        icone : "Image",
        nom_invocateur : "Robert",
        lvl: "45",
        Elo: "Master"
    },{
        icone : "Image",
        nom_invocateur : "Robert",
        lvl: "45",
        Elo: "Bronze"
    }
]
    res.render('index',{info_players: info_players})
})

app.get('/register',(req,res) => {
    res.render('register')
})

