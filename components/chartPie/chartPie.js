
class chartP{
    constructor(option){  
        let __chartPieData__ = {
            width:720, 
            height:660,
            colors:[
                ['#ffa86c', '#fe812f'],
                ['#96b0ff', '#7092ff'],
                ['#7fcdff', '#32b0ff']
            ],
            data:[]
        }
        Object.assign(__chartPieData__, option)
        if(!option.canvasId){
            return false;
        }
        this.__chartPieData__ = __chartPieData__;
        this._init();
    }
    setData(data){
        this.__chartPieData__.data = data;
        this._setData()
    }
    _init(){
        wx.getSystemInfo({
            success: (res) => {
                let p = this.__chartPieData__.height/this.__chartPieData__.width;
                this.__chartPieData__.width *= res.windowWidth/750;
                this.__chartPieData__.height = p*this.__chartPieData__.width;
                this.raduis = this.__chartPieData__.height/2;
                this.centerPot = {x:this.raduis+this.__chartPieData__.height*.05, y:this.raduis};
                this._initCtx();
            }
        })
    }
    _initCtx(){        
        let cp = this._getPage();
        cp.setData({
            '__chartPieData__':this.__chartPieData__
        })
        const ctx = wx.createCanvasContext(this.__chartPieData__.canvasId);
        this.ctx = ctx;
        ctx.setFillStyle('#000000');
        ctx.setFontSize(18);
        ctx.fillText('数据加载中...', this.__chartPieData__.width/2-60, this.__chartPieData__.height/2)
        ctx.fill();
        ctx.draw();
    }
    _setData(){
        this.__chartPieData__.data = this._initData(this.__chartPieData__.data);
        this._drawChart(this.__chartPieData__.data);
        this._drawTitles(this.__chartPieData__.data);
    }
    _getPage(){
        let pages = getCurrentPages();
        let currPage = pages[pages.length - 1];
        return currPage;
    }
    _initData(data){
        data.sort((p, n) => {
            return p.count > n.count
        })
        let sum = 0;
        data.map((elem) => {
            sum += elem.count
        })
        this.sum = sum;
        data.map((elem) => {
          elem.percent = sum == 0 ? 0 : elem.count/sum  
          elem.angle = Math.PI*2*elem.percent;
        })
        return data;
    }
    _drawChart(data){
        let ctx = this.ctx;
        let sA = 0, eA = 0,
            i=0;
        for(i=0; i<data.length; i++){
            eA += data[i].angle;
            i==data.length-1 ? eA = Math.PI*2 : true;
            this._drawPie(sA, eA, this.__chartPieData__.colors[i]);
            sA += data[i].angle;
        }
        ctx.beginPath();
        ctx.setFillStyle('#ffffff');
        ctx.arc(this.centerPot.x, this.centerPot.y, this.raduis*2/3, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();

        this._drawSum();
        ctx.draw();
    }
    _drawPie(sA, eA, colors){
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(this.centerPot.x, this.centerPot.y);
        let g_x_s = Math.sin(sA)*this.raduis;
        let g_y_s = -Math.cos(sA)*this.raduis;
        let g_x_e = Math.sin(eA)*this.raduis;
        let g_y_e = -Math.cos(eA)*this.raduis;
        let grd = ctx.createLinearGradient(g_x_s, g_y_s, g_x_e, g_y_e)
        grd.addColorStop(0, colors[0])
        grd.addColorStop(1, colors[1])
        ctx.setFillStyle(grd);
        ctx.rotate(-90*Math.PI/180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, this.raduis, sA, eA);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    _drawTitles(data){
        let ctx = this.ctx,
            h = this.__chartPieData__.height/3,
            i=0;
            h<32 ? h=32 : true;
        for(i=0; i<data.length; i++){
            let x = this.__chartPieData__.width/2+30,
                y = h*i+h/2-16,
                color = this.__chartPieData__.colors[i][1];
            this._drawItem(x, y, (data[i].percent*100).toFixed(1), color);
            this._drawTitle(x, y, data[i].title);
        }
        ctx.draw(true);
    }
    _drawItem(x, y, title, color){
        let ctx = this.ctx;
        ctx.setFillStyle(color);
        ctx.fillRect(x, y, 10, 32);
        ctx.setFontSize(14);
        ctx.fillText(title+'%', x+20, y+30);
    }
    _drawTitle(x, y, title){
        let ctx = this.ctx;
        ctx.setFillStyle('#888888');
        ctx.setFontSize(16);
        ctx.fillText(title, x+20, y+15);
    }
    _drawSum(){
        let ctx = this.ctx;
        let l=(this.sum+'').length*8;
        ctx.beginPath();
        ctx.setFillStyle('#353535');
        ctx.setFontSize(16);
        ctx.fillText('项目总数', this.centerPot.x-32, this.centerPot.y);
        ctx.fillText(this.sum, this.centerPot.x-l/2, this.centerPot.y+20);
        ctx.closePath();
        ctx.fill();
    }
}

const chartPie = function(option){
    let cp = new chartP(option)
    return cp;
}

export default chartPie;

