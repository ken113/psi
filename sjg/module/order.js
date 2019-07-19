/**
 * 订单表
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'order',
        {
            orderId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            orderNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'orderNumber'
            },
            orderName: {//规格
                type: DataTypes.STRING,
                allowNull: false,
                field: 'orderName'
            },
            customerCompany: {//助记码
                type: DataTypes.STRING,
                allowNull: false,
                field: 'customerCompany'
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'state'
            },
            createDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'createDate'
            },
            deliveryDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'deliveryDate'
            },
            materialName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'materialName'
            },
            remark: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'remark'
            }
        },
        {
            timestamps: false,
            freezeTableName: true //表名不装换为复数
        }
    );
}