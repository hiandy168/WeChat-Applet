//index.js
import chartPie from '../../components/chartPie/chartPie.js'
import { getEventInfo } from '../../utils/api.js'

let config = {
  data: {
    canvasId:'chart_pie'
  },

  onLoad(){
    let chartP = chartPie({
      canvasId: this.data.canvasId,
      width: 630, 
      height: 300
    })

    getEventInfo((info)=>{      
      chartP.setData(info)
    })
  },
}

Page(config)
