const API_URL = 'https://jsonplaceholder.typicode.com/todos'; // Example API

export const getTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTask = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (taskId, updatedTask) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });
  return response.json();
};

export const deleteTask = async (taskId) => {
  await fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
  });
};
