//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

const Op = db.Op;

//引入数据表模型
const customer = Sequelize.import('../module/customer')

const tools = require('../public/tool')

//自动创建表
customer.sync({ force: false });

//数据库操作类
class customerModule {

    static async customerAdd(data) {
        return await customer.create(data)
    }
    static async getCustomerList(customerName) {
        if (customerName) {
            return await customer.findAll({
                where: {
                    customerName: {
                        [Op.like]: '%' + customerName + '%'
                    }
                }
            })
        }
        return await customer.findAll({});
    }
    static async getCustomerById(customerId) {
        return await customer.findOne({
            where: {
                customerId
            }
        })
    }
    static async updateCustomer(data) {
        return await customer.update(data, {
            where: {
                customerId: data.customerId
            }
        })
    }

}

//功能处理
class customerController {

    static async create(ctx) {
        const req = ctx.request.body;
        const date = new Date();
        const data = Object.assign({}, req, {
            debt: 0,
            state: '启用'
        });
        try {
            const result = await customerModule.customerAdd(data);
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
    static async getCustomerList(ctx) {
        const req = ctx.request.body;
        let data = await customerModule.getCustomerList(req.searchStr);
        return ctx.body = {
            list: data
        };

    }
    static async getCustomerById(ctx) {
        const req = ctx.request.body;
        let data = await customerModule.getCustomerById(ctx.params.customerId);
        return ctx.body = data;
    }
    static async updateCustomer(ctx) {
        const req = ctx.request.body;
        const data = Object.assign({}, req);
        try {
            let result = await customerModule.updateCustomer(data);
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

module.exports = customerController;