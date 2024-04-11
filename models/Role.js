const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Role = sequelize.define('Role', {
    id_R: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name_role: {
        type: DataTypes.STRING(80),
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;