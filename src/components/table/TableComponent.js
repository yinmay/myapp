import _ from 'lodash';
import React, { Component } from 'react';
import { Button } from 'antd';
import XLSX from 'xlsx'

class TableComponent extends Component{
    downloadFun = ()=>{
        const filename = "write.xlsx";
        const data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
        const ws_name = "SheetJS";
        const wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, filename);
       
    }

render(){
    return  <Button onClick={() => this.downloadFun()}>导出</Button>
    }
} 

export default TableComponent;
