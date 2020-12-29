const express     =  require('express')
const app         =  express()
const mongoose    =  require('mongoose')
const cors        =  require('cors')
const bodyParser       = require('body-parser');
const dbconfiq    =  require('./confiq/dbconfiq')

app.use(cors())
mongoose.connect(dbconfiq.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(()=>console.log("Db Connected Successfully")).catch(err => console.log("Db Not Connected Suceessfully "))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false,useUnifiedTopology: true }))
// parse application/json
app.use(bodyParser.json());
require('./routes/')(app)


app.listen(dbconfiq.port, dbconfiq.hostname, () => {
  console.log(`Server running at http://${dbconfiq.hostname}:${dbconfiq.port}/`);
});