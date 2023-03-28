const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result);
})

app.post("/login", async (req,resp)=>{
    console.log(req.body);
    if(req.body.password && req.body.email)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user)
        {
          resp.send(user);
        } else {
            resp.send({result: 'No user Found'})
        }   
    } else {
        resp.send({result: 'No user Found'})
    }    
})

app.post("/add-product", async (req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
});

app.get("/products", async (req,resp)=>{
    let products = await Product.find();
    if(products.length>0){
        resp.send(products)
    }else{
        resp.send({result:"No product found"})
    }
})

app.get("/users", async (req,resp)=>{
    let users = await User.find();
    if(users.length>0){
        resp.send(users)
    }else{
        resp.send({result:"No users found"})
    }
})

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log("server is up on 5000")
});