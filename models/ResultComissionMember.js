const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const ResultComissionMember = sequelize.define('ResultComissionMember', {
    id_RCM: {
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
        type: DataTypes.FLOAT,
        allowNull: false
    },
    RecMagistracy: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    RecPublication: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'result_comission_member',
    timestamps: false
});

module.exports = ResultComissionMember;