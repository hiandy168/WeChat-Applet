let __searchbarData = {
    placeholder:'输入搜索内容',
    searchbarFlag: true,
    searchbarFocus: false,
    searchbarText: '',
    searchbarStr:''
}

let __searchEvent = {
    onSearch(){
        this.setData({
            '__searchbarData__.searchbarFocus':true,
            '__searchbarData__.searchbarFlag':false
        })
    },
    onBlur(event){
        return;
        this.data.__searchbarData__.searchbarText == '' && this.onSearchCancel()
    },    
    onInput(event){
        let value = event.detail.value;
        this.setData({
            '__searchbarData__.searchbarText':value
        })
    },
    onSearchCancel(){
        this.setData({
            '__searchbarData__.searchbarText':'',
            '__searchbarData__.searchbarStr':'',
            '__searchbarData__.searchbarFlag':true,
            '__searchbarData__.searchbarFocus':false,            
        })
    },
    onSearchStart(){
        if(this.data.__searchbarData__.searchbarFlag){
            this.onSearch()
        }else{
            this.searchStartEvent && this.searchStartEvent(this.data.__searchbarData__.searchbarText)
        }
    }
}

const searchBar = function(){
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];

    Object.assign(currPage, __searchEvent);
    currPage.setData({
        '__searchbarData__': __searchbarData
    })
}

export default searchBar;
