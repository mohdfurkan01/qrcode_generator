const express = require("express");
const app = express();
const ejs = require("ejs")
const path = require("path")
const qr = require("qrcode")

const port = process.env.port || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:false})) 

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, 'view'))

// style.css file imported here
app.use(express.static('public'));

app.get("/",(req, res, next)=>{
    res.render('index');
})

app.post('/scan',(req,res,next) =>{
 const input_text = req.body.text
 console.log(input_text);
 qr.toDataURL(input_text,(err,src)=>{
    res.render("scan",{
        qr_code:src,
    })
 })
});
app.listen(port,console.log(`Listening on port ${port}`));
