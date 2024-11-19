import * as express from 'express'

let app:express.Application = express();

app.listen(5000,()=>{
    console.log("server is running at port 5000")
})

app.get('/login',(req,res)=>{
    const data={
        first_name: "dinesh",
        last_name: "Gaur"
    }
    res.send(data)
})