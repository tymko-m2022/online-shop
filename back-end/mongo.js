const mongoose = require("mongoose");

const DB_CONNECTION = "mongodb+srv://tymkomaryana:juzm0NgK3lfu1LsL@cluster0.jgign8v.mongodb.net/TreeTrove?retryWrites=true&w=majority";

const connection = async () => {
    console.log("Start connection");
    try{
        await mongoose.connect(DB_CONNECTION);
        console.log("Connected");
    } catch(err){
        console.log(err);
    }
}

connection();