
/**
*设置cookie值
*/
export function setCookie(name, value, time) {

    let exp = new Date();
    if (time) {
        exp.setTime(exp.getTime() + time * 24 * 60 * 60 * 1000);
    } else {
        exp.setTime(exp.getTime() + 10 * 60 * 1000);//默认10分钟
    }

    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
}

/**
*获取cookie值
*/
export function getCookieValue(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {

            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
*删除cookie值
*/
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 60 * 1000);
    var cval = getCookieValue(name);

    document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toUTCString();
}

/**
*获取URL上面的值
*/
export function getUrlParam(param) {
    const reg = new RegExp(`${param}=([^&]*)(&?)`, 'i'),
        paramValue = location.hash.match(reg);
    return paramValue ? paramValue[1] : '';
}

/**
*日期转换
*/
export function convertDate(date, dateOnly) {

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

        if (dateOnly === true) {
            return o.Y + '-' + o.M + '-' + o.D;
        } else if (dateOnly === false) {
            return o.h + ':' + o.m + ':' + o.s;
        }
        return o.Y + '-' + o.M + '-' + o.D + ' ' + o.h + ':' + o.m + ':' + o.s;
    } else {
        return '';
    }
};

/**
*生日转换
*/
export function convertAge(date, nominal) {
    if (date) {
        let birthday = new Date(date);
        let today = new Date();
        let offYear = today.getFullYear() - birthday.getFullYear();
        let monBirthday = birthday.getMonth();
        let dateBirthday = birthday.getDate();
        let monToday = today.getMonth();
        let dateToday = today.getDate();
        let havedBirthday = false; {
            if (parseInt(monToday) < parseInt(monBirthday)) {
            } else if (parseInt(monToday) == parseInt(monBirthday)) {
                if (parseInt(dateToday) >= parseInt(dateBirthday)) {
                    havedBirthday = true;
                }
            } else {
                havedBirthday = true;
            }
        }
        let age = offYear;
        if ((nominal !== true) && !havedBirthday) {
            age -= 1;
        }
        return age;
    } else {
        return 0;
    }
};


