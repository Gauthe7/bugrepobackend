const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
server.use(cors());
server.use(bodyParser.json())
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bugs');
    console.log('db connected');

}

const bugSchema = new mongoose.Schema({
    bugid:Number,
  
    title:String,
   
    des:String,
  
    date:String,
    
    project:String,
   
    reporter:String,
    
    Url:String
});
const Bug = mongoose.model('Bug', bugSchema);




server.post('/bugs', async (req, res) => {
    let bug = new Bug()
   
    bug.bugid=req.body.bugid 
    bug.title= req.body.title
    bug.des= req.body.des
    bug.date= req.body.date
    bug.project= req.body.project
    bug.reporter= req.body.reporter
    bug.Url= req.body.Url

    const doc = await bug.save()

    console.log(doc);
    res.json(doc);
})

server.get('/bugs', async(req,res)=>{
    const docs=await Bug.find({});
    res.json(docs )
})
server.delete('/bugs', async(req,res)=>{
    const docs=await Bug.deleteOne({});
    res.json(docs )
})




server.listen(8081, () => {
    console.log("server started");

})
