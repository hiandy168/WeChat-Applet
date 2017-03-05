
import { URLS } from './urls.js';
import { getUserInfo, setUserInfo, getWorkStaDate } from './util.js';

var sessionid = '';

function ajaxData(options){
    let defVal = {
        type:'',
        data:{},
        method:'POST',
        success:function(){},
        fail:function(){}
    }
    Object.assign(defVal, options);
    getUserInfo((userinfo)=>{
        userinfo && Object.assign(defVal.data, userinfo)
        defVal.data.mobileLogin = true;
        defVal.data.jsessionid = sessionid;

        wx.request({
            url: URLS[defVal.type],
            data: defVal.data,
            method: defVal.method,
            success: res =>{
                if(res.success){
                    defVal.success(res.data)
                }else{
                    defVal.fail(res.errMsg || res.msg)
                    wx.showModal({
                        title:'注意',
                        content:res.errMsg || res.msg
                    })
                }
            },
            fail: err => {
                console.log(111, res);
                defVal.fail(err.message)
                    wx.showModal({
                        title:'警告',
                        content:err.message
                    })
            }
        })
    })   
}

const sendCode = function(phone, callback){
    callback = callback || function(){};

    //callback(true);return;

    ajaxData({
        type:'SEND_CODE',
        data:{
            username: phone
        },
        success:callback
    })
}

const getWorkSta = function(id, callback){
    let testList = [];
    for(let i=0; i<20;i++){
        let { year, month } = getWorkStaDate('2017-05-28 21:51:21')
        testList.push({
            id:i,
            unique:'unique_'+i,
            year,
            month,
            text:id+'_'+i+'_界首路,太和路一标段已经招标完工并且验收。'
        })
    }
    setTimeout(()=>{
        callback(testList);        
    },1000)
    return true;
    
    callback = callback || function(){};
    ajaxData({
        type:'WORK_STA_LIST',
        data:{
            id
        },
        success:callback
    })
}
const getEventInfo = function(callback){
    let testInfo = [
        {
          title:'已完成',
          count:10
        },
        {
          title:'推进滞后',
          count:20
        },
        {
          title:'正在推进',
          count:30
        }
    ];
    setTimeout(()=>{
        callback(testInfo);        
    },1000)
    return true;
    
    callback = callback || function(){};
    ajaxData({
        type:'EVENT_INFO',
        success:callback
    })
}
const getEventList = function(searchStr, start, count, callback){
    let testList=[];
    for(let i=0; i<count; i++){
        testList.push({
            id:i,
            unique:'unique_'+start+'_'+i,
            xmmc:start+i+'颍河治理项目',
            hylx:'城镇化工程',
            jsdw:'颍泉区重点局',
            jsdwzrr:'李晓东'
        })
    }
    if(start+count > 30){
        testList.pop()
    }
    setTimeout(()=>{
        callback(testList);        
    },1000)
    return true;
    
    callback = callback || function(){};
    ajaxData({
        type:'EVENT_LIST',
        data:{
            searchStr,
            start,
            count,
        },
        success:callback
    })
}
const loginIn = function(phone, code, callback){    
    setTimeout(()=>{
        callback({
            state:true,
            msg:'登录成功！'
        });        
    },1000)
    return true;

    callback = callback || function(){};
    ajaxData({
        type:'EVENT_LIST',
        data:{
            username: phone,
            password: code,
        },
        success:res=>{
            let userinfo = res.body.user;
            sessionid = res.body.jssionid;
            setUserInfo(userinfo);
            callback(res);
        }
    })
}
const getProjectInfo = function(id, callback){
    callback = callback || function(){};
    
    callback({});return;

    ajaxData({
        type:'PROJECT_INFO',
        data:{
            id
        },
        success:callback
    })
}
const editProjectInfo = function(data, callback){
    callback = callback || function(){};

    callback(true);return;

    ajaxData({
        type:'EVENT_DEL',
        data,
        success:callback
    })
}
const delEvent = function(id, callback){
    callback = callback || function(){};

    callback(true);return;

    ajaxData({
        type:'PROJECT_EDIT',
        data:{
            id
        },
        success:callback
    })
}
const commentProject = function(data, callback){
    callback = callback || function(){};

    callback(true);return;

    ajaxData({
        type:'PROJECT_COMMENT',
        data,
        success:callback
    })
}

//项目分类
const getXMFL = function(callback){
    callback = callback || function(){};

    callback([
        {id:11, value:'test1'},
        {id:12, value:'test2'},
        {id:13, value:'test3'},
        {id:14, value:'test4'},
        {id:15, value:'test5'},
        {id:16, value:'test6'}
    ]);return;

    ajaxData({
        type:'XMFL_LIST',
        data:{
        },
        success:callback
    })
}
//行业类别
const getHYLX = function(callback){
    callback = callback || function(){};

    callback([
        {id:21, value:'test1'},
        {id:22, value:'test2'},
        {id:23, value:'test3'},
        {id:24, value:'test4'},
        {id:25, value:'test5'},
        {id:26, value:'test6'}
    ]);return;

    ajaxData({
        type:'HYLX_LIST',
        data:{
        },
        success:callback
    })
}


module.exports = {
    sendCode,
    getWorkSta,
    getEventInfo,
    getEventList,
    loginIn,
    getProjectInfo,
    editProjectInfo,
    delEvent,
    commentProject,
    getXMFL,
    getHYLX,
}

