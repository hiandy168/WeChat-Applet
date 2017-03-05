import { FILE_URL } from './urls.js';

const FILES = {
    login_bg: 'login_bg.jpg',
    logo: 'logo.png',
    icon_man:'icon-man.png',
    icon_lock:'icon-lock.png',
    icon_edit:'icon-edit.png',
    icon_del:'icon-del.png',
    icon_arrow:'icon-arrow.png',
    icon_worksta:'icon-worksta.png',
    icon_msg:'icon-msg.png',
    icon_ok:'icon-ok.png',
    icon_close:'icon-close.png',
}

for(let key in FILES){
    FILES[key] = FILE_URL+FILES[key]
}

module.exports = {
    FILES
}

