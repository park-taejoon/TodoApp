import React, {useState, useEffect} from 'react';
import DateHead from './components/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import AddTodo from './components/AddTodo';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import AsyncStorage from '@react-native-community/async-storage';

function App() {
  const today = new Date();

  const [todos, setTodos] = useState([
    {id: 1, text: '작업 환경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: true},
    {id: 3, text: '투두리스트 만들어보기', done: false},
  ]);

  useEffect(() => {
    console.log('컴포넌트가 마운트 될 때 출력됨');
    return () => {
      console.log('컴포넌트가 언마운트될 때 출력됨');
    };
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const rawTodos = await AsyncStorage.getItem('todos');
        const savedTodos = JSON.parse(rawTodos);
        setTodos(savedTodos);
      } catch (e) {
        console.log('Failed to load todos');
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function save() {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (e) {
        console.log('Failed to save todos');
      }
    }

    save();
  }, [todos]);

  const onInsert = function (text) {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const todo = {
      id: nextId,
      text,
      done: false,
    };

    setTodos(todos.concat(todo));
  };

  const onRemove = id => {
    const nextTodos = todos.filter(todo => todo.id !== id);
    setTodos(nextTodos);
  };

  const onToggle = function (id) {
    console.log('id', id);
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );

    setTodos(nextTodos);
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView edges={['bottom']} style={styles.block}>
          <KeyboardAvoidingView
            behavior={Platform.select({ios: 'padding'})}
            style={styles.avoid}>
            <DateHead date={today} />
            {todos.length === 0 ? (
              <Empty />
            ) : (
              <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
            )}
            <AddTodo onInsert={onInsert} />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1, backgroundColor: 'white'},
  avoid: {flex: 1},
});

export default App;
