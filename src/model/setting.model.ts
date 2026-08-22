import { model, models, Schema } from "mongoose";

interface ISetting{
    ownerId:string
    businessName:string
    supportEmail:string
    knowledge:string
}

const settingSchema = new Schema<ISetting>({
    ownerId:{
        type:String,
        required:true,
        unique:true
    },
       businessName:{
        type:String,
        required:true
    },
       supportEmail:{
        type:String,
        required:true
    },
       knowledge:{
        type:String,
        required:true
    },
},{timestamps:true})

const Setting = models.Setting  || model("Setting",settingSchema)
export default Setting   