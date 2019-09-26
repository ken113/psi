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
            orderName: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'orderName'
            },
            customerCompany: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'customerCompany'
            },
            customerOrderNo: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'customerOrderNo'
            },
            specs: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'specs'
            },
            price: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'price'
            },
            count: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'count'
            },
            money: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'money'
            },
            state: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'state'
            },
            reconciliationMonth: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'reconciliationMonth'
            },
            createDate: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'createDate'
            },
            customerDeliveryDate: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'customerDeliveryDate'
            },
            deliveryDate: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'deliveryDate'
            },
            deliveryCount: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'deliveryCount'
            },
            departmentCode: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'departmentCode'
            },
            contacts: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'contacts'
            },
            contactsId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'contactsId'
            },
            user: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'user'
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'userId'
            },
            materialName: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'materialName'
            },
            remark: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'remark'
            }
        },
        {
            timestamps: false,
            freezeTableName: true //表名不装换为复数
        }
    );
}