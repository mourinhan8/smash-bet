const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "transactions",
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
                field: "token_id",
            },
            type: {
                type: DataTypes.ENUM(
                    "deposit",
                    "withdraw",
                    "withdraw_refund",
                    "bet",
                    "reward",
                    "referral",
                    "redeem",
                    "refund"
                ),
                allowNull: true,
            },
            message: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            value: {
                type: DataTypes.DECIMAL(24, 10),
                allowNull: false,
            },
            fee: {
                type: DataTypes.DECIMAL(24, 10),
                allowNull: true,
                defaultValue: 0.0,
            },
            txHash: {
                type: DataTypes.STRING(200),
                allowNull: true,
                field: "tx_hash",
            },
            preBalance: {
                type: DataTypes.DECIMAL(24, 10),
                allowNull: false,
                defaultValue: 0.0,
                field: "pre_balance",
            },
            postBalance: {
                type: DataTypes.DECIMAL(24, 10),
                allowNull: false,
                defaultValue: 0.0,
                field: "post_balance",
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
            tableName: "transactions",
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
            ],
        }
    );
};
