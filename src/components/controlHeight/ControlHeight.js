import React from 'react';

import Split from 'react-split'
import styles from './ControlHeight.cssmodule.scss'
class ControlHeight extends React.Component{
    
    constructor(props){
        super(props)
        this.number = 3;
        this.minHeght = 30;
        this.height = Math.floor((document.body.clientHeight-37-5*(this.number-1))/3) ;
        const heightObj = {}
        for(let i = 1; i <= this.number; i++){
            const heightName = `heightDiv${i}`;
            heightObj[heightName] = this.height
        }
        this.state={
            heightGroup : {...heightObj}
        }
        this.moveStatus =false;
    }
    componentDidMount =()=>{
        this.rootDom.addEventListener('mousemove',this.moveChangeHeight)
        this.rootDom.addEventListener('mouseup',this.removeUpFun)
        for(let i = 1; i < this.number; i++){
            const domEle = this[`down${i}`]
            domEle.addEventListener('mousedown',this.onChangeHeight)
        }
        window.addEventListener('mouseup',this.removeUpFun)
    }
    onChangeHeight =(e)=>{
        const num = e.path[0].dataset.num;
        this.clickNumber = num
        const clickY = e.clientY;
        this.clickY = clickY;
        this.moveStatus = true;
    }
    moveChangeHeight = (e)=>{
        if( this.moveStatus){
            const minHeght =  this.minHeght
            const prevY = this.clickY;
            const nextY = e.clientY;
            const moveY= nextY-prevY;
            const num = +this.clickNumber
            this.clickY =nextY;
            const prevHeightName = `heightDiv${num}`;
            const nextHeightName = `heightDiv${num+1}`;
            const {heightGroup} =this.state;
            const newHeightGroup ={...heightGroup};
            const prevNewHeight =  heightGroup[prevHeightName] + moveY
            const nextNewHeight =  heightGroup[nextHeightName] - moveY
            if( prevNewHeight > minHeght && nextNewHeight > minHeght ){
            newHeightGroup[prevHeightName] = prevNewHeight;
            newHeightGroup[nextHeightName] = nextNewHeight;
            this.setState({heightGroup:newHeightGroup})
            }
        }
    }
    removeUpFun = ()=>{
        console.log(111);
        this.moveStatus = false;
    }
    
    render(){
        const {heightGroup} = this.state;
        // console.log(heightGroup)
        return (
            <div className={styles.root} ref={el =>{this.rootDom = el}}>
                <div className={styles.box} style={{height:heightGroup.heightDiv1}}  ref={el=>{this.div1 = el}}>1</div>
                <div className={styles.line} ref={el=>{this.down1 = el}} data-num={1}></div>
                <div className={styles.box} style={{height:heightGroup.heightDiv2}} ref={el=>{this.div2 = el}}>2</div>
                <div className={styles.line} ref={el=>{this.down2 = el}} data-num={2}></div>
                <div className={styles.box} style={{height:heightGroup.heightDiv3}} ref={el=>{this.div3 = el}}>3</div>
            </div>
        )
    }

}
// class ControlHeight extends React.Component{
//     onDrag=()=>{
//         console.log()
//     }
//     render(){
//         return (<div className={styles.root}  style={{height:document.body.clientHeight}}>
//              <Split className="split split-horizontal" sizes={[25, 75]} direction='vertical'  cursor='row-resize' gutterSize={8}>
//                 <div  className="split content"></div>
//                 <div  className="split content"></div>
//             </Split>
//         </div>)
//     }
// }
    
export default ControlHeight;