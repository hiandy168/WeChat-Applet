
const HOST = 'https://www.zhizinet.com/';
const FILE_URL = '../../images/';

const URLS = {
    //发送验证码
    "SEND_CODE":'jeeplus/a/sendMsgCode',
    "WORK_STA_LIST":'getWorkSta',
    //首页展示数据
    "EVENT_INFO":'jeeplus/a/sys/user/shouyejson',
    //项目列表
    "EVENT_LIST":'jeeplus/a/bussprogram/bussprogram/zdgzjson',
    //登陆
    "LOGIN_IN":'jeeplus/a/login',
    "PROJECT_INFO":"PROJECT_INFO",
    //新增编辑项目
    "PROJECT_EDIT":"jeeplus/a/bussprogram/bussprogram/savejson",
    //删除项目
    "PROJECT_EDIT":"jeeplus/a/bussprogram/bussprogram/deletejson",
    //项目点评
    "PROJECT_COMMENT":"jeeplus/a/bussnotes/bussnotes/savejson",
}
for(let key in URLS){
    URLS[key] = HOST+URLS[key]
}

module.exports = {
    HOST,
    FILE_URL,
    URLS
}
