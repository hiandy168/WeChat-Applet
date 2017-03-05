function isPhone(phone){
  phone = phone.trim();
  return /^1([358]\d|4[57]|7[^249])\d{8}$/.test(phone)
}

function isCode(code){
  return /^\d{6}$/.test(code)
}

function getUserInfo(callback){
  callback = callback || function(){}
  wx.getStorage({
    key: 'userinfo',
    success: res => {
      callback(res)
    },
    fail: err => {
      callback(null)
    }
  })
}

function setUserInfo(info){
  wx.setStorage({
    key: 'userinfo',
    data: info,
  })
}

function getWorkStaDate(str){
  let year = str.slice(0, 4);
  let month = str.slice(5, 10);
  return {year, month}
}





function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(num, len) {
  len = len || 2;
  num = num+'';
  return num.length < len ? '0'.repeat(len-num.length)+num : num;
}

module.exports = {
  isPhone,
  isCode,
  getUserInfo,
  setUserInfo,
  getWorkStaDate,

  formatTime,

}
