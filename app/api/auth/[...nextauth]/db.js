// db.js

const mysql = require("mysql");

// mysql --host=35.202.164.234 --user=root --password=subhojit-dey --database=user-details   

const connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "BiH_Win_Diesel",
	connectTimeout: 20000,
});

module.exports = {
	query: (text, params) => {
		return new Promise((resolve, reject) => {
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
