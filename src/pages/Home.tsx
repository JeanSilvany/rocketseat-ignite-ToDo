import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    if (tasks.find((element) => element.title === newTaskTitle)) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [{ text: "OK" }]
      );
    } else {
      setTasks((oldState) => [...oldState, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const results = updatedTasks.find((element) => element.id === id);

    if (results) {
      results.done = !results.done;
      setTasks(updatedTasks);
    }
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const results = updatedTasks.find(
      (element) => element.id === taskId || element.title === taskNewTitle
    );

    if (results) {
      results.title = taskNewTitle;
      setTasks(updatedTasks);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
