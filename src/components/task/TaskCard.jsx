import React, { useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
  taskCard: {
    background: 'white',
    borderBottom: '1px solid #e9ecef',
    padding: '25px 40px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    transition: 'all 0.2s ease',
    position: 'relative',
    margin: '2px',
    borderRadius: '2px',
  },
  taskCardCompleted: {
    background: '#fafbfc',
    opacity: 1,
  },
  taskCardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
  },
  taskCheckboxWrapper: {
    flexShrink: 0,
    marginTop: '4px',
  },
  taskCheckbox: {
    width: '20px',
    height: '20px',
    border: '2px solid #dee2e6',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskMainContent: {
    flex: 1,
    minWidth: 0,
  },
  taskTitle: {
    margin: '0 0 8px 0',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#212529',
    lineHeight: 1.4,
    wordWrap: 'break-word',
  },
  taskTitleCompleted: {
    textDecoration: 'line-through',
    color: '#6c757d',
    opacity: 0.7,
  },
  taskMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
    flexWrap: 'wrap',
  },
  taskPriority: {
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  taskDate: {
    fontSize: '0.85rem',
    color: '#6c757d',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  taskDescription: {
    margin: '12px 0 0 0',
    color: '#4b5563',
    fontSize: '0.95rem',
    lineHeight: 1.5,
    padding: '12px',
    background: '#f9fafb',
    borderRadius: '6px',
    borderLeft: '3px solid #e5e7eb',
  },
  taskActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  },
  taskActionBtn: {
    background: '#9ca3af',
    border: '1px solid #6b7280',
    padding: '10px',
    borderRadius: '2px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    minWidth: '36px',
    minHeight: '36px',
  },
  taskActionBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  taskTags: {
    marginTop: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  taskTag: {
    background: '#e0e7ff',
    color: '#3730a3',
    fontSize: '0.75rem',
    fontWeight: 500,
    padding: '4px 8px',
    borderRadius: '12px',
    textTransform: 'lowercase',
  },
};

export const TaskCard = ({ 
  task, 
  onToggle, 
  onDelete, 
  onEdit, 
  isDeleting = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleComplete = () => {
    const newStatus = task.status === 'Complete' ? 'Incomplete' : 'Complete';
    onToggle(task._id || task.tid, newStatus);
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      onDelete(task._id || task.tid);
    }
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isCompleted = task.status === 'Complete';

  const cardStyle = {
    ...styles.taskCard,
    ...(isCompleted ? styles.taskCardCompleted : {}),
    ...(isHovered ? { background: '#fafbfc' } : {}),
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.taskCheckboxWrapper}>
        <div
          onClick={handleToggleComplete}
          style={{
            ...styles.taskCheckbox,
            backgroundColor: isCompleted ? '#6366f1' : 'white',
            borderColor: isCompleted ? '#6366f1' : '#dee2e6',
            cursor: isDeleting ? 'not-allowed' : 'pointer'
          }}
          disabled={isDeleting}
        >
          {isCompleted && <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>}
        </div>
      </div>
      
      <div style={styles.taskMainContent}>
        <h3 style={{
          ...styles.taskTitle,
          ...(isCompleted ? styles.taskTitleCompleted : {})
        }}>
          {task.title || 'Sin título'}
        </h3>
        
        <div style={styles.taskMeta}>
          <span
            style={{
              ...styles.taskPriority,
              color: isCompleted ? '#10b981' : '#6366f1'
            }}
          >
            {task.status}
          </span>
            
            {(task.createdAt || task.updatedAt) && (
              <span style={styles.taskDate}>
                {formatDate(task.updatedAt || task.createdAt)}
              </span>
            )}
          </div>
        </div>

      <div style={styles.taskActions}>
        <button
          style={{
            ...styles.taskActionBtn,
            ...(isDeleting ? styles.taskActionBtnDisabled : {})
          }}
          onClick={handleEdit}
          title="Editar tarea"
          disabled={isDeleting}
          onMouseEnter={(e) => !isDeleting && (e.target.style.background = '#6b7280')}
          onMouseLeave={(e) => !isDeleting && (e.target.style.background = '#9ca3af')}
        >
          ✏️
        </button>
        
        <button
          style={{
            ...styles.taskActionBtn,
            ...(isDeleting ? styles.taskActionBtnDisabled : {})
          }}
          onClick={handleDelete}
          title="Eliminar tarea"
          disabled={isDeleting}
          onMouseEnter={(e) => !isDeleting && (e.target.style.background = '#ef4444')}
          onMouseLeave={(e) => !isDeleting && (e.target.style.background = '#9ca3af')}
        >
          {isDeleting ? '⏳' : '🗑️'}
        </button>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    tid: PropTypes.string,
    title: PropTypes.string.isRequired,
    status: PropTypes.string,
    state: PropTypes.bool,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
};
