
import express from 'express'

let app = express()

app.get('/', function(req,res) {
    res.send('App is Working')
} )

app.listen(3011, function() {
    console.log('App listen')
})