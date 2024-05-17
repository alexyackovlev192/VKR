const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Student = sequelize.define('Student', {
    id_S: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Fullname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Group: {
        type: DataTypes.STRING(10),
        allowNull: false 
    },
    Topic: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    ScientificAdviser: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Avg_Mark: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Red_Diplom: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    YearOfDefense: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    id_D: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'students',
    timestamps: false
});

module.exports = Student;