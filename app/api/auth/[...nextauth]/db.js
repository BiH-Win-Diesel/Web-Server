// db.js

const mysql = require("mysql");
import { Connection } from "@google-cloud/cloud-sql-connector";

const clientOpts = await connector.getOptions({
	instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
	authType: "IAM",
});

const connection = mysql.createConnection({
	host: "35.202.164.234",
	user: "root",
	password: "subhojit-dey",
	database: "user-details",
	connectTimeout: 20000,
});

module.exports = {
	query: (text, params) => {
		return new Promise((resolve, reject) => {
			// For MySQL
			connection.query(text, params, (error, results) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});
	},
};
