import { convertDate } from './../src/lib/common';

const saleData = {

    getData() {
        let columnData = [], tableData = [];
        columnData.push({ label: '出行日期', prop: 'date' });
        for (var i = 0; i < 15; i++) {
            //之前的30天
            var datetime = convertDate(+new Date() - 15 * 24 * 60 * 60 * 1000 + i * 24 * 60 * 60 * 1000, true).substring(5, 10);
            columnData.push({ label: datetime, prop: datetime });
        }
        columnData.push({ label: '小计', prop: 'total' });

        var length = Math.floor(Math.random() * 20);
        for (var j = 0; j < length; j++) {

            var dataJson = {};
            for (var i = 1; i < columnData.length; i++) {
                dataJson[columnData[i].prop] = Math.floor(Math.random() * 100) + ' ' + Math.floor(Math.random() * 100) + ' ' + Math.floor(Math.random() * 100);
            }
            dataJson.date = '一日游#123';
            tableData.push(dataJson);
        }

        return {
            columnData: columnData,
            tableData: tableData
        };
    },

};

export default saleData;