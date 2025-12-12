import mongoose from 'mongoose'

import { ENV } from './env.js'

export const connectDB = async ()=>{

try {
    await mongoose.connect(ENV.MONGO_URI).then(()=>console.log("Db is connected👌"))
    


} catch (error) {
    console.log("Error connectingdb",error)
    process.exit(1)
}
}