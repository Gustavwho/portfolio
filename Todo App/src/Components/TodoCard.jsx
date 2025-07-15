import React, { useState } from 'react';

export default function TodoCard({ todo, deleteTodo, editTodo, toggleEdit }) {
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    editTodo(todo.id, newText);
  };

  return (
    <div className="todoCard">
      {todo.isEditing ? (
        <input 
          type="text" 
          value={newText} 
          onChange={(e) => setNewText(e.target.value)} 
          onBlur={handleEdit}
        />
      ) : (
        <span onClick={() => toggleEdit(todo.id)}>{todo.text}</span>
      )}
      <div className="todoCardButtons">
        {todo.isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <button onClick={() => toggleEdit(todo.id)}>Edit</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
}