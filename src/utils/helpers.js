import designConfig from '../../design.config';
import CryptoJS from "crypto-js"


export function px2rem(variable, unit = 'rem') {
    return designConfig.pxToRem(variable, unit)
}

export function twRem2Rem(variable, unit = 'rem') {
    return designConfig.twRemToRem(variable, unit)
}

export function canSetParams(method = 'get') {
    return ['get', 'delete', 'head'].includes(method.toLowerCase())
}



export function randomWord(randomFlag = true, min = 32, max = 32) {
    let str = "",
        range = min,
        arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    //随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

export function aesEncrypt(key, data) {
    const k = CryptoJS.enc.Utf8.parse(key);//16位
    const iv = CryptoJS.enc.Utf8.parse(key);
    const srcs = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(srcs, k, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function aesDecrypt(key, data) {
    const k = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Utf8.parse(key);
    const encryptedHexStr = CryptoJS.enc.Base64.parse(data);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(srcs, k, {
        iv,
        mode: CryptoJS.mode.CBC
    });
    return decrypt.toString(CryptoJS.enc.Utf8).toString();
}

export function isPhone(value) {
    return /^1\d{10}$/.test(value);
}

// 判断是否为null
export function isNull(value) {
    return toString.call(value) === '[object Null]' || value === 'null';
}

export function isNotEmpty(value) {
    return !isEmpty(value)
}

// 判断数据是否为空
export function isEmpty(value) {
    if (isUndefined(value) || isNull(value)) {
        return true;
    }
    if (isString(value) && value.trim(value).length === 0) {
        return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    }
    if (isObject(value) && Object.values(value).length === 0 && !(value instanceof Date)) {
        return true;
    }
    if (isObject(value) && value instanceof Date && !value) {
        return true;
    }
    return false;
}

// 对象的深拷贝
export function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
        // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]));
            }
            // 判断如果当前的值是null的话；直接赋值为null
        } else if (target === null) {
            result = null;
            // 判断如果当前的值是一个RegExp对象的话，直接赋值
        } else if (target.constructor === RegExp) {
            result = target;
        } else {
            // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
        // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
    // 返回最终结果
    return result;
}

// 是否为一个对象 例如：{...} 返回true  其它均为false
export function isObject(value) {
    return toString.call(value) === '[object Object]';
}

// 是否是数组
export function isArray(value) {
    return toString.call(value) === '[object Array]';
}

// 是否为字符串
export function isString(value) {
    return typeof value === 'string';
}

// 是否是undefined
export function isUndefined(value) {
    return typeof value === 'undefined' || value === 'undefined';
}

export function isFalse(value) {
    return !isTrue(value)
}

// 是否为true  0、'0'、false、'false'、为false
export function isTrue(value) {
    if (isBoolean(value)) {
        return value;
    } else if (isNull(value)) {
        return false;
    } else if (isNumeric(value)) {
        return value != 0;
    } else if (isString(value)) {
        return value === 'true';
    }

    return false;
}

// 是否是布尔值
export function isBoolean(value) {
    return typeof value === 'boolean';
}

// 是否是一个函数
export function isFunction(value) {
    return typeof value === 'function';
}

// 是否是number  '123' 是字符串  使用该方法返回false
export function isNumber(value) {
    return !isNaN(value) && typeof value === 'number';
}

// 是否是number 或者 字符串形式的number  123、'123'均返回true
export function isNumeric(value) {
    return isNumber(Number(value));
}

// 是否是一个整数
export function isInteger(value, isStrict = true) {
    if (isStrict) {
        return Number.isInteger(value);
    }
    return Number.isInteger(Number(value));
}

/**
 * 高精度加法
 * @param arg1 {number | string}
 * @param arg2 {number | string}
 * @returns {number}
 */
export function bcAdd(arg1, arg2) {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

/**
 * 高精度乘法
 * @param arg1 {number | string}
 * @param arg2 {number | string}
 * @returns {number}
 */
export function bcMul(arg1, arg2) {
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) {
    }
    try {
        m += s2.split('.')[1].length;
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

/**
 * 高精度除法
 * @param arg1 {number | string}
 * @param arg2 {number | string}
 * @returns {number}
 */
export function bcDiv(arg1, arg2) {
    let t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {
    }
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 * 浮点数高精度减法运算
 * @param arg1 {number | string}
 * @param arg2 {number | string}
 * @returns {string}
 */
export function bcSub(arg1, arg2) {
    let r1, r2, max, min;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    max = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    min = (r1 >= r2) ? r1 : r2;
    return ((arg1 * max - arg2 * max) / max).toFixed(min);
}

/**
 * 高精度比较两个数大小
 * @param a
 * @param b
 * @returns {number|number}
 */
export const bcComp = (a, b) => {
    a = Number(a);
    b = Number(b);
    if (isNaN(a)) {
        a = 0;
    }
    if (isNaN(b)) {
        b = 0;
    }
    if (a === b) {
        return 0;
    }
    return a > b ? 1 : -1;
};
