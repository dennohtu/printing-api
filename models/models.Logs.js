// The logs model logs all the activites and requests being donw on the system
import mongoose from "mongoose";

const logsModelSchema = mongoose.Schema({

        User_ID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        Logging_Time:{
            type:Date,
            default:() => Date.now(),
            required:true
        },

        Logging_Endpoint:{
            type:String,
            required:true,
        },
        Logging_IP:{
            type:String,
            required:true,
        },
        Logging_Useragent:{
            type:String,
            required:true,

        },

        Logging_Request_Method:{
            type:String,
            required:true,
        },

    },
    {
        timestamps: true,
    }

)
const Logs = mongoose.model('Logs', logsModelSchema)

export default Logs