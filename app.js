const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
app.use(cors())
const path = require("path");
const port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
async function conn()
{
    let d=await mongoose.connect('mongodb://127.0.0.1:27017/pp')
}
conn();
const products = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    cat: {
        type:String,
        required:true
    },
    cmp: {
        type:String,
        required:true
    }
  });
const MyModel = mongoose.model('products', products);
app.post('/product',(req,res)=>{
    let data=req.body;
    let m=new MyModel(data);
    m.save()
    res.json(data)
    })
app.put('/product/:id',(req,res)=>{
        async function updatepro()
        {
            try
            {
            let id=req.params.id
            let data=req.body;
            console.log(id,data)
            let rs=await MyModel.findOneAndUpdate({_id:id},{$set:data})
            let d=await MyModel.find({_id:id});
            res.json(d[0]);
            }catch(err)
            {
                console.log(err);
            }
        }
        updatepro();
        })
app.get('/product',(req,res)=>{
    async function show()
    {
        
        let d=await MyModel.find();
        //console.log(d);
        res.json(d);
    }
    show()
})
app.get('/product/:id',(req,res)=>{
    async function show()
    {
        try
        {
        let id=req.params.id;
        let d=await MyModel.find({_id:id});
        res.json(d[0]);
        }catch(err)
        {
            res.status(404)
            res.json("not found")
        }
    }
    show()
})
app.delete("/product/:id",(req,res)=>{
    async function deletedata()
    {
        id=req.params.id
        let t=await MyModel.findOneAndDelete({_id:id})
        if(t==null)
        {
            res.status(404)
            res.json("not found")
        }
        else
        {
            res.json(t)
        }
    }
    deletedata()
})

app.listen(port, ()=>{
console.log(`App is listening on port ${port}`);
});
