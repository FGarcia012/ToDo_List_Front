import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { Modal } from '../Modal';

const styles = {
  taskListContainer: {
    width: '95%',
    maxWidth: '1400px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '4px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    minHeight: '80vh',
  },
  taskListHeader: {
    background: 'white',
    padding: '30px 30px 20px 30px',
    borderBottom: '1px solid #f1f3f4',
  },
  taskControlsTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0',
    flexWrap: 'wrap',
    gap: '20px',
  },
  addTaskBtn: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '15px 30px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '140px',
    justifyContent: 'center',
  },
  addTaskBtnActive: {
    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
  },
  addTaskBtnDisabled: {
    background: '#9ca3af',
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
  taskStats: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  statItem: {
    fontSize: '0.9rem',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  taskControlsFilters: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    minWidth: '200px',
  },
  searchInput: {
    width: '100%',
    background: '#f9fafb',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '0.95rem',
    color: '#374151',
    outline: 'none',
    transition: 'all 0.2s ease',
    paddingRight: '40px',
  },
  clearSearch: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#6b7280',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '2px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
  },
  filterSelect: {
    background: '#9ca3af',
    border: '1px solid #6b7280',
    borderRadius: '2px',
    padding: '12px 40px 12px 16px',
    fontSize: '0.95rem',
    color: 'white',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    appearance: 'none',
    minWidth: '120px',
    backgroundImage: 'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23ffffff" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>\')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '12px',
  },
  taskListContent: {
    padding: '0',
    maxHeight: '75vh',
    overflowY: 'auto',
    minHeight: '600px',
  },
  loadingState: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px auto',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 30px',
    color: '#6c757d',
    fontSize: '1.1rem',
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '20px',
    opacity: 0.7,
  },
  emptyStateH3: {
    color: '#6c757d',
    fontSize: '1.1rem',
    fontWeight: 400,
    margin: '0',
  },
  emptyStateP: {
    color: '#6b7280',
    fontSize: '1rem',
    margin: '0 0 20px 0',
    lineHeight: 1.5,
  },
  clearFiltersBtn: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tasksGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    background: '#f3f4f6',
    padding: '20px',
  },
  titleHeader: {
    textAlign: 'center',
    padding: '40px 30px 20px 30px',
    background: 'white',
    borderBottom: '1px solid #f1f3f4',
  },
  titleStyle: {
    fontSize: '3rem',
    fontWeight: 700,
    color: '#374151',
    margin: '0',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  simplifiedControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    background: 'white',
    borderBottom: '1px solid #f1f3f4',
  },
  taskListContentWithBorder: {
    padding: '0',
    maxHeight: '75vh',
    overflowY: 'auto',
    background: '#f3f4f6',
    border: '3px solid #9ca3af',
    borderRadius: '2px',
    margin: '20px',
    boxShadow: 'inset 0 0 0 2px #f3f4f6',
    minHeight: '600px',
  },
};

