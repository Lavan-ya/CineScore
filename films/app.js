const jwt=require('jsonwebtoken')
const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const Film = require("./src/models/film_model")
app.use(express.json())
app.get('/',(req,res)=>{
    
    res.json({msg:"films"});
});

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        jwt.verify(bearerToken,'secretKey',(err,authData)=>{
            if(err){
                res.sendStatus(403);
            }else{
                next();
            }
        })
    }else{
        res.sendStatus(403);
    }
}
app.get("/api/v1/films",async(req,res)=>{
    const films = await Film.find({});
    res.json(films);
});

app.post("/api/v1/films", verifyToken, async (req,res)=>{
        const film = new Film(
            {
                name: req.body.name,
                rating: req.body.rating
            });
        const savedFilm= await film.save();
        res.json(savedFilm);
});

app.post("/api/v1/login", (req,res)=>{
    const user = {
        username: req.body.username
    }  
    jwt.sign({user}, "secretKey", (error,token)=>{
        res.json({
            token
        })
    });
});

module.exports=app;