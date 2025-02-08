const mongoose=require("mongoose")

const blogschema = new mongoose.Schema({
    title:{type:"string",required:true},
    snippet:{type:"string",required:true},
    body:{type:"string",required:true},
 })
 
 const Blog= mongoose.model("Blog",blogschema)
 module.exports= Blog