const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('temperament', {
        id:{
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },{
          timestamps: false,
          freezeTableName: true,
        } 
    );
};