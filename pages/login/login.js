import { FILES } from '../../utils/files.js'
import { isPhone,isCode } from '../../utils/util.js'
import { sendCode,loginIn } from '../../utils/api.js'

function countDown(count, callback){
    callback(count);
    if(count > 0){
        setTimeout(()=>{countDown(count-1, callback)}, 1000);
    }
}

let app = getApp();
let wetoast = null;


let config = {
    data:{
        login_bg: FILES.login_bg,
        logo: FILES.logo,
        inputData_phone:{
            type:'phone',
            placeholder:'请输入手机号',
            defval:'',
            value:'',
            icon: FILES.icon_man,
            btnFlag:false,
            btnText:''
        },
        inputData_code:{
            type:'code',
            placeholder:'请输入验证码',
            defval:'',
            value:'',
            icon: FILES.icon_lock,
            btnFlag:true,
            btnText:'发送验证码'
        }
    },
    onLoad(){
        wetoast = new app.WeToast()
    },
    inputEvent(event){
        let type = event.currentTarget.dataset.type,
            value = event.detail.value;
        if(type == 'phone'){
            this.setData({
                'inputData_phone.value':value
            })
        }else if(type == 'code'){
            this.setData({
                'inputData_code.value':value
            })
        }
    },
    btnEvent(){
        if(this.data.inputData_code.btnFlag){
            if(isPhone(this.data.inputData_phone.value)){
                sendCode(this.data.inputData_phone.value, (res)=>{

                    wx.showToast({
                        icon:'success',
                        title:'验证码已发送'
                    })
                    this.setData({
                        'inputData_code.btnFlag': false,
                        'inputData_code.btnText': '验证码已发送',
                    })
                    countDown(60, (count)=>{
                        if(count > 0){
                            this.setData({
                                'inputData_code.btnText': count+'秒后可重新发送',
                            })
                        }else{
                            this.setData({
                                'inputData_code.btnFlag': true,
                                'inputData_code.btnText': '发送验证码',
                            })
                        }
                    })
                })
            }else{
                wetoast.toast({
                    title: '请输入正确的手机号'
                })
            }
        }
    },
    onLogin(){
        let phone = this.data.inputData_phone.value,
            code = this.data.inputData_code.value;
        if(!isPhone(phone)){
            wetoast.toast({
                title: '请输入正确的手机号'
            })
            return false;
        }
        if(!isCode(code)){
            wetoast.toast({
                title: '请输入正确的验证码'
            })
            return false;
        }
        wx.showToast({
            icon:'loading',
            title:'正在登录',
            duration:10000,
            mask:true
        })
        loginIn(phone, code, (res)=>{
            wx.hideToast();
            wx.showToast({
                icon:'success',
                title:'登录成功',
                mask:true
            })
            setTimeout(()=>{
                wx.redirectTo({
                    url: '/pages/index/index'
                })
            }, 500)
        })
    }
}

Page(config)
