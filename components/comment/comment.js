
import { FILES } from '../../utils/files.js'

let __commentData = {
    icon_worksta: FILES.icon_worksta,
    icon_msg: FILES.icon_msg,
    icon_ok: FILES.icon_ok,
    icon_close: FILES.icon_close,
    show:false,
    animationData:'',
    aniHeight:0,
    defval:'',
    value:''
}

let __commentEvent = {    
    __commentEvent_onTapOk(){
        this.data.__commentData__.value ? 
        this.onCommentSubmit && this.onCommentSubmit(this.data.__commentData__.value, (flag)=>{
            if(flag){
                this.setData({
                    '__commentData__.defval': '',
                    '__commentData__.value': '',
                })
                this.__commentEvent_editHide();
            }
        }) : wx.showModal({
            title:'注意',
            content:'请输入点评内容',
            success:res=>{
                if(res.confirm){}
            }
        })
    },
    __commentEvent_onTapClose(){
        this.__commentEvent_editHide();
    },
    __commentEvent_onInputComment(event){
        let value = event.detail.value;
        this.setData({
            '__commentData__.value': value
        })
    },
    __commentEvent_onTapWorksta(event){
        this.onWorksta && this.onWorksta();
    },
    __commentEvent_onTapShow(){
        if(this.data.__commentData__.show){
            this.__commentEvent_editHide();
            return true;
        }
        if(!this.data.__commentData__.aniHeight){
            wx.getSystemInfo({
              success: (res) => {
                  let width = res.windowWidth;
                  this.setData({
                      '__commentData__.aniHeight':width/750*500
                  })
                  this.__commentEvent_editShow();
              }
            })
        }else{
            this.__commentEvent_editShow();
        }
    },
    __commentEvent_editShow(){
        let animation = wx.createAnimation({duration:300});
        animation.translateY(0).step()
        this.setData({
            '__commentData__.show':true,
            '__commentData__.animationData':animation.export()
        })
    },
    __commentEvent_editHide(){
        let top = this.data.__commentData__.aniHeight;
        let animation = wx.createAnimation({duration:300});
        animation.translateY(top).step()
        this.setData({
            '__commentData__.show':false,
            '__commentData__.animationData':animation.export()
        })
    }
}

const commentComponent = function(){     
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    
    Object.assign(currPage, __commentEvent);
    currPage.setData({
        '__commentData__': __commentData
    })
}
export default commentComponent;
