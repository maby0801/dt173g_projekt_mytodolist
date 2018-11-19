<div id="taskListForm">
    <input type="text" id="id_no" placeholder="Id number" size="3" value="<?php echo $_GET['id'] ?>"/>
    <p>Task</p>
    <input type="text" id="task_update" placeholder="Task" value="<?php echo $_GET['body'];?>"/><br />
    <p>Enter a due date</p>
    <input type="date" id="deadline_update" placeholder="Deadline" value="<?php echo $_GET['deadline'];?>"/><br />
    <button id="update">Update</button>
    <button id="cancel">Cancel</button>
</div>