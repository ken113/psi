
import { convertDate } from './../src/lib/common';

const saleData = {
    getData() {
        let data = [];

        for (var i = 0; i < 30; i++) {

            //之前的30天

            var datetime = convertDate(+new Date() - 30 * 24 * 60 * 60 * 1000 + i * 24 * 60 * 60 * 1000, true).substring(5, 10);

            data.push({
                date: datetime,
                type: '订单数量',
                count: Math.floor(Math.random() * 5000)
            });
            data.push({
                date: datetime,
                type: '出行人次',
                count: Math.floor(Math.random() * 3000)
            });
        }
        return data;
    },
    getData2() {
        const itemList = ['飞猪', '马蜂窝', '携程', '新美大', '途牛', '同行分销', '自营', '八只小猪', '其他'];
        let data = [];
        let total = 0;
        for (var i = 0; i < itemList.length; i++) {
            let count = Math.floor(Math.random() * (100 - total));
            if( i === itemList.length - 1 ){
                count = 100 - total;
            }
            let percent = (count / 100).toFixed(2)*1;

            data.push({
                item: itemList[i],
                count: count,
                percent: percent
            });
            total += count;
        }
        return data;
    }
};

export default saleData;