const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "withdrawRequest",
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
                references: {
                    model: "tokens",
                    key: "id",
                },
                field: "token_id",
            },
            transactionId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "transactions",
                    key: "id",
                },
                field: "transaction_id",
            },
            amount: {
                type: DataTypes.DECIMAL(24, 10),
                allowNull: false,
            },
            fee: {
                type: DataTypes.DECIMAL(24, 10),
                allowNull: false,
            },
            adminCheck: {
                type: DataTypes.ENUM("approved", "rejected", "pending"),
                allowNull: true,
                defaultValue: "pending",
                field: "admin_check",
            },
            botExecuteStatus: {
                type: DataTypes.ENUM("ignore", "pending", "executing", "success", "fail"),
                allowNull: true,
                defaultValue: "ignore",
                field: "bot_execute_status",
            },
            botComment: {
                type: DataTypes.STRING(200),
                allowNull: true,
                field: "bot_comment",
            },
            txHash: {
                type: DataTypes.STRING(200),
                allowNull: true,
                field: "tx_hash",
            },
            createdAt: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: "created_at",
            },
            resolvedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "resolved_at",
            },
            executedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "executed_at",
            },
            finishedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "finished_at",
            },
        },
        {
            sequelize,
            tableName: "withdraw_request",
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
                    name: "token_id",
                    using: "BTREE",
                    fields: [{ name: "token_id" }],
                },
                {
                    name: "withdraw_request_transaction_id_FK",
                    using: "BTREE",
                    fields: [{ name: "transaction_id" }],
                },
            ],
        }
    );
};
