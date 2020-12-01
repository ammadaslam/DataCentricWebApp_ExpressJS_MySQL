var mysql = require('promise-mysql')



//pool connection for multiple users to acces resourse
var pool
mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'studentdb3'
})
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
    });
//Function students will return all students in the table
var getStudents = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from student_table')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })

    })
}
//Function students will return student with specific id
var getStudent = function (student_id) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'select * from student_table where student_id = ?',
            values: [student_id]

        }
            pool.query(myQuery)
                .then((result) => {
                    resolve(result)

                })
                .catch((error) => {     
                    reject(error)

                })

        })
        }

//Function will delete college id num
var deleteCollege = function (college_id) {
    return new Promise((resolve, reject) => {

        var myQuery = {
            sql: 'delete from college_table where college_id = ?',
            values: [college_id]
        }
        pool.query(myQuery)
            .then((result) => {
                resolve(result)

            })
            .catch((error) => {
                reject(error)

            })



    })
}

module.exports = { getStudents, getStudent, deleteCollege }


//(package promise-mysql) db and app are link together via promise my sql package
//npm install promise-mysql
//npm install ejs