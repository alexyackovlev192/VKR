const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Gec = sequelize.define('Gec', {
    id_G: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_D: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_U: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    year: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'gec',
    timestamps: false
});

module.exports = Gec;