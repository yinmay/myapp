import React from 'react';
import CheckAll from './components/CheckAll'

class Index extends React.Component{

    constructor(props){
        super(props)
        this.renyuan=[
            {"memberId":651736694689793,"projectId":314044072665088,"userId":289385137451008,"mobile":"13511111112","userName":"","avatar":"http://decobim-public.oss-cn-hangzhou.aliyuncs.com/avatar/5.jpg","email":"example@xxx.com","roleId":120,"roleName":"质量员","scope":"","remark":"","department":"","duty":"","participantCompanyId":642746270838784,"participantCompanyName":"bb","companyFunctionId":10,"companyFunctionName":"其他"},
            {"memberId":642746270838786,"projectId":314044072665088,"userId":2,"mobile":"13511111111","userName":"后端测试账号98465416546546","avatar":"http://hzbuilding-public.oss-cn-hangzhou.aliyuncs.com//civil/dev/0/20180625/64c8e08d-4d5d-4ed0-9062-44793c185f53/page-1-%E5%8F%82%E5%BB%BA%E5%8D%95%E4%BD%8D.png","email":"135111@a.com","roleId":110,"roleName":"项目经理","scope":"","remark":"","department":"","duty":"","participantCompanyId":642746270838784,"participantCompanyName":"bb","companyFunctionId":10,"companyFunctionName":"其他"},
            {"memberId":651722350170112,"projectId":314044072665088,"userId":604089264807936,"mobile":"18721460438","userName":"ym","avatar":"http://hzbuilding-public.oss-cn-hangzhou.aliyuncs.com//civil/dev/0/20180702/5d3dc8a7-4e6e-47f9-b5c6-155e6e811188/page-1-%E9%A1%B9%E7%9B%AE%E5%9F%BA%E6%9C%AC%E4%BF%A1%E6%81%AF.png","email":"","roleId":130,"roleName":"安全员","scope":"","remark":"","department":"","duty":"","participantCompanyId":651508423872512,"participantCompanyName":"123123","companyFunctionId":8,"companyFunctionName":"监理"},
            {"memberId":651508423872514,"projectId":314044072665088,"userId":631446563323904,"mobile":"12345678910","userName":"12345678910","avatar":"","email":"","roleId":110,"roleName":"项目经理","scope":"","remark":"","department":"","duty":"","participantCompanyId":651508423872512,"participantCompanyName":"123123","companyFunctionId":8,"companyFunctionName":"监理"},
            {"memberId":602646172573697,"projectId":314044072665088,"userId":599622397755392,"mobile":"13338968297","userName":"13338968297","avatar":"","email":"","roleId":110,"roleName":"项目经理","scope":"","remark":"","department":"","duty":"","participantCompanyId":602646172573696,"participantCompanyName":"H1-i标段（客房及走道）","companyFunctionId":7,"companyFunctionName":"业主"},
            {"memberId":649982368223233,"projectId":314044072665088,"userId":623995096834048,"mobile":"18391609283","userName":"wx","avatar":"http://hzbuilding-public.oss-cn-hangzhou.aliyuncs.com//civil/dev/0/20180725/bac43d73-e7ec-44d8-8378-840248b91e0b/timg.jpg","email":"","roleId":160,"roleName":"预决算员","scope":"","remark":"","department":"","duty":"","participantCompanyId":602646172573696,"participantCompanyName":"H1-i标段（客房及走道）","companyFunctionId":7,"companyFunctionName":"业主"},
            {"memberId":692190589968384,"projectId":314044072665088,"userId":295361467076608,"mobile":"18616293787","userName":"薛如水","avatar":"http://hzbuilding-public.oss-cn-hangzhou.aliyuncs.com//civil/dev/0/20180712/ac7f1746-f7fd-4e5f-bfd8-3d860efdcaf9/%E5%A4%B4%E5%83%8F.jpg","email":"","roleId":120,"roleName":"质量员","scope":"","remark":"","department":"","duty":"","participantCompanyId":602646172573696,"participantCompanyName":"H1-i标段（客房及走道）","companyFunctionId":7,"companyFunctionName":"业主"}
        ];
        this.gongsi =[
            {"participantCompanyId":651508423872512,"projectId":314044072665088,"companyFunctionName":"监理","name":"123123","remark":"","companyFunctionId":8},
            {"participantCompanyId":642746270838784,"projectId":314044072665088,"companyFunctionName":"其他","name":"bb","remark":"","companyFunctionId":10},
            {"participantCompanyId":602646172573696,"projectId":314044072665088,"companyFunctionName":"业主","name":"H1-i标段（客房及走道）","remark":"","companyFunctionId":7}
        ]

    }

    state={
        cdsa:11
    };
    componentWillMount = ()=>{
        console.log(this.refEle)
    }
    
    render(){
        console.log(this.refEle)
        return (
            <div>
               <CheckAll  renyuan={this.renyuan} gongsi={this.gongsi} ref={el=>{this.refEle =el}} />
            </div>
        )
    }

}
export default Index;