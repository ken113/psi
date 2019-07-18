import { convertDate } from './../src/lib/common';

const saleData = {
    getData( type ) {

        let itemList = [];

        if( type === 1 ){
            itemList = ['男', '女'];
        }else if( type === 2 ){
            itemList = ['0-4岁(不含)', '4-12岁(不含)', '12-20岁(不含)', '20-30岁(不含)', '30-60岁(不含)', '60岁以上'];
        }else if( type === 3 ){
            itemList = ['成人', '儿童', '婴儿'];
        }else if( type === 4 ){
            itemList = ['家庭团', '情侣团', '男人团','女人团','亲子团','单身','其他'];
        }
        let data = [];
        let total = 0;
        for (var i = 0; i < itemList.length; i++) {
            let count = Math.floor(Math.random() * (100 - total));
            if (i === itemList.length - 1) {
                count = 100 - total;
            }
            let percent = (count / 100).toFixed(2) * 1;

            data.push({
                item: itemList[i],
                count: count,
                percent: percent
            });
            total += count;
        }
        return data;
    },
    getData2() {
        let data = [];

        for (var i = 0; i < 30; i++) {

            //之前的30天

            var datetime = convertDate(+new Date() - 30 * 24 * 60 * 60 * 1000 + i * 24 * 60 * 60 * 1000, true).substring(5, 10);

            data.push({
                date: datetime,
                type: '全部',
                count: Math.floor(Math.random() * 100)
            });
            data.push({
                date: datetime,
                type: '飞猪',
                count: Math.floor(Math.random() * 100)
            });
            data.push({
                date: datetime,
                type: '马蜂窝',
                count: Math.floor(Math.random() * 100)
            });
            data.push({
                date: datetime,
                type: '携程',
                count: Math.floor(Math.random() * 100)
            });
            data.push({
                date: datetime,
                type: '新美大',
                count: Math.floor(Math.random() * 100)
            });
        }
        return data;
    },
};

export default saleData;