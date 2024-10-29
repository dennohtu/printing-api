import mongoose from "mongoose";
const permissionsModel = mongoose.Schema(
  {
    createartificialinsemination: {
      type: Boolean,
      required: true,
      default: false,
    },
    readartificialinsemination: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateartificialinsemination: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteartificialinsemination: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallartificialinsemination: {
      type: Boolean,
      required: true,
      default: true,
    },
    createassetrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readassetrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateassetrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteassetrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallassetrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    createbiologicalagents: {
      type: Boolean,
      required: true,
      default: false,
    },
    readbiologicalagents: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatebiologicalagents: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletebiologicalagents: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallbiologicalagents: {
      type: Boolean,
      required: true,
      default: true,
    },
    createbirthrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readbirthrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatebirthrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletebirthrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallbirthrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    createcategory: {
      type: Boolean,
      required: true,
      default: false,
    },
    readcategory: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatecategory: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletecategory: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallcategory: {
      type: Boolean,
      required: true,
      default: true,
    },
    createcompanyrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readcompanyrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatecompanyrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletecompanyrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallcompanyrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    createcrop: {
      type: Boolean,
      required: true,
      default: false,
    },
    readcrop: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatecrop: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletecrop: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallcrops: {
      type: Boolean,
      required: true,
      default: true,
    },
    createcropcalendar: {
      type: Boolean,
      required: true,
      default: false,
    },
    readcropcalendar: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatecropcalendar: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletecropcalendar: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallcropcalendar: {
      type: Boolean,
      required: true,
      default: true,
    },
    createcropproduction: {
      type: Boolean,
      required: true,
      default: false,
    },
    readcropproduction: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatecropproduction: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletecropproduction: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallcropproduction: {
      type: Boolean,
      required: true,
      default: true,
    },
    createcropsales: {
      type: Boolean,
      required: true,
      default: false,
    },
    readcropsales: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatecropsales: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletecropsales: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallcropsales: {
      type: Boolean,
      required: true,
      default: true,
    },
    createcropscouting: {
      type: Boolean,
      required: true,
      default: false,
    },
    readcropscouting: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatecropscouting: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletecropscouting: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallcropscouting: {
      type: Boolean,
      required: true,
      default: true,
    },
    createcroptreatment: {
      type: Boolean,
      required: true,
      default: false,
    },
    readcroptreatment: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatecroptreatment: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletecroptreatment: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallcroptreatment: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdebtorsrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readdebtorsrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatedebtorsrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedebtorsrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalldebtorsrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdefaultrolepermissions: {
      type: Boolean,
      required: true,
      default: false,
    },
    readdefaultrolepermissions: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatedefaultrolepermissions: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedefaultrolepermissions: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalldefaultrolepermissions: {
      type: Boolean,
      required: true,
      default: true,
    },
    createfarm: {
      type: Boolean,
      required: true,
      default: false,
    },
    readfarm: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatefarm: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletefarm: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallfarm: {
      type: Boolean,
      required: true,
      default: true,
    },
    createirrigation: {
      type: Boolean,
      required: true,
      default: false,
    },
    readirrigation: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateirrigation: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteirrigation: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallirrigation: {
      type: Boolean,
      required: true,
      default: true,
    },
    createlipanampesa: {
      type: Boolean,
      required: true,
      default: false,
    },
    readlipanampesa: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatelipanampesa: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletelipanampesa: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalllipanampesa: {
      type: Boolean,
      required: true,
      default: true,
    },
    createlivestockfeedingprogram: {
      type: Boolean,
      required: true,
      default: false,
    },
    readlivestockfeedingprogram: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatelivestockfeedingprogram: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletelivestockfeedingprogram: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalllivestockfeedingprogram: {
      type: Boolean,
      required: true,
      default: true,
    },
    createlivestockInventory: {
      type: Boolean,
      required: true,
      default: false,
    },
    readlivestockInventory: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatelivestockInventory: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletelivestockInventory: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalllivestockInventory: {
      type: Boolean,
      required: true,
      default: true,
    },
    createlivestockpurchase: {
      type: Boolean,
      required: true,
      default: false,
    },
    readlivestockpurchase: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatelivestockpurchase: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletelivestockpurchase: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalllivestockpurchase: {
      type: Boolean,
      required: true,
      default: true,
    },
    createlivestockRegister: {
      type: Boolean,
      required: true,
      default: false,
    },
    readlivestockRegister: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatelivestockRegister: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletelivestockRegister: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalllivestockRegister: {
      type: Boolean,
      required: true,
      default: true,
    },
    createlivestocksales: {
      type: Boolean,
      required: true,
      default: false,
    },
    readlivestocksales: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatelivestocksales: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletelivestocksales: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalllivestocksales: {
      type: Boolean,
      required: true,
      default: true,
    },
    createlivestockscouting: {
      type: Boolean,
      required: true,
      default: false,
    },
    readlivestockscouting: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatelivestockscouting: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletelivestockscouting: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalllivestockscouting: {
      type: Boolean,
      required: true,
      default: true,
    },
    createlivestocktreatment: {
      type: Boolean,
      required: true,
      default: false,
    },
    readlivestocktreatment: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatelivestocktreatment: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletelivestocktreatment: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalllivestocktreatment: {
      type: Boolean,
      required: true,
      default: true,
    },
    createmaintenancerecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readmaintenancerecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatemaintenancerecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletemaintenancerecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallmaintenancerecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    createmanure: {
      type: Boolean,
      required: true,
      default: false,
    },
    readmanure: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatemanure: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletemanure: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallmanure: {
      type: Boolean,
      required: true,
      default: true,
    },
    createmanureAndFertiliser: {
      type: Boolean,
      required: true,
      default: false,
    },
    readmanureAndFertiliser: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatemanureAndFertiliser: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletemanureAndFertiliser: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallmanureAndFertiliser: {
      type: Boolean,
      required: true,
      default: true,
    },
    createmeatproduction: {
      type: Boolean,
      required: true,
      default: false,
    },
    readmeatproduction: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatemeatproduction: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletemeatproduction: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallmeatproduction: {
      type: Boolean,
      required: true,
      default: true,
    },
    createmilk: {
      type: Boolean,
      required: true,
      default: false,
    },
    readmilk: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatemilk: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletemilk: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallmilk: {
      type: Boolean,
      required: true,
      default: true,
    },
    createmorningweather: {
      type: Boolean,
      required: true,
      default: false,
    },
    readmorningweather: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatemorningweather: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletemorningweather: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallmorningweather: {
      type: Boolean,
      required: true,
      default: true,
    },
    createmortality: {
      type: Boolean,
      required: true,
      default: false,
    },
    readmortality: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatemortality: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletemortality: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallmortality: {
      type: Boolean,
      required: true,
      default: true,
    },
    createpastureTreatmentRecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readpastureTreatmentRecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatepastureTreatmentRecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletepastureTreatmentRecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallpastureTreatmentRecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    createpermissions: {
      type: Boolean,
      required: true,
      default: false,
    },
    readpermissions: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatepermissions: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletepermissions: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallpermissions: {
      type: Boolean,
      required: true,
      default: true,
    },
    createplanting: {
      type: Boolean,
      required: true,
      default: false,
    },
    readplanting: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateplanting: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteplanting: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallplanting: {
      type: Boolean,
      required: true,
      default: true,
    },
    createpoultry: {
      type: Boolean,
      required: true,
      default: false,
    },
    readpoultry: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatepoultry: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletepoultry: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallpoultry: {
      type: Boolean,
      required: true,
      default: true,
    },
    createproduct: {
      type: Boolean,
      required: true,
      default: false,
    },
    readproduct: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateproduct: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteproduct: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallproduct: {
      type: Boolean,
      required: true,
      default: true,
    },
    createrewards: {
      type: Boolean,
      required: true,
      default: false,
    },
    readrewards: {
      type: Boolean,
      required: true,
      default: true,
    },
    updaterewards: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleterewards: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallrewards: {
      type: Boolean,
      required: true,
      default: true,
    },
    createroles: {
      type: Boolean,
      required: true,
      default: false,
    },
    readroles: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateroles: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteroles: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallroles: {
      type: Boolean,
      required: true,
      default: true,
    },
    createseedrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readseedrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateseedrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteseedrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallseedrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    createsegments: {
      type: Boolean,
      required: true,
      default: false,
    },
    readsegments: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatesegments: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletesegments: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallsegments: {
      type: Boolean,
      required: true,
      default: true,
    },
    createshipments: {
      type: Boolean,
      required: true,
      default: false,
    },
    readshipments: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateshipments: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteshipments: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallshipments: {
      type: Boolean,
      required: true,
      default: true,
    },
    createsoiltests: {
      type: Boolean,
      required: true,
      default: false,
    },
    readsoiltests: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatesoiltests: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletesoiltests: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallsoiltests: {
      type: Boolean,
      required: true,
      default: true,
    },
    createtest: {
      type: Boolean,
      required: true,
      default: false,
    },
    readtest: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatetest: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletetest: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalltest: {
      type: Boolean,
      required: true,
      default: true,
    },
    createtypeofanimal: {
      type: Boolean,
      required: true,
      default: false,
    },
    readtypeofanimal: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatetypeofanimal: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletetypeofanimal: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalltypeofanimal: {
      type: Boolean,
      required: true,
      default: true,
    },
    uploaddocument: {
      type: Boolean,
      required: true,
      default: false,
    },
    readuploads: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateuploads: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletedocument: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalluploads: {
      type: Boolean,
      required: true,
      default: true,
    },
    createuser: {
      type: Boolean,
      required: true,
      default: false,
    },
    readuser: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateuser: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteuser: {
      type: Boolean,
      required: true,
      default: false,
    },
    readalluser: {
      type: Boolean,
      required: true,
      default: true,
    },
    createvisitorrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readvisitorrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updatevisitorrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deletevisitorrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallvisitorrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    createworkingrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readworkingrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    updateworkingrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteworkingrecords: {
      type: Boolean,
      required: true,
      default: false,
    },
    readallworkingrecords: {
      type: Boolean,
      required: true,
      default: true,
    },
    verifyTitleDeed: {
      type: Boolean,
      required: true,
      default: false,
    },
    verify: {
      type: Boolean,
      required: true,
      default: false,
    },
    readAllInstitutions: {
      type: Boolean,
      required: true,
      default: true,
    },
    createInstitution: {
      type: Boolean,
      required: true,
      default: false,
    },
    readInstitution: {
      type: Boolean,
      required: true,
      default: true,
    },
    readMembers: {
      type: Boolean,
      required: true,
      default: true,
    },
    addMember: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleteInstitution: {
      type: Boolean,
      required: true,
      default: false,
    },
    addEmployee: {
      type: Boolean,
      required: true,
      default: false,
    },
    readEmployees: {
      type: Boolean,
      required: true,
      default: true,
    },
    readfarmsbyuser: {
      type: Boolean,
      required: true,
      default: true,
    },
    addemployeetofarmer: {
      type: Boolean,
      required: true,
      default: false,
    },
    getfarmeremployees: {
      type: Boolean,
      required: true,
      default: false,
    },
    reademployees: {
      type: Boolean,
      required: true,
      default: true,
    },
    addemployee: {
      type: Boolean,
      required: true,
      default: false,
    },
    User_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Permissions = mongoose.model("Permissions", permissionsModel);

export default Permissions;
