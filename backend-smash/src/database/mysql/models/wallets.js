const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "wallets",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                field: "user_id",
            },
            tokenId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: "token_id",
            },
            balance: {
                type: DataTypes.DECIMAL(24, 10),
                allowNull: true,
                defaultValue: 0.0,
            },
            createdAt: {
                type: DataTypes.BIGINT,
                allowNull: false,
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
            tableName: "wallets",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "wallet_user_id_FK",
                    using: "BTREE",
                    fields: [{ name: "user_id" }],
                },
            ],
        }
    );
};
