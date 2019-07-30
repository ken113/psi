
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'supplier',
        {
            supplierId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            supplierName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'supplierName'
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