export const dateCommonSchema = {
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
        comment: 'Fecha de creación del post',
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
        comment: 'Fecha de actualización del post',
    },
};