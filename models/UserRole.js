const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const UserRole = sequelize.define('UserRole', {
    id_UR: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_U: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_R: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'user_roles',
    timestamps: false
});

module.exports = UserRole;