const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "betHistory",
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
            walletId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "wallets",
                    key: "id",
                },
                field: "wallet_id",
            },
            tokenId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "tokens",
                    key: "id",
                },
                field: "token_id",
            },
            amount: {
                type: DataTypes.DECIMAL(24, 10),
                allowNull: false,
            },
            gameId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "games",
                    key: "id",
                },
                field: "game_id",
            },
            characterId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "characters",
                    key: "id",
                },
                field: "character_id",
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
            tableName: "bet_history",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "user_id",
                    using: "BTREE",
                    fields: [{ name: "user_id" }],
                },
                {
                    name: "wallet_id",
                    using: "BTREE",
                    fields: [{ name: "wallet_id" }],
                },
                {
                    name: "token_id",
                    using: "BTREE",
                    fields: [{ name: "token_id" }],
                },
                {
                    name: "character_id",
                    using: "BTREE",
                    fields: [{ name: "character_id" }],
                },
                {
                    name: "game_id",
                    using: "BTREE",
                    fields: [{ name: "game_id" }],
                },
            ],
        }
    );
};
