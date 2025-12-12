import express from 'express'
import { ENV } from './config/env.js'
import { connectDB } from './config/db.config.js'

const app = express()

app.get('/',(req,res)=>(
    res.send("Nice to meet you sudais☕")
))

const startServer = async ()=>{
    try {
        await connectDB()
        app.listen(ENV.PORT, ()=>(
    console.log(`server is litening to port:${ENV.PORT}`)
    
))
    } catch (error) {
        console.log("field to start server", error.message)
        process.exit(1)
    }
}
startServer();
