const mysql = require("mysql");

// mysql --host=35.202.164.234 --user=root --password=subhojit-dey --database=user-details   

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "Database",
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
