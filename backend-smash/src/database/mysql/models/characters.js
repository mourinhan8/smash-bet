const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "characters",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            former: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            win: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            lost: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            createdAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "created_at",
            },
            updatedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "updated_at",
            },
        },
        {
            sequelize,
            tableName: "characters",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
