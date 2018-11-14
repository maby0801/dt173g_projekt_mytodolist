<?php
    echo $_GET['body'];
?>

<!DOCTYPE html>
<html lang="sv">
<head>
    <title>myTodoList</title>
    <meta charset="utf-8">
</head>

<body>
    <div id="errorMsg">
        <!-- Notifications will be displayed here -->
    </div>
    <div>
        <input type="text" id="id_no" placeholder="Id number" size="3" value="<?php echo $_GET['id'] ?>"/><br />
        <input type="text" id="task_update" placeholder="Task" value="<?php echo $_GET['body'];?>"/><br />
        <input type="date" id="deadline_update" placeholder="Deadline" value="<?php echo $_GET['deadline'];?>"/><br />
        <button id="update">Update</button>
    </div>
    <script src="js/main.js"></script>
</body>

</html>