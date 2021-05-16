// imports
const { info, Console } = require('console')
const { response } = require('express')
const express = require('express')
const app = express()
const port = 8100
const mysql = require('mysql')
const fetch = require("node-fetch")
const { cpuUsage } = require('process')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const api_lol_key = 'RGAPI-9bf99511-c90f-425c-bdf6-afc1f4db2d93'


var db = mysql.createConnection({
    host: "mysql-robebou.alwaysdata.net",
    user: "robebou_admin",
    password: "EfreiElo1234!1418",
    database: "robebou_efrei_elo",
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

//const step_1_request = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${api_lol_key}`
//const step_2_request = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${EncryptedID}?api_key=${api_lol_key}`

async function get_player_data_step1(summoner) {   
    const response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(summoner)}?api_key=${api_lol_key}`);
    return response
    
} 
async function get_player_data_step2(encryptedID) {
    const response = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedID}?api_key=${api_lol_key}`)
    return response
}
function soloq_over_flex(data) {
    if(data[0] === undefined || data[0].length == 0 ||data[0] == "error") {
        return 'error'
    } else {
        if(data[0].queueType == "RANKED_SOLO_5x5") {
            return 0
        } else if (data[1] === undefined || data[1].length == 0 || data[1] == "error") {
            return "error"
        } else {
            return 1
        }
    }
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
async function update_data_players_fromID(summoner_ID) {
    get_player_data_step2(summoner_ID)
    .then(response => {
        if(response['status'] != 200 ) {
            console.log("ERROR API " + response['status'])
            return "error"
        } else {
            return response.json()
        }
    })
    .then(data => {
        if(data != "error") {
            let sql = `SELECT nom_invocateur FROM info_players WHERE accountID = '${summoner_ID}'`;
            let query = db.query(sql,function(err,info,fields) {
                if(err) throw err;
                console.log(data[0].summonerName + " " + info[0].nom_invocateur)
                if(data[0].summonerName != info[0].nom_invocateur) {
                    console.log("Changement de nom pour " + info[0].nom_invocateur);
                    let sql = `UPDATE info_players SET nom_invocateur = '${data[0].summonerName}' WHERE accountID = '${summoner_ID}'`;
                    let query = db.query(sql, function(err, result) {
                        if(err) throw err;
                    })
                }
            })
            let i = soloq_over_flex(data)
            if(i != "error" && data != "error") {
                let winrate =  data[i].wins / (data[i].losses + data[i].wins) * 100           
                let sql =` UPDATE info_players SET tier = '${data[i].tier}', rank_ok = '${data[i].rank}', lp = ${data[i].leaguePoints}, wins = ${data[i].wins}, looses = ${data[i].losses}, winrate = ${winrate} WHERE accountID = '${data[i].summonerId}'`;
                let query = db.query(sql,function(err, result) {
                    if (err) throw err;
                })
            }
            update_data_players(data[0].summonerName)
            console.log(data[0].summonerName + " has been updated")
        }
        
    })
}
async function update_data_players(summoner) {
    get_player_data_step1(summoner)
    .then(response => {
        if(response['status'] != 200 ) {
            console.log("ERROR API " + response['status'])
            return "error"
        } else {
            return response.json()
        }
    })   
    .then(data => {
        if(data != "error") {
            let sql = `UPDATE info_players SET lvl = '${data.summonerLevel}', icone ='${data.profileIconId}' WHERE accountID = '${data.id}'`
            let query = db.query(sql,function (err, result) {
                if (err) throw err;
            })
        }
    })
}
async function get_data_outside_scope(data,summoner) {
    let check_sql = `SELECT nom_invocateur FROM info_players WHERE nom_invocateur = '${summoner}'`;
    let query_check = await db.query(check_sql,function(err, result) {
        if (err) throw err;
        if (result != "") {
            console.log("USER " + summoner + " ALREADY EXISTS");
        } else {
            console.log(data)
            let sql = `INSERT INTO info_players (nom_invocateur,accountID,icone,lvl,validated) VALUES ('${summoner}','${data.id}','${data.profileIconId}','${data.summonerLevel}',0)`;
            let query = db.query(sql, function (err,result) {
                if (err) throw err;
                console.log("User " + summoner + " was inserted in database");
            })
        }
    })
    get_player_data_step2(data.id)
    .then(response => {
        if(response['status'] != 200 ) {
            console.log("ERROR API " + response['status'])
            return "error"
        } else {
            console.log("working")
            return response.json()
        }
    })
    .then(data => {
        //console.log(data)
        if(data != "error" && isEmpty(data) == false) {
            let i = soloq_over_flex(data)
            let winrate = data[i].wins / (data[i].losses + data[i].wins) * 100
            let sql =` UPDATE info_players SET tier = '${data[i].tier}', rank_ok = '${data[i].rank}', lp = ${data[i].leaguePoints}, wins = ${data[i].wins}, looses = ${data[i].losses}, winrate = ${winrate} WHERE accountID = '${data[i].summonerId}'`;
            let query = db.query(sql, function(err, result) {
                if (err) throw err;
            })
        }
        
        
    })
}
async function insert_database_player_info(summoner) {
    await get_player_data_step1(summoner)
    .then(response =>  {
        if(response['status'] != 200) {
            console.log("ERROR API " + response['status'])
            return "error"
        } else {
            return response.json()
        }
        
    })  
    .then(data => {
        if(data != "error") {
            get_data_outside_scope(data,summoner)
        }
        
    }) 
}
function encode_using_utf8(summoner) {   
    return encodeURI(summoner)
}
function summoner_info_sql_to_dict(info_players_query,case_dict) {
    var info_players = [];
    info_players_query.forEach(element => {
        var dict = {
            nom_invocateur: "",
            lvl: "",
            icone: "",
            elo: "",
            rank: "",
            tier: "",
            lp: "",
            winrate: "",
            played: ""
        };
        dict.nom_invocateur = element.nom_invocateur;
        if(case_dict == 1) {
            dict.lvl = element.lvl;
            dict.icone = `http://ddragon.leagueoflegends.com/cdn/11.3.1/img/profileicon/${element.icone}.png`;
            if(element.rank_ok == null) {
                dict.rank = "UNRANKED"
                dict.winrate = "UNRANKED"
            } else {
                dict.rank = element.rank_ok
                dict.winrate = element.winrate + " %"
            }
            dict.elo = 0
            switch(element.tier) {
                case 'CHALLENGER':
                    dict.elo = 2400
                    break;
                case 'GRANDMASTER':
                    dict.elo = 2400
                    break;
                case 'MASTER':
                    dict.elo = 2400
                    break;
                case 'DIAMOND':
                    dict.elo = 2000
                    break;
                case 'PLATINUM':
                    dict.elo = 1600
                    break;
                case 'GOLD':
                    dict.elo = 1200
                    break;
                case 'SILVER':
                    dict.elo = 800
                    break;
                case 'BRONZE':
                    dict.elo = 400
                    break;
                case 'IRON':
                    dict.elo = 0
                    break;
            }
            switch(element.rank_ok) {
                case'III':
                    dict.elo += 100
                    break;
                case 'II':
                    dict.elo += 200
                    break;
                case 'I':
                    if(element.tier != "CHALLENGER" && element.tier != "GRANDMASTER" && element.tier != "MASTER") {
                        dict.elo += 300
                    }
                    break;
            }
            dict.elo += element.lp
            dict.lp = element.lp
            dict.tier = element.tier;
            dict.played = element.looses + element.wins;
        }
        info_players.push(dict);
    });
    return sort_players_descending(info_players);
}

function sort_players_descending(info_players){
    var changed;
    do{
        changed = false;
        for(var i=0; i < info_players.length-1; i++) {
            if(info_players[i].elo < info_players[i+1].elo) {
                var tmp = info_players[i];
                info_players[i] = info_players[i+1];
                info_players[i+1] = tmp;
                changed = true;
            }
        }
    } while(changed);
    return info_players;
}
async function refresh_all_players() {
    console.log("Refresh dans 2H")
    let sql = "SELECT accountID FROM info_players"
    let query = db.query(sql,(err, data_players,fields) => {
        if (err) throw err;
        console.log(data_players)
        data_players.forEach((element,i) => {   
            setTimeout(() => {
                    update_data_players_fromID(element.accountID)
                    //console.log(element.accountID + " has been updated")
                }, i * 5000);
    })
    //console.log(data_players)
    
    })
}
function load_index(req, res) {
    let info_players = [];
    let sql = "SELECT id, nom_invocateur,lvl,icone,elo,rank_ok,tier,winrate,lp,wins,looses FROM info_players WHERE validated = 1"
    let query = db.query(sql, (err, info_players_query, fields) => {
        info_players = summoner_info_sql_to_dict(info_players_query,1)
        res.render('index',{info_players: info_players}) 
    })
    return info_players;
}
function load_non_validated(req,res) {
    let info_players = [];
    let sql = "SELECT nom_invocateur FROM info_players WHERE validated = 0"
    let query = db.query(sql,(err,info_players_query, fields) => {
        info_players = summoner_info_sql_to_dict(info_players_query,2)
        res.render('admin',{info_players: info_players})
    })
}
function update_summmoner_name(ID_summoner,summoner) {
    let sql = `UPDATE info_players SET nom_invocateur= '${summoner}' WHERE accountID = '${ID_summoner}'`;
    let query = db.query(sql,(err) => {
        if (err) throw err;
    })
}
function validate_summoner(summoner) {
    let sql = `UPDATE info_players SET validated = '1' WHERE nom_invocateur = '${summoner}'`
    let query = db.query(sql,(err) => {
        if (err) throw err;
    })
}
function delete_sql_line(summoner) {
    let sql =  `DELETE FROM info_players WHERE nom_invocateur = '${summoner}'`
    let query = db.query(sql,(err) => {
        if (err) throw err;
    })
}
app.get('',(req,res) => {
    load_index(req, res)
})

app.get('/register',(req,res) => {
    res.render('register')
})
app.get('/404',(req,res) => {
    res.render('404')
})
app.get('/index',(req,res) => {
   load_index(req, res)
})
app.get('/admin',(req,res) => {
    load_non_validated(req, res)
 })
 app.get('/add_player',(req,res) => {
    res.render('add_player')
 })
 app.get('/login',(req,res) => {
    res.render('login')
 })

 
app.post('/validate',(req, res) => {
    console.log(req.body.summoner + " was validated")
    validate_summoner(req.body.summoner)
})
app.post('/delete',(req, res) => {
    console.log(req.body.summoner + " was deleted")
    delete_sql_line(req.body.summoner)
})

app.post('/add_player', (req, res) => {
    var summoner = req.body.summoner
    insert_database_player_info(summoner)
    /* If error then inform add_player.ejs
    var result = insert_database_player_info(summoner)
    if (result==='error'){
        res.render('add_player',{summoner: 'invalid'})
    }*/ 
    res.render('add_player',{summoner: summoner})
})

refresh_all_players()