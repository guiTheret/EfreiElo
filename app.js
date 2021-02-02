// imports
const { response } = require('express')
const express = require('express')
const app = express()
const port = 1234
const mysql = require('mysql')
const fetch = require("node-fetch")

const api_lol_key = 'RGAPI-0e164945-9a84-4d44-a5d7-b3cf4dbf25cd'

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123",
    database: "EfreiElo"
})

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected to DB")
})

// Listen on port 3000
app.listen(port,() => console.info(`Lisenting on port ${port}`))

app.use(express.static('views'))
app.use('views', express.static(__dirname + 'views'))


// Set Views
app.set('views','./views')
app.set('view engine','ejs')

async function get_player_data_from_api(info_players) {
    console.log(info_players)
    info_players.forEach(element => {
        fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${element.nom_invocateur}?api_key=${api_lol_key}`)
        .then(async function (response)  {
            let data =  await response.json();
            console.log(data)
        })
    });
}   

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

    let sql = "SELECT id, nom_invocateur,opgg FROM info_players"
    let query = db.query(sql, (err, info_players, fields) => {
        if (err) throw err;   
        res.render('index',{info_players: info_players})
        get_player_data_from_api(info_players)
        
    })

})

app.get('/register',(req,res) => {
    res.render('register')
})

