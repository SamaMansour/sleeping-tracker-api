const mongoose = require('mongoose');
/** connect to db  */
const connectDB = async () => {
    mongoose.connect(
        process.env.MONGO_URI,
        async(err)=>{
            if(err) throw err;
            console.log("conncted to db")
        }
    )

}

module.exports = connectDB