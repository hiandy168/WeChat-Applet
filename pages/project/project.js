
import commentComponent from '../../components/comment/comment.js'
import { getProjectInfo, commentProject } from '../../utils/api.js'

let config = {
    data: {
        id:'',
        listItems:{         
            title1: {                
                title: 'title',
                value:'项目基本信息'
            },
            name: {               
                title: '项目名称',
                value:'颍河治理项目',
            },
            zdxmfl: {                            
                title: '项目分类',
                value:'城镇化工程',
            },
            hylx: {              
                title: '行业类型',
                value:'城市基础建设',
            },                 
            title2: {                
                title: 'title',
                value:'建设信息'
            },
            jsdw: {             
                title: '建设单位',
                value:'建设单位11',
            },
            jsdd: {              
                title: '建设地点',
                value:'建设地点11',
            },    
            jsdwzrr: {            
                title: '建设单位负责人',
                value:'王干昌',
            },         
            bar1: {                
                title: 'bar'
            }, 
            ztz: {            
                title: '总投资',
                value:'5000万元人民币',
            },       
            title3: {                
                title: 'title',
                value:'其他信息'
            },
            szlxdw: {        
                title: '省直联系单位',
                value:'某单位',
            }, 
            qtxttjzrdw: {         
                title: '牵头协调单位',
                value:'某单位',
            }, 
            qtxttjzrdwzrr: {       
                title: '牵头协调单位负责人',
                value:'张三',
            }, 
            xmgzr: {       
                title: '项目跟踪人',
                value:'张三',
            },   
            ztz: {       
                title: '项目状态',
                value:'张三',
            },         
            bar2: {                
                title: 'bar'
            },       
            bar3: {                
                title: 'bar'
            },
        }
    },
    onLoad(options){
        let id = options.id;
        id && this.setData({
            id,
        })
        commentComponent();
        getProjectInfo(id, res => {
            let items = this.data.listItems;
            for(let key in items){
                res[key] && (
                    items[key].value = res[key]
                )
            }
            this.setData({
                listItems:items
            })
        })
    },    
    onCommentSubmit(value, callback){
        commentProject({
            id:this.data.id,
            value,
        }, res=>{ 
            wx.showToast({
                icon:'success',
                title:'点评成功'
            })            
            callback && callback(true);
        })   
    },
    onWorksta(){
        wx.navigateTo({
        url: '/pages/workSta/workSta?id='+this.data.id
        })
    },
}

Page(config)
