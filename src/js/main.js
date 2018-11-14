// Mattias Bygdeson
// maby0801@student.miun.se
// DT173G Webbutveckling III
// Mittuniversitetet

"use strict";

// VARIABLES
var taskListEl = document.getElementById("taskList");
var addEl = document.getElementById("add");
var updateEl = document.getElementById("update");
var taskListWrapperEl = document.getElementById("taskListWrapper");
var URL = "http://localhost/(DT173G)%20Webbutveckling%20III/Projektarbete/webbplats/pub/webservice-mytodolist.php/posts"

// EVENT LISTENERS
if (taskListWrapperEl) {
    document.addEventListener("DOMContentLoaded", getTask, false);
}

if (taskListWrapperEl) {
    taskListWrapper.addEventListener("click", deleteTask, false);
}

if (addEl) {
    addEl.addEventListener("click", addTask, false);
}

if (updateEl) {
    updateEl.addEventListener("click", updateTask, false);
}

// FUNCTIONS
function deleteTask(e) {
    if (e.target.id != "") {
        if(e.target.tagName != 'BUTTON') {
            return;
        }
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("DELETE", URL + "/" + e.target.id, true);
        xmlhttp.send();

        xmlhttp.onload = function () {
            location.reload();
        }
    }
}

function addTask() {
    let body = document.getElementById("task").value;
    let deadline = document.getElementById("deadline").value;

    // if( !(body != '' && deadline != '') ) location.reload();

    if (body === '' || deadline === '') {
        document.getElementById("errorMsg").innerHTML = "<p>Please enter a task and select a due date</p>";
    } else {
        // Store data
        let json = { "body": body, "deadline": deadline };

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", URL, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(json));

        xmlhttp.onload = function () {
            // location.reload();
            window.location.replace('index.php');
        }
    }
}

function updateTask() {
    let id = document.getElementById("id_no").value;
    let body = document.getElementById("task_update").value;
    let deadline = document.getElementById("deadline_update").value;

    if (body === '' || deadline === '') {
        document.getElementById("errorMsg").innerHTML = "<p>Please enter a task and select a due date</p>";
    } else {
        // Store data
        let json = { "body": body, "deadline": deadline };

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("PUT", URL + "/" + id, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(json));

        xmlhttp.onload = function () {
            // location.reload();
            window.location.replace('index.php');
        }
    }
}

function getTask() {
    var date = new Date();
    var today = date.getDate();
    var yesterday = date.getDate() - 1;
    var tomorrow = date.getDate() + 1;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    // var currentDate = date.getDate() + "-" + mm + "-" + date.getFullYear();
    // console.log(currentDate);

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {

                var jsonData = JSON.parse(xmlhttp.responseText);
                for (var i = 0; i < jsonData.length; i++) {
                    // Date format
                    var months = ['', 'january', 'february', 'mars', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                    var taskDay = jsonData[i].deadline.slice(-2);
                    var taskMonth = jsonData[i].deadline.slice(5, 7);
                    var taskYear = jsonData[i].deadline.slice(0, 4)

                    // Article element structure
                    var taskBody = jsonData[i].body +
                        "<a href='update.php?id=" + jsonData[i].ID + "&body=" + jsonData[i].body + "&deadline=" + jsonData[i].deadline + "'><button>Update</button></a>" +
                        "<button id='" + jsonData[i].ID + "'>Delete #" + jsonData[i].ID + "</button>" +
                        "</article>";

                    // The first iteration
                    // Determine if the task is scheduled today, tomorrow or neither
                    if (i === 0) {
                        if (year + "-" + month + "-" + today === jsonData[i].deadline) {
                            taskListWrapperEl.innerHTML += "<h3>Today</h3>";


                        } else if (year + "-" + month + "-" + tomorrow === jsonData[i].deadline) {
                            taskListWrapperEl.innerHTML += "<h3>Tomorrow</h3>";

                        } else {
                            // Printing date format
                            if (taskDay <= 9) {
                                taskListWrapperEl.innerHTML += "<h3>" + months[taskMonth] + " " + taskDay.slice(1) + ", " + taskYear;
                            } else {
                                taskListWrapperEl.innerHTML += "<h3>" + months[taskMonth] + " " + taskDay + ", " + taskYear;
                            }
                        }
                    }

                    // All other iterations
                    // Determine if it's a new date
                    // Duplicate dates are not printed out and are grouped together under one headline
                    // Determine if the task is scheduled today, tomorrow or neither
                    if (i > 0 && jsonData[i].deadline != jsonData[i - 1].deadline) {
                        if (year + "-" + month + "-" + today === jsonData[i].deadline) {
                            taskListWrapperEl.innerHTML += "<h3>Today</h3>";

                        } else if (year + "-" + month + "-" + tomorrow === jsonData[i].deadline) {
                            taskListWrapperEl.innerHTML += "<h3>Tomorrow</h3>";

                        } else {
                            // Printing date format
                            if (taskDay <= 9) {
                                taskListWrapperEl.innerHTML += "<h3>" + months[taskMonth] + " " + taskDay.slice(1) + ", " + taskYear;
                            } else {
                                taskListWrapperEl.innerHTML += "<h3>" + months[taskMonth] + " " + taskDay + ", " + taskYear;
                            }
                        }
                    }

                    // Creating article elements
                    if (year + "-" + month + "-" + today === jsonData[i].deadline) {
                        taskListWrapperEl.innerHTML += "<article class='today'>" +
                            taskBody;

                    } else if (year + "-" + month + "-" + tomorrow === jsonData[i].deadline) {
                        taskListWrapperEl.innerHTML += "<article class='tomorrow'>" +
                            taskBody;

                    } else if (today > taskDay && month >= taskMonth && year >= taskYear) {
                        taskListWrapperEl.innerHTML += "<article class='late'>" +
                            taskBody;

                    } else {
                        taskListWrapperEl.innerHTML += "<article>" +
                            taskBody;
                    }

                    // DEADLINE YEAR    jsonData[i].deadline.slice(0, 4);
                    // DEADLINE MONTH   jsonData[i].deadline.slice(5, 7);
                    // DEADLINE DAY     jsonData[i].deadline.slice(-2);
                }
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
}