const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const User = sequelize.define('User', {
    id_U: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Fullname: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    Login: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    Mail: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    Post: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;