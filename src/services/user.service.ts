import { IUser } from "../../types";
import pool from "../database";
import extraService from "./extra.service";

class UserService {
    async getUsers(): Promise<any[]> {
        try {
            const query = "SELECT * FROM users";
            const { rows: users } = await pool.query(query);
            return users;
        } catch (error) {
            throw {
                statusCode: 500,
                error: new Error("Failed to fetch users"),
            };
        }
    }

    async createUser(user: IUser): Promise<IUser> {
        const query =
            "INSERT INTO users (first_name, last_name, email, salary) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [
            user.first_name,
            user.last_name,
            user.email,
            user.salary,
        ];

        try {
            const createdUser = (await pool.query(query, values)).rows[0];
            return createdUser;
        } catch (error: any) {
            if (error.code === "23505") {
                throw {
                    statusCode: 400,
                    error: new Error("Duplicate keys are not allowed"),
                };
            }
            throw {
                statusCode: 500,
                error: new Error("Failed to create user"),
            };
        }
    }

    async getOneUser(id: string): Promise<IUser | null> {
        const query = `SELECT * FROM users WHERE id = $1`;
        try {
            const user = (await pool.query(query, [id])).rows[0];
            if (!user) {
                throw {
                    statusCode: 404,
                    error: new Error("User not found"),
                };
            }
            return user;
        } catch (error) {
            throw {
                statusCode: 500,
                error: new Error("Failed to fetch user"),
            };
        }
    }

    async updateUser(updatingUser: Partial<IUser>, id: string): Promise<IUser> {
        try {
            const queryStuff = extraService.generateUpdateQueryToInsert(
                updatingUser,
                id
            );
            const query = queryStuff.query;
            const values = queryStuff.values;

            const updatedUser = (await pool.query(query, values)).rows[0];

            if (!updatedUser) {
                throw {
                    statusCode: 404,
                    error: new Error("User not found"),
                };
            }
            return updatedUser;
        } catch (error: any) {
            throw {
                statusCode: error.statusCode,
                error: new Error(error.error.message),
            };
        }
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
                id,
            ]);
            if (result.rowCount === 0) {
                throw {
                    statusCode: 404,
                    error: new Error("User not found"),
                };
            }
            return true;
        } catch (error) {
            throw {
                statusCode: 500,
                error: new Error("Failed to delete user"),
            };
        }
    }
}

export default new UserService();
