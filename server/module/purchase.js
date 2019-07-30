/**
 * 采购表
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'purchase',
        {
            purchaseId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            purchaseNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'purchaseNumber'
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'debt'
            },
            reviewer: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'reviewer'
            },
            supplierName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'supplierName'
            },
            goods: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'goods'
            },
            goodsNum: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'goodsNum'
            },
            pay: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'pay'
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'state'
            }
        },
        {
            timestamps: false,
            freezeTableName: true //表名不装换为复数
        }
    );
}