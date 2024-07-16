class extraServices {
    generateUpdateQueryToInsert(user: object, id: string) {
        const keys = Object.keys(user);
        const values: string[] = Object.values(user);
        const setString = keys
            .map((key, index) => `"${key}" = $${index + 1}`)
            .join(", ");

        const query = `UPDATE users SET ${setString} WHERE id = ${id} RETURNING *`;
        return { query, values };
    }
}

export default new extraServices();
