import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  TextInput,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { Task } from "./TasksList";
import trashIcon from "../assets/icons/trash/trash.png";
import PenEdit from "../assets/icons/edit/PenEdit.png";

interface TasksListProps {
  tasks: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

const TaskItem = ({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) => {
  const [edited, setEdited] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEdited(true);
  }

  function handleCancelEditing() {
    setTaskTitle(tasks.title);
    setEdited(false);
  }

  function handleSubmitEditing() {
    editTask(tasks.id, taskTitle);
    setEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (edited) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [edited]);

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(tasks.id)}
        >
          <View
            style={
              tasks.done === false ? styles.taskMarker : styles.taskMarkerDone
            }
          >
            {tasks.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            editable={edited}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={tasks.done === false ? styles.taskText : styles.taskTextDone}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {edited === false ? (
          <View
            style={{
              position: "absolute",
              width: 1,
              height: 24,
              backgroundColor: "rgba(196, 196, 196, 0.24)",
              left: 36,
            }}
          />
        ) : null}

        {edited === true ? (
          <Icon
            name="x"
            size={24}
            color={"#b2b2b2"}
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 48 }}
          />
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={PenEdit} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
        )}

        {edited === true ? (
          <View style={{ height: 24, width: 24 }} />
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={() =>
              Alert.alert(
                "Remover item",
                "Tem certeza que você deseja remover esse item?",
                [
                  {
                    text: "Não",
                    style: "cancel",
                  },
                  { text: "Sim", onPress: () => removeTask(tasks.id) },
                ]
              )
            }
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
