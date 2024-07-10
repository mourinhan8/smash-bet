const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "users",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            walletAddress: {
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: "wallet_address",
                field: "wallet_address",
            },
            referralCode: {
                type: DataTypes.STRING(10),
                allowNull: false,
                unique: "referral_code",
                field: "referral_code",
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
            tableName: "users",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "wallet_address",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "wallet_address" }],
                },
                {
                    name: "referral_code",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "referral_code" }],
                },
            ],
        }
    );
};
