// pages/workSta/workSta.js
import { FILES } from '../../utils/files.js'
import { getWorkSta } from '../../utils/api.js'



let config = {
  data:{
    id:'',
    icon_arrow:FILES.icon_arrow,
    list:[]
  },
  onLoad(options){
    let id = options.id;
    this.setData({
      id:id
    })
    this.refresh()
  },
  onPullDownRefresh(){
    this.refresh()
  },
  refresh(){
    wx.showToast({
      icon:'loading',
      title:'正在加载'
    })
    getWorkSta(this.data.id, (list)=>{
      this.setData({
        list: list
      })
      wx.hideToast();
      wx.stopPullDownRefresh();
    })
  }
}

Page(config)