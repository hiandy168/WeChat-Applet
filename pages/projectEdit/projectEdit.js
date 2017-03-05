
import { getProjectInfo, editProjectInfo, getXMFL, getHYLX } from '../../utils/api.js'

let config = {
    data: {
        id:'',
        inputItems: {            
            title1: {                
                type: 'title',
                value:'项目基本信息'
            },
            xmmc: {                
                type: 'input',
                title: '项目名称',
                placeholder: '请输入名称',
                defVal:'',
                value:'',
            },
            zdxmfl: {                
                type: 'select',
                title: '项目分类',
                placeholder: '',
                defVal:0,
                value:0,
                range:[]
            },
            hylx: {                
                type: 'select',
                title: '行业类别',
                placeholder: '',
                defVal:0,
                value:0,
                range:[]
            },         
            title2: {                
                type: 'title',
                value: '建设信息',
            },
            jsdw: {                
                type: 'input',
                title: '建设单位',
                placeholder: '请输入建设单位',
                defVal:'',
                value:'',
            }, 
            jsdd: {                
                type: 'input',
                title: '建设地点',
                placeholder: '请输入建设地点',
                defVal:'',
                value:'',
            }, 
            jsgmjnr: {                
                type: 'text',
                title: '建设规模及内容',
                placeholder: '请输入建设规模及内容',
                defVal:'',
                value:'',
            },
            jsdwzrr: {                
                type: 'input',
                title: '负责人',
                placeholder: '请输入建设单位负责人',
                defVal:'',
                value:'',
            },            
            bar1: {                
                type: 'bar'
            },
            ztz: {                
                type: 'input',
                title: '总投资',
                placeholder: '请输入金额（万元）',
                defVal:'',
                value:'',
            },             
            title3: {                
                type: 'title',
                value:'其他信息'
            },
            szlxdw: {                
                type: 'input',
                title: '联系单位',
                placeholder: '请输入省直联系单位',
                defVal:'',
                value:'',
            }, 
            qtxttjzrdw: {                
                type: 'input',
                title: '责任单位',
                placeholder: '请输入牵头协调推进责任单位',
                defVal:'',
                value:'',
            }, 
            qtxttjzrdwzrr: {                
                type: 'input',
                title: '负责人',
                placeholder: '请输入牵头协调推进责任单位负责人',
                defVal:'',
                value:'',
            },         
            bar3: {                
                type: 'bar'
            },
        },
    },
    onLoad(options){
        let id = options.id;
        id && this.setData({
            id: id
        })
        let loadFlag = false;
        getXMFL(res=>{
            let range = [];
            for(let i=0; i<res.length; i++){
                range.push(res[i].value)
            }
            this.setData({
                'inputItems.zdxmfl.range':range,
                'inputItems.zdxmfl.data':res,
            })
            loadFlag ? this.initDefVal() : loadFlag=true;
        })
        getHYLX(res=>{
            let range = [];
            for(let i=0; i<res.length; i++){
                range.push(res[i].value)
            }
            this.setData({
                'inputItems.hylx.range':range,
                'inputItems.hylx.data':res,
            })
            loadFlag ? this.initDefVal() : loadFlag=true;        
        })
        
    },
    initDefVal(){
        getProjectInfo(this.data.id, res=>{
            let items = this.data.inputItems;
            for(let key in items){
                res[key] && (
                    items[key].value = res[key],
                    items[key].defVal = this.getDefVal(items[key], res[key])
                )
            }            
            this.setData({
                inputItems:items
            })
        })
    },
    getDefVal(item, data){
        if(item.type == 'select'){
            for(let i=0; i<item.data.length; i++){
                if(item.data[key].id == item.value){
                    return i
                }
            }
        }else{
            return data
        }
    },
    onValueChange(event){
        let value = event.detail.value;
        let key = event.currentTarget.dataset.key;
        if(key && this.data.inputItems[key] ){
            let items = this.data.inputItems;
            items[key].value = items[key].data[value].id;
            items[key].defVal = value;
            this.setData({
                inputItems : items
            });
        }
    },
    checkValues(){
        return true;
    },
    formatValue(){
        let data = {};
        let items = this.data.inputItems;
        for(let key in items){
            items[key].type !== 'title' && items[key].type !== 'bar' && (data[key] = items[key].value)
        }
        this.data.id && (data.id = this.data.id);
        return data;
    },
    onSubmit(){
        this.checkValues() && editProjectInfo(this.formatValue(), res=>{
            console.log('success');
            wx.navigateBack({
              delta: 1
            })
        })
    }
}

Page(config)
