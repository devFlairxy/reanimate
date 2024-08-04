import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ListItem from '@/components/ListItem';

const TITLES = [
  'Watch React Native Tutorials 🎥',
  'Build a couple of project on React Native 🧑🏾‍💻',
  'Learn react native animations',
  'Build animation projects',
  'Build animation projects',
  'Build animation projects',
  'Build animation projects',
  'Build animation projects',
  'Build animation projects',
  'Build animation projects',
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));
const BACKGROUND_COLOR = '#FAFBFF';

const SwipeToDelete = () => {
  const [tasks, setTasks] = useState(TASKS);
  const handleDismiss = (currentTask: TaskInterface) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.index !== currentTask.index)
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <ScrollView>
        {tasks.map((task) => (
          <ListItem
            task={task}
            key={task.index}
            handleDismiss={(task_) => handleDismiss(task_)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%',
  },
});

export default SwipeToDelete;
