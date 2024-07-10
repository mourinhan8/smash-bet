module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "chatMessage",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            senderId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                field: "sender_id",
            },
            text: {
                type: DataTypes.TEXT,
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
            tableName: "chat_message",
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "id" }],
                },
                {
                    name: "sender_id",
                    unique: true,
                    using: "BTREE",
                    fields: [{ name: "sender_id" }],
                },
            ],
        }
    );
};
