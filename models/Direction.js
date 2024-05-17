const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Direction = sequelize.define('Direction', {
    id_D: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name_direction: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'directions',
    timestamps: false
});

module.exports = Direction;