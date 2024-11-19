import * as express from 'express'
import * as mongoose from 'mongoose'
import { getEnvironmentVariables } from './environments/env';

let app:express.Application = express();

app.listen(5000,()=>{
    console.log("server is running at port 5000")
})

mongoose.connect(getEnvironmentVariables().db_url).then(()=>{
    console.log("mongo DB is connected")
})

app.get('/login',(req,res)=>{
    const data={
        first_name: "dinesh",
        last_name: "Gaur"
    }
    res.send(data)
})