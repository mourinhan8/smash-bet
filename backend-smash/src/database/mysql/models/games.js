const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "games",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            type: {
                type: DataTypes.ENUM("against_system", "against_others"),
                allowNull: true,
                defaultValue: "against_system",
            },
            firstCharacterId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "characters",
                    key: "id",
                },
                field: "first_character_id",
            },
            rateFirst: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
                defaultValue: 1.0,
                field: "rate_first",
            },
            secondCharacterId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "characters",
                    key: "id",
                },
                field: "second_character_id",
            },
            rateSecond: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
                defaultValue: 1.0,
                field: "rate_second",
            },
            thirdCharacterId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "characters",
                    key: "id",
                },
                field: "third_character_id",
            },
            rateThird: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
                defaultValue: 1.0,
                field: "rate_third",
            },
            fourthCharacterId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "characters",
                    key: "id",
                },
                field: "fourth_character_id",
            },
            rateFourth: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
                defaultValue: 1.0,
                field: "rate_fourth",
            },
            streamUrl: {
                type: DataTypes.STRING(1000),
                allowNull: false,
                field: "stream_url",
            },
            status: {
                type: DataTypes.ENUM("pending", "starting", "ending"),
                allowNull: true,
                defaultValue: "pending",
            },
            winnerId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                references: {
                    model: "characters",
                    key: "id",
                },
                field: "winner_id",
            },
            createdAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "created_at",
            },
            startedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "started_at",
            },
            finishedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "finished_at",
            },
            activedAt: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "actived_at",
            },
        },
        {
            sequelize,
            tableName: "games",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "first_character_id",
                    using: "BTREE",
                    fields: [{ name: "first_character_id" }],
                },
                {
                    name: "second_character_id",
                    using: "BTREE",
                    fields: [{ name: "second_character_id" }],
                },
                {
                    name: "third_character_id",
                    using: "BTREE",
                    fields: [{ name: "third_character_id" }],
                },
                {
                    name: "fourth_character_id",
                    using: "BTREE",
                    fields: [{ name: "fourth_character_id" }],
                },
                {
                    name: "winner_id",
                    using: "BTREE",
                    fields: [{ name: "winner_id" }],
                },
            ],
        }
    );
};
