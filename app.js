import express from "express";
import "dotenv/config";
import session from "express-session";

const app = express();


app.set("views", "./views").set("view engine", "ejs");

app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: false,    
}));


app.use((req, res, next) => {
    console.log(req.session)
    if(!req.session.isLogged) req.session.isLogged = false;
    console.log(req.session.isLogged)
    next();
});

app.get("/", (req, res) => {
    if(req.session.isLogged){        
        res.status(200).render("home", {user: req.session.alias});
        return;
    }
    res.status(200).render("home", {user: null});
});


app.get("/connected", (req, res)=>{
    req.session.isLogged = true;
    req.session.alias = "jacky";
    res.json({isLogged: req.session.isLogged});
});

app.listen(9000);
