const express = require('express')       
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

// dotenv configuration
dotenv.config()

// rest object 
const app = express()

// midlewares
app.use(cors())
app.use(express.json())


// static files access
app.use(express.static(path.join(__dirname, './client/build')))

// routes
app.use('/api/v1/portfolio', require("./routes/portfolioRoutes")) 
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// port
const port = process.env.PORT || 8080

// listen
app.listen(port, () => {
    console.log(`Server is Running On Port ${port}`)
})