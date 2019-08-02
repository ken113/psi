const getToken = require('jsonwebtoken')


exports.verToken = function (token) {
    return new Promise((resolve, rejece) => {
        const info = getToken.verify(token.split(' ')[1], "123456");
        resolve(info);
    })
}

exports.dateNum = function (date) {
    if (date) {
        date = new Date(date);
        const o = {
            'Y': date.getFullYear(),
            'M': date.getMonth() + 1,
            'D': date.getDate(),
            'h': date.getHours(),
            'm': date.getMinutes(),
            's': date.getSeconds(),
        };
        o.M = o.M > 9 ? o.M : '0' + o.M;
        o.D = o.D > 9 ? o.D : '0' + o.D;
        o.h = o.h > 9 ? o.h : '0' + o.h;
        o.m = o.m > 9 ? o.m : '0' + o.m;
        o.s = o.s > 9 ? o.s : '0' + o.s;
        return o.Y + o.M + o.D + o.h + o.m + o.s;
    } else {
        return '';
    }
}