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
var errorMsgEl = document.getElementById("errorMsgArea");

// Local
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

if (errorMsgEl) {
    errorMsgEl.addEventListener("click", hideNotification, false);
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
        errorMsgEl.innerHTML = "<p id='errorMsgArea'>Please enter a task and select a due date <span>(Click to hide)</span></p>";
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

function hideNotification(e){
    errorMsgEl.innerHTML = "<p id='errorMsgAreaHide'></p>";
}

function updateTask() {
    let id = document.getElementById("id_no").value;
    let body = document.getElementById("task_update").value;
    let deadline = document.getElementById("deadline_update").value;

    if (body === '' || deadline === '') {
        document.getElementById("errorMsg").innerHTML = "<p id='errorMsgArea'>Please enter a task and select a due date</p>";
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
                var lateTasks = false;
                var jsonData = JSON.parse(xmlhttp.responseText);
                for (var i = 0; i < jsonData.length; i++) {
                    // Date format
                    var months = ['', 'january', 'february', 'mars', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
                    var taskDay = jsonData[i].deadline.slice(-2);
                    var taskMonth = jsonData[i].deadline.slice(5, 7);
                    var taskYear = jsonData[i].deadline.slice(0, 4)

                    // Article element structure
                    var taskBody = "<p>" + jsonData[i].body + "</p>" +
                        "<button class='deleteButton' id='" + jsonData[i].ID + "'></button>" +
                        "<a href='index.php?id=" + jsonData[i].ID + "&body=" + jsonData[i].body + "&deadline=" + jsonData[i].deadline + "'><button class='updateButton'></button></a>" +
                        "</article>";

                    // The first iteration
                    // Determine if the task is scheduled today, tomorrow or neither
                    if (i === 0) {
                        if (year + "-" + month + "-" + today === jsonData[i].deadline) {
                            taskListWrapperEl.innerHTML += "<h2 class='today'>Today</h2>";


                        } else if (year + "-" + month + "-" + tomorrow === jsonData[i].deadline) {
                            taskListWrapperEl.innerHTML += "<h2>Tomorrow</h2>";

                        } else {
                            // Printing date format
                            if (taskDay <= 9) {
                                taskListWrapperEl.innerHTML += "<h2>" + months[taskMonth] + " " + taskDay.slice(1) + ", " + taskYear;
                            } else {
                                taskListWrapperEl.innerHTML += "<h2>" + months[taskMonth] + " " + taskDay + ", " + taskYear;
                            }
                        }
                    }

                    // All other iterations
                    // Determine if it's a new date
                    // Duplicate dates are not printed out and are grouped together under one headline
                    // Determine if the task is scheduled today, tomorrow or neither
                    if (i > 0 && jsonData[i].deadline != jsonData[i - 1].deadline) {
                        if (year + "-" + month + "-" + today === jsonData[i].deadline) {
                            taskListWrapperEl.innerHTML += "<h2 class='today'>Today</h2>";

                        } else if (year + "-" + month + "-" + tomorrow === jsonData[i].deadline) {
                            taskListWrapperEl.innerHTML += "<h2>Tomorrow</h2>";

                        } else {
                            // Printing date format
                            if (taskDay <= 9) {
                                taskListWrapperEl.innerHTML += "<h2>" + months[taskMonth] + " " + taskDay.slice(1) + ", " + taskYear;
                            } else {
                                taskListWrapperEl.innerHTML += "<h2>" + months[taskMonth] + " " + taskDay + ", " + taskYear;
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
                        lateTasks = true;

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

            // Late task notifier
            if(lateTasks === true){
                errorMsgEl.innerHTML = "<p id='errorMsg'>There are late tasks in your list <span>(Click to hide)</span></p>";
            }
        }
    };
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
}