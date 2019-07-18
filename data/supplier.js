import { convertDate } from './../src/lib/common';

const saleData = {

    getData() {
        const supList = ['AQ-爱趣', 'AS-爱尚', 'EA-享受安达曼', 'FP-自由普吉', 'GJ-铁公鸡', 'HL-欢乐假期', 'HQ-好巧', 'LD-蓝梦潜水'];
        let data = [];
        for (var i = 0; i < supList.length; i++) {
            data.push({
                item: supList[i],
                count: Math.floor(Math.random() * 10000),
            });
        }
        return data;
    },
    getData2() {
        const supList = ['AQ-爱趣', 'AS-爱尚', 'EA-享受安达曼', 'FP-自由普吉', 'GJ-铁公鸡', 'HL-欢乐假期', 'HQ-好巧', 'LD-蓝梦潜水'];
        let data = [];
        for (var i = 0; i < supList.length; i++) {
            data.push({
                item: supList[i],
                count: Math.floor(Math.random() * 10000),
                percent:(Math.floor(Math.random() * 10)/10).toFixed(2)*1
            });
        }
        return data;
    },

};

export default saleData;