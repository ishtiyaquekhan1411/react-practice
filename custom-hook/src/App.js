import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  const transformedTask = (taskData) => {
    const loadedTasks = [];

    for (const taskKey in taskData) {
      loadedTasks.push({ id: taskKey, text: taskData[taskKey].text });
    }
    setTasks(loadedTasks);
  }

  useEffect(() => {
    sendRequest({url: 'https://react-http-6b4a6.firebaseio.com/tasks.json'}, transformedTask)
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
