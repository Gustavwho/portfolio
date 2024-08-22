import React from 'react';
import TodoCard from './TodoCard';

export default function TodoList({ todos, deleteTodo, editTodo, toggleEdit }) {
  return (
    <div className="todoList">
      {todos.map(todo => (
        <TodoCard 
          key={todo.id} 
          todo={todo} 
          deleteTodo={deleteTodo} 
          editTodo={editTodo} 
          toggleEdit={toggleEdit}
        />
      ))}
    </div>
  );
}

