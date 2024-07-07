import { IUser } from "../../types";
import pool from "../database";
import extraService from "./extra.service";

class userService {
    async getUsers() {
        let query = "SELECT * FROM users";
        let { rows: users } = await pool.query(query);
        return users;
    }
    async createUser(user: IUser): Promise<IUser> {
        let query =
            "INSERT INTO users (first_name, last_name, email, salary) VALUES ($1, $2, $3, $4) RETURNING *";
        let values = [user.first_name, user.last_name, user.email, user.salary];
        let createdUser = (await pool.query(query, values)).rows[0];
        return createdUser;
    }
    async getOneUser(id: string) {
        let query = `SELECT * FROM users WHERE id = ${id}`;
        let user = (await pool.query(query)).rows[0];
        return user;
    }
    async updateUser(updatingUser: object, id: string) {
        let queryStuff = extraService.generateUpdateQueryToInsert(
            updatingUser,
            id
        );
        let query = queryStuff.query;
        let values = queryStuff.values;

        let updatedUser = (await pool.query(query, values)).rows[0];
        return updatedUser;
    }
    async deleteUser(id: string) {
        pool.query("DELETE FROM users WHERE id = " + id)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }
}

export default new userService();
