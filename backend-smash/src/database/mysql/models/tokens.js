const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "tokens",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            chainId: {
                type: DataTypes.STRING(10),
                allowNull: false,
                references: {
                    model: "contracts",
                    key: "chain_id",
                },
                field: "chain_id",
            },
            chainName: {
                type: DataTypes.STRING(100),
                allowNull: false,
                references: {
                    model: "contracts",
                    key: "network_name",
                },
                field: "chain_name",
            },
            name: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            symbol: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(100),
                allowNull: false,
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
            tableName: "tokens",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "token_unique",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "chain_name" }, { name: "address" }],
                },
                {
                    name: "token_chain_id_FK",
                    using: "BTREE",
                    fields: [{ name: "chain_id" }],
                },
            ],
        }
    );
};
