const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const DefenseScheduleStudent = sequelize.define('DefenseScheduleStudent', {
    id_DSS: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_DS: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_S: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'defense_schedule_students',
    timestamps: false
});

module.exports = DefenseScheduleStudent;