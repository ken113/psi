//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

const Op = db.Op;

//引入数据表模型
const order = Sequelize.import('../module/order')

const tools = require('../public/tool')

//自动创建表
order.sync({ force: false });

//数据库操作类
class orderModule {

    static async orderAdd(data) {
        return await order.create(data)
    }
    static async getOrderList() {
        return await order.findAll({});
    }
    static async getOrderById(orderId) {
        return await order.findOne({
            where: {
                orderId
            }
        })
    }
    static async updateOrder(data) {
        return await order.update(data, {
            where: {
                orderId: data.orderId
            }
        })
    }

}

//功能处理
class orderController {

    static async create(ctx) {
        const req = ctx.request.body;
        const date = new Date();
        const data = Object.assign({}, req, {
            orderNumber: tools.dateNum(date),
            createDate: date,
            state: '接单'
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
        let data = await orderModule.getOrderList(req.searchStr);
        return ctx.body = {
            list: data
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
}

module.exports = orderController;