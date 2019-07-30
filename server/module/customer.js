/**
 * 客户表
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'customer',
        {
            customerId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            customerName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'customerName'
            },
            debt: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'debt'
            },
            tel: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'tel'
            },
            contacts: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'contacts'
            },
            contactsPhonte: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'contactsPhonte'
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'address'
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