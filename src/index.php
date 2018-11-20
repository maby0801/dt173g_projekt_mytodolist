<!DOCTYPE html>
<html lang="sv">
<head>
    <title>myTodoList</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.min.css">
</head>

<body>
    <div id="errorMsgArea">
        <!-- Notifications will be displayed here -->
    </div>
    <div id="wrapper">
        <header>
            <h1><a href="index.php">myTodoList</a></h1>
        </header>
        
        <main>
            <?php
            if(isset($_GET['id'])){
                // Display update post form
                include('updatepost.php');
            } else {
                // Display add post form
                include('addpost.php');
            }
            ?>

            <div id="taskListWrapper">
                <!-- Tasks will be displayed here -->
            </div>
        </main>

<script src="js/main.min.js"></script>
</body>

</html>