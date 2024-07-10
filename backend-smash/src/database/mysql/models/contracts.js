const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "contracts",
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
                unique: "chain_id",
                field: "chain_id",
            },
            networkName: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: "network_name",
                field: "network_name",
            },
            contractName: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "contract_name",
            },
            contractAddress: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "contract_address",
            },
            contractAbi: {
                type: DataTypes.TEXT,
                allowNull: false,
                field: "contract_abi",
            },
            explorerUrl: {
                type: DataTypes.STRING(255),
                allowNull: false,
                field: "explorer_url",
            },
            rpcEndpoint: {
                type: DataTypes.STRING(255),
                allowNull: true,
                field: "rpc_endpoint",
            },
            status: {
                type: DataTypes.ENUM("enable", "disable"),
                allowNull: true,
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
            tableName: "contracts",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "chain_id",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "chain_id" }],
                },
                {
                    name: "network_name",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "network_name" }],
                },
            ],
        }
    );
};
