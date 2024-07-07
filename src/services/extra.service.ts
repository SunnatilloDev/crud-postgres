class extraServices {
    checkValidBody(body: {}, validBodyKeys: string[]): boolean {
        let keysOfBody = Object.keys(body);

        for (let i = 0; i < validBodyKeys.length; i++) {
            if (!validBodyKeys.includes(keysOfBody[i])) {
                return false;
            }
        }
        return true;
    }
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
