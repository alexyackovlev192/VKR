const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const DefensePresence = sequelize.define('DefensePresence', {
    id_DP: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_DS: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_U: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Status: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'defense_presence',
    timestamps: false
});

module.exports = DefensePresence;