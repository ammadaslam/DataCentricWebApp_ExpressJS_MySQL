var express = require('express')
//var mysql = require('promise-mysql')
var mySQLDAO = require('./mySQLDAO')

var app = express()

//set engine ejs
app.set('view engine', 'ejs')


//Get request will get data from getstudent() in this function database in connected with app via mysql package
app.get('/', (req, res) => {
    mySQLDAO.getStudents()

        .then((result) => {
            console.log(result)
            res.render('showStudents', { students: result })

        })
        .catch((error) => {
            res.send(error)

        })

})
//http Get request method student route
app.get('/students/:student', (req, res) => {
    mySQLDAO.getStudent(req.params.student)
        .then((result) => {
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send("<h3> No such student with id :" + req.params.student)
            }
        })
        .catch((error) => {
            console.log(" Not Ok")
            res.send(error)

        })

})

app.get('/colleges/:college', (req, res) => {
    mySQLDAO.deleteCollege(req.params.college)
        .then((result) => {
            if (result.affectedRows == 0) {
                res.send("<h3>College:" + req.params.college + " doesn't exists</h3>")
            } else {
                res.send("<h3>College:" + req.params.college + "delete")
            }
        })
        .catch((error) => {
            res.send("<h3>Error:" + error.errno + " cannot delete college with ID:" + req.params.college + "as it has associated courses</h3>")

        })

})


app.listen(3004, () => {
    console.log("Listening on port 3004")
})

