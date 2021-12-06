const express = require('express')

const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})
app.post('/', (req, res) => {

    console.log("post")
})

app.listen(port, () => {
    console.log("server is running on: ", port)
})