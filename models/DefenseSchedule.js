const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const DefenseSchedule = sequelize.define('DefenseSchedule', {
    id_DS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_G: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_D: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    classroom: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'defense_schedule',
    timestamps: false
});

module.exports = DefenseSchedule;