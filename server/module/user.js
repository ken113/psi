module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            mobileNo: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'mobileNo'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'userName'
            }
        },
        {
            timestamps: false,
            freezeTableName: true //表名不装换为复数
        }
    );
}