//验证方法集合
export const validate = {

    isNum(str) {
        return /^[0-9]*$/.test(str);
    },
    isNumWith4Place(str) {
        return /^[0-9]+(\.{1}[0-9]{0,}){0,1}$/.test(str);
    },
    isZeroGtNum(str) {
        return /^0$|(^[1-9]{1}[0-9]*$)/.test(str);
    },
    isEmail(str) {
        var myReg = /^([a-zA-Z0-9_#*~$^`|;:"'/?<>,&\\\(\)={}\[\]\%\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{1,10})+$/;
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return (myReg.test(str))
    },
    isCN(str) {
        return /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(str);
    },
    isEnglish(str) {
        var reg = /^[A-Za-z]+$/;
        return reg.test(str);
    },
    isString(str) {
        return /^[^\\\/\*\?\|":<>]+$/.test(str);
    },

    // 1、微信号是微信的唯一凭证，只能设置1次；
    // 2、可使用6-20个字母、数字、下划线和减号。例如：“weixin”、“qq_123”、“qq-123”；
    // 3、必须以字母开头（字母不区分大小写）；
    // 4、不支持设置中文。
    isWechat(str) {
        var reg = /^[a-zA-Z]{1}[a-zA-Z\d_-]{5,}$/;
        return reg.test(str);
    },

    // 1.密码必须6-12位，含拼音数字大小写组合
    isPassword(str) {
        var reg = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,12}$/;
        return reg.test(str);
    },

    //电话号码
    isMobileNumber(str) {
        var reg = /^((\+)*[0-9]{1,4})*[0-9]{11}$/;
        return reg.test(str);
    },

    //手机号码
    isTelephoneNumber(str) {
        var reg = /^((\+)*[0-9]{1,4})*[0-9]{2,12}$/;
        return reg.test(str);
    },

    //中国身份证
    isChineseID(str) {
        var reg = /(^[0-9]{15}$)|(^[0-9]{14}(x|X)$)|(^[0-9]{18}$)|(^[0-9]{17}(x|X)$)/;
        return reg.test(str);
    },

    //中国护照
    isChinesePassport(str) {
        //var reg = /^[a-zA-Z]{1}[0-9]{8}$/;
        //var reg = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
        var reg = /^[a-zA-Z0-9]{7,14}$/;
        if (reg.test(str)) {
            return true;
        }
        return false;
    }

};

//获取浏览器信息
export function getBrowserInfo() {
    var browser;
    var version;
    var UA = navigator.userAgent;
    if (UA) {
        UA = UA.toLocaleLowerCase();
        //edge isChronium
        if (UA.indexOf("edge") !== -1) {
            browser = {};
            browser.name = "edge";
            if (UA.indexOf("nt") !== -1) {
                browser.os = "nt";
            }
            version = UA.match(/edge\/[\S]*$/g);
            if (version.length > 0) {
                browser.version = version[0].split("/")[1].replace(" ", "");
            }
        }
        //edge isChronium
        if (UA.indexOf("opr") !== -1) {
            browser = {};
            browser.name = "opr";
            version = UA.match(/opr\/[\S]*$/g);
            if (version.length > 0) {
                browser.version = version[0].split("/")[1].replace(" ", "");
            }
        }

        //chrome
        else if (UA.indexOf("chrome") !== -1) {
            browser = {};
            browser.name = "chrome";
            version = UA.match(/chrome\/[\S]*\s/g);
            if (version.length > 0) {
                browser.version = version[0].split("/")[1].replace(" ", "");
            }

        }

        //safari
        else if (UA.indexOf("safari") !== -1) {
            browser = {};
            browser.name = "safari";
            var version = UA.match(/version\/[\S]*\s/g);
            if (version.length > 0) {
                browser.version = version[0].split("/")[1].replace(" ", "");
            }

        }

        //firefox
        else if (UA.indexOf("firefox") !== -1) {
            browser = {};
            browser.name = "firefox";
            var version = UA.match(/firefox\/[\S]*$/g);
            if (version.length > 0) {
                browser.version = version[0].split("/")[1].replace(" ", "");
            }
        }

        //ie
        // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko";
        // "Mozilla/5.0(compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)";
        // "Mozilla/5.0(compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
        // "Mozilla/4.0(compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)";
        // "Mozilla/4.0(compatible; MSIE 7.0; Windows NT 6.0)";
        // "Mozilla/4.0(compatible; MSIE 6.0; Windows NT 5.1)";

        //ie 10-6
        else if (UA.indexOf("msie") !== -1) {
            browser = {};
            browser.name = "msie";
            var version = UA.match(/msie [\S]*;/g);
            if (version.length > 0) {
                browser.version = version[0].split(" ")[1];
            }
        }

        //ie 11
        else if (UA.indexOf("trident") !== -1) {
            browser = {};
            browser.name = "msie";
            var version = UA.match(/rv:[\S]*\)/g);
            if (version.length > 0) {
                browser.version = version[0].split(":")[1];
            }
        }

        if (browser) {

            //dectect WeChat
            if (UA.indexOf("micromessage") !== -1) {
                browser.isWeChat = true;
            }

            if (UA.indexOf("chrome") !== -1) {
                browser.isChronium = true;
            }

            //dectect mobbile
            if (UA.indexOf("mobile") !== -1) {
                browser.isMobile = true;
            } else {
                browser.isMobile = false;
            }

            if (UA.indexOf("iphone") !== -1 || UA.indexOf("ipod") !== -1 || UA.indexOf("ipad") !== -1) {
                browser.os = "ios";
            } else if (UA.indexOf("mac os") !== -1) {
                browser.os = "macos";
            } else if (UA.indexOf("nt") !== -1) {
                browser.os = "nt";
            } else if (UA.indexOf("android") !== -1) {
                browser.os = "android";
            } else if (UA.indexOf("linux") !== -1) {
                browser.os = "linux";
            }
            if (UA.indexOf("iphone") !== -1 || UA.indexOf("ipod") !== -1) {
                browser.device = "iphone";
            } else if (UA.indexOf("ipad") !== -1) {
                browser.device = "ipad";
            } else {
                browser.device = "other";
            }
        }
    }

    // undefined
    // or
    // {
    // 	name:"",
    // 	version:"",
    // 	isMobile:"",
    // 	isChronium:"",
    // 	isWeChat:"",
    // 	os:"",
    // 	device:""
    // }
    return browser;
};

export function extendsProtoType() {

    Array.prototype.unique = function () {
        return Array.from(new Set(this));
    }
    Array.prototype.remove = function (item) {

        let index = this.indexOf(item);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
}

export function tooltip(target,message,time=1000,type='error') {

    const tooltip = document.createElement('div'),
        offset = getOffset(target);
    if( type == 'error' ){
        tooltip.className = 'zyt-tooltip';
        tooltip.style.top = offset.top - 46;
        tooltip.style.left = offset.left;
    }else{
        tooltip.className = 'zyt-tooltip info';
        tooltip.style.top = offset.top + target.clientHeight + 6;
        tooltip.style.left = offset.left;
    }
    tooltip.innerText = message;
    document.body.append(tooltip);

    let length = document.getElementsByClassName('zyt-tooltip').length,
        tip = document.getElementsByClassName('zyt-tooltip')[ length - 1 ],
        width = tip.clientWidth;
    tip.style.left = offset.left - ( width - target.clientWidth )/2;

    setTimeout(function () {
        clearToolTip();
    }, time);
}

export function clearToolTip(target) {
    if (target) {
        //target.remove();
        return;
    }
    let tooltipList = document.getElementsByClassName('zyt-tooltip');
    while (tooltipList.length - 1 >= 0) { tooltipList[0].remove(); }
}

export function getOffsetSum(ele) {
    var top = 0, left = 0;
    while (ele) {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }
    return {
        top: top,
        left: left
    }
}

export function getOffsetRect(ele) {
    var box = ele.getBoundingClientRect();
    var body = document.body,
        docElem = document.documentElement;
    //获取页面的scrollTop,scrollLeft(兼容性写法)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop,
        clientLeft = docElem.clientLeft || body.clientLeft;
    var top = box.top + scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;
    return {
        //Math.round 兼容火狐浏览器bug
        top: Math.round(top),
        left: Math.round(left)
    }
}

export function getOffset(ele) {
    if (ele.getBoundingClientRect) {
        return getOffsetRect(ele);
    } else {
        return getOffsetSum(ele);
    }
}

export function isDateBetween(date, start, end) {
    var thisDate = +new Date(date),
        startDate = +new Date(start),
        endDate = +new Date(end);
    if ( thisDate >= startDate && thisDate <= endDate) {
        return true;
    }else if( convertDate(date).substring(0,10) == convertDate( startDate ).substring(0,10) ){
        return true;
    }else if( convertDate(date).substring(0,10) == convertDate( endDate).substring(0,10) ){
        return true;
    }
    return false;
}