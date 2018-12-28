import React from 'react'
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;



class CkeckItem extends React.Component {

  state = {

    checkAll: false,
  };
  getOptions = ()=>{
    const {gongsiId,renyuan} =this.props;
    console.log(gongsiId,renyuan)
    const renyuanFilter = renyuan.filter(p=>p.participantCompanyId === +gongsiId )
    debugger
    console.log(renyuanFilter)
    const options = renyuanFilter.map(p=>({label:p.userName,value:p.userId}));
    return options;
  }
  render() {
    const options = this.getOptions();
    const {checkList} =this.props;
    console.log(options)
    const checkValue = [...checkList]
    return (
      <div>
        <div style={{ borderBottom: '1px solid #E9E9E9' }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup options={options} value={checkValue} onChange={this.onChange} />
      </div>
    );
  }

  onChange = (checkedList) => {
   
  }

  onCheckAllChange = (e) => {
 
  }
}

export default CkeckItem;