//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

const Op = db.Op;

//引入数据表模型
const supplier = Sequelize.import('../module/supplier')

const tools = require('../public/tool')

//自动创建表
supplier.sync({ force: false });

//数据库操作类
class supplierModule {

    static async supplierAdd(data) {
        return await supplier.create(data)
    }
    static async getSupplierList(supplierName) {
        if (supplierName) {
            return await supplier.findAll({
                where: {
                    supplierName: {
                        [Op.like]: '%' + supplierName + '%'
                    }
                }
            })
        }
        return await supplier.findAll({});
    }
    static async getSupplierById(supplierId) {
        return await supplier.findOne({
            where: {
                supplierId
            }
        })
    }
    static async updateSupplier(data) {
        return await supplier.update(data, {
            where: {
                supplierId: data.supplierId
            }
        })
    }

}

//功能处理
class supplierController {

    static async create(ctx) {
        const req = ctx.request.body;
        const date = new Date();
        const data = Object.assign({}, req, {
            debt: 0,
            state: '启用'
        });
        try {
            const result = await supplierModule.supplierAdd(data);
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
    static async getSupplierList(ctx) {
        const req = ctx.request.body;
        let data = await supplierModule.getSupplierList(req.searchStr);
        return ctx.body = {
            list: data
        };

    }
    static async getSupplierById(ctx) {
        const req = ctx.request.body;
        let data = await supplierModule.getSupplierById(ctx.params.supplierId);
        return ctx.body = data;
    }
    static async updateSupplier(ctx) {
        const req = ctx.request.body;
        const data = Object.assign({}, req);
        try {
            let result = await supplierModule.updateSupplier(data);
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

module.exports = supplierController;