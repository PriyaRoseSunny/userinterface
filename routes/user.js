var async = require("async");
var sortBy = require('lodash.sortby');
var userPagination = require('../pagination/generator');
var fs = require("fs");


var user = {
    userValidate: function (request, response) {

        fs.readFile('./sample.json', function (err, data) {
            if (err) { throw err };
            var users = JSON.parse(data);

            var userData = request.query;
            var userFilterDataList = [];
            async.each(users, function (user, callback) {

                if (userData.operator == "GREATERTHAN") {
                    if (user.age > userData.value) {
                        userFilterDataList.push(user);
                    }
                } else if (userData.operator == "LESSTHAN") {
                    if (user.age < userData.value) {
                        userFilterDataList.push(user);
                    }
                } else {
                    if (user.age == userData.value) {
                        userFilterDataList.push(user);
                    }
                }
                callback();
            }, function () {
                var userSortDataList = [];

                if (userData.age == "asc") {
                    var userSortDataList = sortBy(userFilterDataList, 'age');

                } else if (userData.age == "desc") {
                    var userSortDataList = sortBy(userFilterDataList, 'age').reverse();

                } else {
                    response.status(400);
                    response.json({
                        "message": "Invalid sort operator"
                    })
                }
                userData.userSortDataList = userSortDataList;

                userData.page = userSortDataList.length / userData.size;

                userPagination.paginator(userData, function (err, result) {

                    var outputData = JSON.stringify(result);
                    fs.writeFile('output.json', outputData, (err) => {
                        if (err) throw err;
                        console.log('Data written to file');

                        response.status(200);
                        response.json({
                            "userList": result
                        })
                    });

                });


            });

        });
    }
};

module.exports = user;