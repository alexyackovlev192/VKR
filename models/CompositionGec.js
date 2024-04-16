const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const CompositionGec = sequelize.define('CompositionGec', {
    id_C: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_G: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_U: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'composition_gec',
    timestamps: false
});

module.exports = CompositionGec;