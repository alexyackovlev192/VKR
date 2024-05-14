const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const ResultComissionSecretary = sequelize.define('ResultComissionSecretary', {
    id_RCS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_DSS: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_U: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Result: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    RecMagistracy: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    RecPublication: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    NumberProtocol: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'result_commission secretary',
    timestamps: false
});

module.exports = ResultComissionSecretary;