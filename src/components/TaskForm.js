import React, { useState, useEffect } from 'react';

const TaskForm = ({ taskToEdit, onSave }) => {
  const [task, setTask] = useState({ name: '' });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask({ name: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
