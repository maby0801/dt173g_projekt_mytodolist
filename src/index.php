<!DOCTYPE html>
<html lang="sv">
<head>
    <title>myTodoList</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.min.css">
</head>

<body>
    <div id="errorMsg">
        <!-- Notifications will be displayed here -->
        <p>This is a notification! <span>(Click to hide)</span></p>
    </div>
    <div id="wrapper">
        <header>
            <h1>myTodoList</h1>
        </header>
        
        <main>
            <div id="taskListForm">
                <p>Task</p>
                <input type="text" id="task" placeholder="describe your task..." /><br />
                <p>Enter a due date</p>
                <input type="date" id="deadline" placeholder="Deadline" /><br />
                <button id="add">Add task</button>
            </div>

            <div id="taskListWrapper">
                <!-- Tasks will be displayed here -->
            </div>
        </main>
    </div><!-- #wrapper -->

<script src="js/main.min.js"></script>
</body>

</html>