export const TaskList = ({ 
  tasks = [], 
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
  isLoading = false,
  isCreating = false,
  isUpdating = false,
  deletingTaskId = null,
  showTitle = false
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    if (searchTerm.trim()) {
      filtered = filtered.filter(task => 
        (task.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (filter) {
      case 'completed':
        filtered = filtered.filter(task => task.status === 'Complete');
        break;
      case 'pending':
        filtered = filtered.filter(task => task.status === 'Incomplete');
        break;
      default:
        break;
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'status':
          if (a.status === 'Complete' && b.status === 'Incomplete') return 1;
          if (a.status === 'Incomplete' && b.status === 'Complete') return -1;
          return 0;
        
        default:
          const aCreated = new Date(a.createdAt || a.updatedAt || 0);
          const bCreated = new Date(b.createdAt || b.updatedAt || 0);
          return bCreated - aCreated;
      }
    });

    return sorted;
  }, [tasks, filter, sortBy, searchTerm]);

  const handleCreateTask = async (taskData) => {
    const success = await onCreateTask(taskData);
    if (success) {
      setShowForm(false);
    }
    return success;
  };

  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return false;
    
    const taskId = editingTask._id || editingTask.tid;
    const success = await onUpdateTask(taskId, taskData);
    if (success) {
      setEditingTask(null);
      setShowForm(false);
    }
    return success;
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleToggleForm = () => {
    if (showForm && editingTask) {
      setEditingTask(null);
    }
    setShowForm(!showForm);
  };

  const getFilterCounts = () => {
    const completed = tasks.filter(task => task.status === 'Complete').length;
    const pending = tasks.filter(task => task.status === 'Incomplete').length;
    return { total: tasks.length, completed, pending };
  };

  const counts = getFilterCounts();

  return (
    <>
      <div style={styles.taskListContainer}>
      {/* Title Header */}
      {showTitle && (
        <div style={styles.titleHeader}>
          <h1 style={styles.titleStyle}>TODO LIST</h1>
        </div>
      )}

      {/* Simplified controls */}
      <div style={styles.simplifiedControls}>
        <button 
          style={{
            ...styles.addTaskBtn,
            ...(isLoading ? styles.addTaskBtnDisabled : {})
          }}
          onClick={handleToggleForm}
          disabled={isLoading}
          onMouseEnter={(e) => !e.target.disabled && (e.target.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => !e.target.disabled && (e.target.style.transform = 'translateY(0)')}
        >
          Add Task
        </button>

        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={styles.filterSelect}
          onFocus={(e) => e.target.style.borderColor = '#6b7280'}
          onBlur={(e) => e.target.style.borderColor = '#6b7280'}
        >
          <option value="all">ALL</option>
          <option value="pending">Incomplete</option>
          <option value="completed">Complete</option>
        </select>
      </div>

      {/* Tasks Content */}
      <div style={showTitle ? styles.taskListContentWithBorder : styles.taskListContent}>
        {isLoading ? (
          <div style={styles.loadingState}>
            <div style={styles.loadingSpinner}></div>
            <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>Cargando tareas...</p>
          </div>
        ) : filteredAndSortedTasks.length === 0 ? (
          <div style={styles.emptyState}>
            {searchTerm ? (
              <>
                <div style={styles.emptyIcon}>🔍</div>
                <h3 style={styles.emptyStateH3}>No se encontraron tareas</h3>
                <p style={styles.emptyStateP}>No hay tareas que coincidan con "{searchTerm}"</p>
                <button 
                  style={styles.clearFiltersBtn}
                  onClick={() => setSearchTerm('')}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Limpiar búsqueda
                </button>
              </>
            ) : filter !== 'all' ? (
              <>
                <div style={styles.emptyIcon}>📝</div>
                <h3 style={styles.emptyStateH3}>No hay tareas {filter === 'completed' ? 'completadas' : 'pendientes'}</h3>
                <p style={styles.emptyStateP}>Cambia el filtro para ver más tareas</p>
                <button 
                  style={styles.clearFiltersBtn}
                  onClick={() => setFilter('all')}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Ver todas las tareas
                </button>
              </>
            ) : (
              <>
                <div style={styles.emptyIcon}>📋</div>
                <h3 style={styles.emptyStateH3}>No Todo Found</h3>
                <p style={styles.emptyStateP}>Crea tu primera tarea para empezar a organizarte</p>
                <button 
                  style={styles.clearFiltersBtn}
                  onClick={() => setShowForm(true)}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Crear primera tarea
                </button>
              </>
            )}
          </div>
        ) : (
          <div style={styles.tasksGrid}>
            {filteredAndSortedTasks.map((task) => (
              <TaskCard
                key={task._id || task.tid}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
                onEdit={handleEditTask}
                isDeleting={deletingTaskId === (task._id || task.tid)}
              />
            ))}
          </div>
        )}
      </div>
      </div>

      {/* Modal for Task Form */}
      <Modal
        isOpen={showForm}
        onClose={handleCancelForm}
        title={editingTask ? "Update task" : "Add Task"}
        size="small"
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={handleCancelForm}
          isLoading={isCreating || isUpdating}
          mode={editingTask ? 'edit' : 'create'}
          showTitle={false}
        />
      </Modal>
    </>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array,
  onCreateTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isCreating: PropTypes.bool,
  isUpdating: PropTypes.bool,
  deletingTaskId: PropTypes.string,
  showTitle: PropTypes.bool,
};
