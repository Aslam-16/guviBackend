const mongoose             =      require("mongoose")

const importeduserschema  =     require("../schemas/userschema");

const userschema          =     mongoose.Schema(importeduserschema,{timestamps: true,  versionKey: false})
const Usersmodel          =     mongoose.model('users',userschema) 

module.exports={
    users:Usersmodel
}
