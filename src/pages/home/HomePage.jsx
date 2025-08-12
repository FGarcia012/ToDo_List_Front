import React from 'react'
import './HomePage.css'

export const HomePage = () => {
  return (
    <div className="homepage">
      <div className="todo-container">
        <h1 className="todo-title">TODO LIST</h1>
        
        <div className="todo-controls">
          <button className="add-task-btn">Add Task</button>
          <select className="filter-dropdown">
            <option value="all">ALL</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <div className="todo-content">
          <p className="no-todo-message">No Todo Found</p>
        </div>
      </div>
    </div>
  )
}
