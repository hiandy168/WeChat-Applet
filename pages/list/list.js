import { FILES } from '../../utils/files.js'
import { getEventList, delEvent } from '../../utils/api.js'
import searchBar from '../../components/searchbar/searchbar.js'

let config = {
  data: {    
    scroll_height:600,  
    icon_edit: FILES.icon_edit,
    icon_del: FILES.icon_del,
    list:[],
    moreFlag:true,
    searchStr:'',
    start:0,
    count:10
  },
  onLoad(){
    searchBar();
    wx.getSystemInfo({
      success: (res) => {
        let height = res.windowHeight;
        this.setData({
            scroll_height:height-50
        })
      }
    })
    this.searchStartEvent('')
  },

  searchStartEvent(str){
    this.setData({
      searchStr:str,
      moreFlag:true,
      start:0,
      list:[],
    })
    this.getSearchList(str, this.data.start, this.data.count)
  },
  loadMore(){
    let str = this.data.searchStr;
    this.getSearchList(str, this.data.start, this.data.count)
  },
  goDetial(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/project/project?id='+id
    })
  },
  goEdit(event){
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/projectEdit/projectEdit?id='+id
    })
  },
  goDel(event){
    let id = event.currentTarget.dataset.id;
    let xmmc = event.currentTarget.dataset.xmmc;
    wx.showModal({
      title:'注意！',
      content:'确定删除 '+xmmc+' 吗？',
      success:res=>{
        res.confirm && delEvent(id, res=>{
          this.delEvent(id)
        })
      }
    })
  },
  delEvent(id){
    let list = this.data.list;
    for(let key in list){
      if(list[key].id == id ){
        list.splice(key, 1)
        break;
      }
    }
    this.setData({
      list:list
    })    
    wx.showToast({
      icon:'success',
      title:'删除成功'
    })
  },

  getSearchList(str, start, count){
    if(!this.data.moreFlag){
      return false;
    }
    wx.showToast({
      icon:'loading',
      title:'正在加载'
    })
    getEventList(str, start, count, (list)=>{
      wx.hideToast();
      this.setData({
        list:[...this.data.list, ...list],
        start:start+list.length
      })
      if(list.length < count){
        this.setData({
          moreFlag:false
        })
      }
    })
  }
}

Page(config);
