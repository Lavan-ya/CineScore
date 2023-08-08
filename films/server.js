const app=require("./app");
const {DB_URI} = require("./src/config")
const mongoose = require("mongoose");
mongoose.connect(DB_URI);
console.log("Connected to MONGO DB successfully")
app.listen(3000,()=>{
console.log("running on port 3000");
console.log("---------------------------");
});