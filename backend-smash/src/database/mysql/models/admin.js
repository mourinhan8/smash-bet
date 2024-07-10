const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "admin",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: "email",
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            googleAuthen: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
                field: "google_authen",
            },
            googleSecretAscii: {
                type: DataTypes.STRING(255),
                allowNull: true,
                field: "google_secret_ascii",
            },
            googleSecret: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: "google_secret",
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
            tableName: "admin",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "email",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "email" }],
                },
            ],
        }
    );
};
