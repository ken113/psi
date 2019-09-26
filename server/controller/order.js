//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

const Op = db.Op;

//引入数据表模型
const order = Sequelize.import('../module/order')

const tools = require('../public/tool')

const send = require('koa-send');

//自动创建表
order.sync({ force: false });

//数据库操作类
class orderModule {

    static async orderAdd(data) {
        return await order.create(data)
    }
    static async getOrderList(data) {
        return await order.findAndCountAll({
            limit: data.pageSize,
            offset: data.pageSize * (data.currentPage - 1),
            where: {
                orderName: {
                    [Op.like]: '%' + data.searchStr + '%'
                }
            }
        });
    }
    static async getOrderById(orderId) {
        return await order.findOne({
            where: {
                orderId
            }
        })
    }
    static async updateOrder(data) {

        if (data.orderIdList) {
            return await order.update({
                state: data.status
            }, {
                    where: {
                        orderId: data.orderIdList
                    }
                })
        } else {
            return await order.update(data, {
                where: {
                    orderId: data.orderId
                }
            })
        }

    }
    static async bulkCreateOrder(data) {
        return await order.bulkCreate(data)
    }

}

//功能处理
class orderController {

    static async create(ctx) {
        const req = ctx.request.body;
        const date = new Date();
        const data = Object.assign({}, req, {
            createDate: date,
            state: '新增订单'
        });
        try {
            const result = await orderModule.orderAdd(data);
            return ctx.body = {
                code: '0',
                desc: '添加成功'
            }
        } catch (error) {
            return ctx.body = {
                code: '-1',
                desc: error
            }
        }
    }
    static async getOrderList(ctx) {
        const req = ctx.request.body;
        let data = await orderModule.getOrderList(req);
        return ctx.body = {
            list: data.rows,
            count: data.count
        };

    }
    static async getOrderById(ctx) {
        const req = ctx.request.body;
        let data = await orderModule.getOrderById(ctx.params.orderId);
        return ctx.body = data;
    }
    static async updateOrder(ctx) {
        const req = ctx.request.body;
        const data = Object.assign({}, req);
        try {
            let result = await orderModule.updateOrder(data);
            return ctx.body = {
                code: '0',
                desc: '更新成功'
            }
        } catch (error) {
            return ctx.body = {
                code: '-1',
                desc: '更新失败'
            }
        }
    }
    static async importData(ctx) {
        const req = ctx.request.body;

        let newData = [];

        req.forEach(element => {
            let date = new Date();
            newData.push(Object.assign({}, element, {
                createDate: date,
            }));
        });

        try {
            const result = await orderModule.bulkCreateOrder(newData);
            return ctx.body = {
                code: '0',
                desc: '添加成功'
            }
        } catch (error) {
            return ctx.body = {
                code: '-1',
                desc: error
            }
        }
    }
}

module.exports = orderController;