const XLSX = require("xlsx")

const excelToJson = ()=>{
    const workbook = XLSX.readFile("BootcampMS_users.xlsx");

    let worksheets = {};

    for(const sheetName of workbook.SheetNames){
        worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
    }
    return worksheets[workbook.SheetNames[0]];
}

module.exports = excelToJson