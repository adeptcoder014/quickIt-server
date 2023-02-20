const mongoose = require("mongoose");
require("dotenv").config();
//===========================
const DB="mongodb+srv://User_369:TonyStark007@cluster0.37ajaix.mongodb.net/Delywer?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Database got connected ")
})
mongoose.set('strictQuery',false)
