'use strict';
const fs = require('fs');
const XLSX = require('xlsx');
const Constants = require('./Constants');

const EXTENTION_FILE = 'xlsx';
const BIMARY_FILE    = 'binary';
const NO_DATE_FORMAT = 'NO USE';

function createExcelFile(namefile, pages, extension = 'xlsx', author = Constants.APP_AUTHOR_EXCEL()) {
    return new Promise((resolve) => {
        try {
            let excelFile = XLSX.utils.book_new();
            excelFile.Props = author;
            for (const page of pages) {
                const { namePage, data, colswidth } = page;
                excelFile.SheetNames.push(namePage);
                excelFile.Sheets[namePage] = XLSX.utils.aoa_to_sheet(data)
                if (colswidth) {
                    excelFile.Sheets[namePage]['!cols'] = colswidth;
                }
            }
            XLSX.writeFile(excelFile, namefile);
            resolve(true);
        } catch (err) {
            resolve(false);
        }
    });
}

function readExcelFile(nameFile, canChangeHeader = false, tblHeaders = [], formatDate = 'DD/MM/YYYY') {
    return new Promise( (resolve) => {
        const hojas  = [];
        try {
            const stream = fs.createReadStream(nameFile);
            let buffers  = [];

            stream.on("data", (data) => buffers.push(data) )
            stream.on("end", () => {
                let data      = Buffer.concat(buffers);
                let types     = { type: 'buffer', cellDates: true, cellText:false, cellNF:false };
                let excelConf = { raw: false, dateNF: formatDate, range : 1, blankRows : false, defval : null };
                let workbook  = null;
                if (canChangeHeader) {
                    if (formatDate === NO_DATE_FORMAT) {
                        delete types.cellDates;
                        delete excelConf.dateNF;
                    }
                    workbook = XLSX.read(data, types);
                } else {
                    workbook = XLSX.read(data, { type: 'array' });
                }
            
                workbook.SheetNames.forEach( function(sheetName) {
                    let headers, jsonExcel, changeHeaders;
                    if (canChangeHeader) {
                        jsonExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { ...excelConf, header: changeHeaders, });
                        headers   = getHeaders(workbook.Sheets[sheetName]);
                        changeHeaders = changeSheetHeaders(headers,tblHeaders);
                        
                    } else {
                        jsonExcel = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        headers   = getHeaders(workbook.Sheets[sheetName]);
                    }
                    hojas.push({
                        data     : jsonExcel,
                        headers  : headers,
                        namePage : sheetName,
                        nameFile : nameFile
                    });
                });
                resolve(hojas);
            })
            stream.on("error", () => {
                resolve(hojas);
            })
        } catch (error) {
            resolve(hojas);
        }
    })
}

function getHeaders(sheet) {
    let headers = [];
    if (sheet['!ref']) {
        const range = XLSX.utils.decode_range(sheet['!ref']);
        const R = range.s.r;
        for(let C = range.s.c; C <= range.e.c; ++C) {
            let cell = sheet[XLSX.utils.encode_cell({c:C, r:R})]
            let hdr  = "UNKNOWN " + C; 
            if(cell && cell.t) {
                hdr = XLSX.utils.format_cell(cell);
                headers.push(hdr);
            }
        }
    }
    return headers;
}

function changeSheetHeaders(sheetHeader,tableHeader) {
    const hr = {};
    for (const head of tableHeader) { hr[head.label] = head; }
    for (const kh in sheetHeader) {
        if (sheetHeader.hasOwnProperty(kh)) {
            const header = sheetHeader[kh].trim().replace(/\s/gi,' ');
            sheetHeader[kh] = hr[header] ? hr[header].id: '__UNKNOWN_'+header+'__';
        }
    }
    return sheetHeader;
}

module.exports = {
    createExcelFile,
    readExcelFile,
    getHeaders,
    changeSheetHeaders
}