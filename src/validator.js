const city = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外 '
};

function identityCodeValid (code) {
    let pass = true;
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        // 简单正则
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        // 地址编码错误
        pass = false;
    } else if (!birthDayValidate(code)) {
        pass = false;
    } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');

            // ∑(ai×Wi)(mod 11)
            // 加权因子
            const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

            // 校验位
            const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            let sum = 0;
            let ai = 0;
            let wi = 0;
            for (let i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17]) {
                // 校验位错误
                pass = false;
            }
        }
    }
    return pass;
}

function birthDayValidate (idCard18) {
    const year = idCard18.substring(6, 10);
    const month = idCard18.substring(10, 12);
    const day = idCard18.substring(12, 14);
    const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (tempDate.getFullYear() != parseFloat(year) || tempDate.getMonth() != parseFloat(month) - 1 || tempDate.getDate() != parseFloat(day)) {
        return false;
    }
    return true;
}

export default {
    idCardValidator: (rule, value, callback) => {
        if (value == '') {
            callback(new Error('请输入身份证号'));
        } else if (identityCodeValid(value)) {
            callback();
        } else {
            callback(new Error('请输入合法的身份证号'));
        }
    },
    bankCardValidator: (rule, value, callback) => {
        if (value == '') {
            callback(new Error('请输入银行卡号'));
        } else if (/^\d{16}|\d{19}$/.test(value)) {
            callback();
        } else {
            callback(new Error('请输入合法的银行卡号'));
        }
    },
    mobileValidator: (rule, value, callback) => {
        if (value == '') {
            callback(new Error('请输入手机号码'));
        } else if (/^1[34578]\d{9}$/.test(value)) {
            callback();
        } else {
            callback(new Error('请输入正确的手机号码'));
        }
    }
};
