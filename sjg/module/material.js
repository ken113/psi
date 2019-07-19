/**
 * 物料表
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'material',
        {
            materialId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            materialName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'materialName'
            },
            specification: {//规格
                type: DataTypes.STRING,
                allowNull: false,
                field: 'specification'
            },
            code: {//助记码
                type: DataTypes.STRING,
                allowNull: false,
                field: 'code'
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'type'
            },
            unit: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'unit'
            },
            stockCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'stockCount'
            },
            enterPerson: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'enterPerson'
            },
            enterDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'enterDate'
            },
            min: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'min'
            },
            max: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'max'
            },
            modifyPerson: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'modifyPerson'
            },
            modifyDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'modifyDate'
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