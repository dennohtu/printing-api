// go into routes folder
// get all file names in the folder
// get route names
import fs from "fs";

// generate schema with route names
const generatePermissionsSchema =  (routeNames) => {

    const CRUD = ['create','read','update','delete','readall']
    const fullNames = []
    const fields = {}
    for(let i =0; i <= routeNames.length -1; i++){
        for(let j =0; j <= CRUD.length-1; j++){

            fields[`${CRUD[j]}${routeNames[i]}`] =true
            fullNames.push(`${CRUD[j]}${routeNames[i]} : {
                                                            type:Boolean,
                                                            required:true,
                                                            default: false
                                                         }`

            )
        }
    }
    //console.log()
    // const permConst =` {
    //     type:Boolean,
    //     required:true,
    //     default: true
    //  }`
    // const schemaBody = fullNames.reduce((acc,curr)=> (acc[curr]=permConst,acc),[]);
    // console.log(typeof (schemaBody))
   // console.log("-------------------------------------------------------------------------------------")

  //  console.log(schemaBody)
  //

    fs.writeFile("./rolesDefaultPerm.txt", JSON.stringify(fields), err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
        console.log("rolesDefaultPerm.txt file ok")
    })

    // return fullNames.join(",").toString().trim().replace(/=/g, ":");
    console.log("the fields are ",fields)
    fs.writeFile('./permbody.js',  JSON.stringify(fields), err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
        console.log("permbody.js file ok")
    })
    return fullNames.join(",").toString().trim();


}

const makingSchemaFinal =  (schemaBody) =>
{

            const  schemaTop = `
import mongoose from "mongoose";           
const permissionsModel = mongoose.Schema({
             `

            const schemaBottom = `
            
          
            ,
              active:{
                       type:Boolean,
                       required:true,
                       default: true
            }
            },
{
    timestamps: true,
}
)
            
const Permissions = mongoose.model('Permissions', permissionsModel)
            
export default Permissions
            `

    const schemaBottomRole = `
            
          
            ,
              active:{
                       type:Boolean,
                       required:true,
                       default: true
            }
            },
{
    timestamps: true,
}
)
            
const Permissions = mongoose.model('PermissionsDefault', permissionsModel)
            
export default Permissions
            `


const userSchema = `

,
            User_ID :{
               type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            
            }
`

    const roleDefaultSchemaBottom =`
        ,User_Role_ID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
        }

    
    
    `

    console.log("-------------------------------------------------------------------------------------")
 //   schemaBody =JSON.stringify(schemaBody);
    //console.log( schemaBody.toString())
    const schemaBodyNormal =schemaTop + schemaBody +userSchema+ schemaBottom
    fs.writeFile('../models/models.permissions.js', schemaBodyNormal, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
        console.log("../models/models.permissions.js file ok")
    })

    const schemaBodyRoles = schemaTop + schemaBody + roleDefaultSchemaBottom + schemaBottomRole

    fs.writeFile('../models/models.defaultPermissions.js', schemaBodyRoles, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
        console.log("../models/models.defaultPermissions.js Default roles permissions file ok")
    })

}


const listAllFilesInFolder =   (folder) => {

    const fileNames = []
    fs.readdir(folder, (err, files) => {

        files.forEach(file => {
            //split on .
            const n = file.split(".")
            fileNames.push(n[1])
        })
        console.log(fileNames)

        makingSchemaFinal(generatePermissionsSchema(fileNames))
        return fileNames
    });

}


listAllFilesInFolder('../Routes')

// save schema file to models
//
