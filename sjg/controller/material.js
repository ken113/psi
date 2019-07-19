//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

const Op = db.Op;

//引入数据表模型
const material = Sequelize.import('../module/material')

const tools = require('../public/tool')

//自动创建表
material.sync({ force: false });

//数据库操作类
class materialModule {

    static async materialAdd(data) {
        return await material.create(data)
    }
    static async getMaterialList() {
        return await material.findAll({});
    }
    static async getMaterialById(materialId) {
        return await material.findOne({
            where: {
                materialId
            }
        })
    }
    static async updateMaterial(data) {
        return await material.update(data, {
            where: {
                materialId: data.materialId
            }
        })
    }

}

//功能处理
class materialController {

    static async create(ctx) {
        const req = ctx.request.body;
        const data = Object.assign({}, req, {
            enterPerson: req.userName,
            enterDate: new Date(),
            modifyPerson: req.userName,
            modifyDate: new Date()
        });
        try {
            const result = await materialModule.materialAdd(data);
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
    static async getMaterialList(ctx) {
        const req = ctx.request.body;
        let data = await materialModule.getMaterialList(req.searchStr);
        return ctx.body = {
            list: data
        };

    }
    static async getMaterialById(ctx) {
        const req = ctx.request.body;
        let data = await materialModule.getMaterialById(ctx.params.materialId);
        return ctx.body = data;
    }
    static async updateMaterial(ctx) {
        const req = ctx.request.body;
        const data = Object.assign({}, req, {
            modifyPerson: req.userName,
            modifyDate: new Date()
        });
        try {
            let result = await materialModule.updateMaterial(data);
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

module.exports = materialController;