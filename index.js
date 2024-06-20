let fs = require('fs')
let express = require('express')
const PORT = process?.env?.PORT || 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let db = JSON.parse(fs.readFileSync("./db.json", "utf-8"))
let app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req,res, next)=>{
  if (req.cookies.id) {
    next()
  } else {
    res.cookie('id', Date.now())
    res.cookie('alreadySend', false)
    next()
  }
})

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/public/html/1/index.html")
})

app.get("/db", (req,res) =>{
  res.json(db)
})

app.get("/pesan_kesan", (req, res) => {
  res.sendFile(__dirname+"/public/html/2/index.html")
})

app.post("/kirim_pesan", (req, res) => {
  console.log(req.body)
  console.log(req.cookies)
  if(req.cookies.alreadySend === "false"){
    db.push({
      ...req.body
    })
    res.cookie('alreadySend', true)
  }
  res.sendFile(__dirname+"/public/html/2/thank_you.html") 
})

app.get("/messages", (req, res) => {
  res.sendFile(__dirname+"/public/html/3/index.html")
})

app.all('*', (_, res) => res.redirect('/'))
app.listen(PORT, () => console.log('App listened on port', PORT))

setInterval( ()=>{
  fs.writeFileSync("./db.json", JSON.stringify(db,0,2))
}, 3000)