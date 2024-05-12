const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Criterion = sequelize.define('Criterion', {
    id_Cr: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'criteria',
    timestamps: false
});

module.exports = Criterion;