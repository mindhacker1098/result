const mongoose=require("mongoose");

const UserSchema=()=>{


    return mongoose.Schema({
    
        "Sl No": {
                type: Number
            },
        "Registration No": {
                type: String
            },
        "Name": {
                type: String
            },
        "Sem": {
                type: String
            },
        "Subject Code": {
                type: String
            },
        "Subject Name": {
                type: String
            },
        "Subject Type": {
                type: String
            },
        "Subject Credit": {
                type: String
            },
        "Grade": {
                type: String
            }
        })

}
module.exports={UserSchema};