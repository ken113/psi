//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

const Op = db.Op;

//引入数据表模型
const purchase = Sequelize.import('../module/purchase')

const tools = require('../public/tool')

//自动创建表
purchase.sync({ force: false });

//数据库操作类
class purchaseModule {

    static async purchaseAdd(data) {
        return await purchase.create(data)
    }
    static async getPurchaseList(purchaseName) {
        if (purchaseName) {
            return await purchase.findAll({
                where: {
                    purchaseName: {
                        [Op.like]: '%' + purchaseName + '%'
                    }
                }
            })
        }
        return await purchase.findAll({});
    }
    static async getPurchaseById(purchaseId) {
        return await purchase.findOne({
            where: {
                purchaseId
            }
        })
    }
    static async updatePurchase(data) {
        return await purchase.update(data, {
            where: {
                purchaseId: data.purchaseId
            }
        })
    }

}

//功能处理
class purchaseController {

    static async create(ctx) {
        const req = ctx.request.body;
        const date = new Date();
        const data = Object.assign({}, req, {
            debt: 0,
            state: '启用'
        });
        try {
            const result = await purchaseModule.purchaseAdd(data);
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
    static async getPurchaseList(ctx) {
        const req = ctx.request.body;
        let data = await purchaseModule.getPurchaseList(req.searchStr);
        return ctx.body = {
            list: data
        };

    }
    static async getPurchaseById(ctx) {
        const req = ctx.request.body;
        let data = await purchaseModule.getPurchaseById(ctx.params.purchaseId);
        return ctx.body = data;
    }
    static async updatePurchase(ctx) {
        const req = ctx.request.body;
        const data = Object.assign({}, req);
        try {
            let result = await purchaseModule.updatePurchase(data);
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

module.exports = purchaseController;