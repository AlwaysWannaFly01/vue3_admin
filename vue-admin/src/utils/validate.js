/*
过滤特殊字符
*/
const stripScript = (str) => {
    const pattern = new RegExp("[`~!@#$%^&*()=|{}':; ',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    let rs = '';
    for (let i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '')
    }
    return rs
}

/*
邮箱验证
*/
const validateEmail = (str) => {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(str) ? false : true
}

/* 
密码格式验证
*/
const validatePass = (str) => {
    const reg = /[0-9a-zA-Z]{6,20}/;
    return !reg.test(str) ? false : true
}

/* 
验证码验证
*/
const validateCode = (str) => {
    const reg = /^[a-z0-9]{6}$/;
    return !reg.test(str) ? false : true
}
export { stripScript, validateEmail, validatePass,validateCode };
