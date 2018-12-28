import React from 'react';
import _ from 'lodash';
import { Select, Checkbox } from 'antd';
import CheckItem from './CkeckItem';

const Option  = Select.Option
class CheckAll extends React.Component{
   state ={
        gongsiSelected:{
          
        }
   }
   handleChange =(value,option)=>{
       console.log(value)
       const {renyuan} = this.props;
       const {gongsiSelected} =this.state;
    
       const obj ={};
       value.forEach(element => {
           const user =_.get(gongsiSelected,element)
           console.log(user)
            if(_.isUndefined(user)){
                obj[element]= []
            }else{
                console.log(111)
                obj[element] =[...user]
            }
       });
       console.log(obj)
       this.setState({gongsiSelected:obj})
   }

    render(){
        const {renyuan,gongsi} = this.props;
        console.log(gongsi,renyuan)
        const  {gongsiSelected} =this.state;
        const gonsiArr =_.keys(gongsiSelected)
        return (
            <div>
               <div style={{width:'80%'}}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        // value={selectedList}
                        onChange={this.handleChange}
                        >
                    {
                      gongsi.map(p=> <Option key={p.participantCompanyId}>{p.name}</Option>)  
                    }
                   </Select>
               </div>
               <div style={{width:'80%'}}>
                   {
                       gonsiArr.map(p=><CheckItem key={p} gongsiId={p} renyuan={renyuan} checkList={_.get(gongsiSelected,p)|| []} />)
                   }
               </div>
            </div>
        )
    }

}
export default CheckAll;