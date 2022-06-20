// dependancies and shortcuts ------------------------------------- //
const fs = require('fs');
const XLSX = require("xlsx");
const jsontoxml = require("jsontoxml");

// converting table ----------------------------------------------- //
const workbook = XLSX.readFile("Chr1.xlsx");

let worksheets = {};
for (const sheetName of workbook.SheetNames) {
  worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

fs.writeFile('converteddata.txt', JSON.stringify(worksheets.Chr1), function(err){
  console.log("done!")
});
// !!!!!!!!!! FOR REF: fs.writeFile('FUTUREFILENAME.TXT', JSON.stringify(worksheets.PAGEYOUWANT), function(err)...)