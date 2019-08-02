//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

const Op = db.Op;

//引入数据表模型
const user = Sequelize.import('../module/user')

//引入jwt做token验证
const jwt = require('jsonwebtoken')

//解析token
const tools = require('../public/tool')

//统一设置token有效时间
const expireTime = '2h';

//自动创建表
user.sync({ force: false });

//数据库操作类
class userModule {
    static async userRegist(data) {
        return await user.create({
            password: data.password,
            mobileNo: data.mobileNo,
            userName: data.userName
        })
    }
    static async getUserInfo(mobileNo) {
        return await user.findOne({
            where: {
                mobileNo
            }
        })
    }

    static async getUserById(userId) {
        return await user.findOne({
            where: {
                userId
            }
        })
    }
    static async updateUser(data) {
        return await user.update(data, {
            where: {
                userId: data.userId
            }
        })
    }
    static async deleteUser(userId) {
        return await user.destroy({
            where: {
                userId
            }
        })
    }
    static async getUserList(userName) {
        if (userName) {
            return await user.findAll({
                where: {
                    userName: {
                        [Op.like]: '%' + userName + '%'
                    }
                },
                attributes: { exclude: ['password'] }
            })
        }
        return await user.findAll({
            attributes: ['userId', 'userName', 'mobileNo']
        });

    }

}

//功能处理
class userController {
    //注册用户
    static async create(ctx) {
        const req = ctx.request.body;
        if (req.mobileNo && req.password) {
            try {
                const query = await userModule.getUserInfo(req.mobileNo);
                if (query) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: -1,
                        desc: '用户已存在'
                    }
                } else {
                    const param = {
                        password: req.password,
                        mobileNo: req.mobileNo,
                        userName: req.userName
                    }
                    const data = await userModule.userRegist(param);

                    ctx.response.status = 200;
                    ctx.body = {
                        code: 0,
                        desc: '用户注册成功',
                        userInfo: {
                            mobileNo: req.mobileNo
                        }
                    }
                }

            } catch (error) {
                ctx.response.status = 416;
                ctx.body = {
                    code: -1,
                    desc: '参数不齐全'
                }
            }
        }
    }

    static async login(ctx) {
        const req = ctx.request.body;
        if (!req.mobileNo || !req.password) {
            return ctx.body = {
                code: '-1',
                msg: '用户名或密码不能为空'
            }
        } else {
            const data = await userModule.getUserInfo(req.mobileNo);
            if (data) {
                if (data.password === req.password) {
                    //生成token，验证登录有效期
                    const token = jwt.sign({
                        user: req.mobileNo,
                        password: req.password
                    }, '123456', { expiresIn: expireTime });
                    const info = {
                        createdAt: data.createdAt,
                        updatedAt: data.updatedAt,
                        mobileNo: data.mobileNo,
                        userId: data.userId,
                        userName: data.userName
                    }
                    return ctx.body = {
                        code: '0',
                        token: token,
                        userInfo: info,
                        desc: '登陆成功'
                    }
                } else {
                    return ctx.body = {
                        code: '-1',
                        desc: '用户密码错误'
                    }
                }
            } else {
                return ctx.body = {
                    code: '-1',
                    desc: '该用户尚未注册'
                }
            }
        };
    }

    //获取用户信息(除密码外)
    static async getUserInfo(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {
                const result = await tools.verToken(token);
                if (!req.mobileNo) {
                    return ctx.body = {
                        code: '-1',
                        desc: '参数错误'
                    }
                } else {
                    let data = await userModule.getUserInfo(req.mobileNo);
                    if (req.mobileNo == data.mobileNo) {
                        const info = {
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt,
                            mobileNo: data.mobileNo,
                            userId: data.userId
                        };
                        return ctx.body = {
                            code: '0',
                            userInfo: JSON.stringify(info),
                            desc: '获取用户信息成功'
                        }
                    }
                }
            } catch (error) {
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: '登陆过期，请重新登陆'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    }

    static async getUserById(ctx) {
        let params = ctx.params;
        let data = await userModule.getUserById(params.userId);

        return ctx.body = {
            mobileNo: data.mobileNo * 1,
            userName: data.userName
        }
    }

    static async getUserList(ctx) {

        const req = ctx.request.body;
        let data = await userModule.getUserList(req.searchStr);
        return ctx.body = {
            list: data
        }
    }
    static async updateUser(ctx) {
        const req = ctx.request.body;
        try {
            let data = await userModule.updateUser(req);
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
    static async deleteUser(ctx) {
        let params = ctx.params;
        try {
            let data = await userModule.deleteUser(params.userId);
            return ctx.body = {
                code: '0',
                desc: '删除成功'
            }
        } catch (error) {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '删除失败'
            }
        }
    }
}

module.exports = userController;