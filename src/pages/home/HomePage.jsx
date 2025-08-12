import React from 'react';
import { TaskList } from '../../components/task';
import { useTask } from '../../shared/hooks/useTask';

export const HomePage = () => {
  const {
    tasks,
    isFetching,
    isCreating,
    isUpdating,
    deletingTaskId,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus
  } = useTask();

  const handleCreateTask = async (taskData) => {
    return await createTask(taskData);
  };

  const handleUpdateTask = async (taskId, taskData) => {
    return await updateTask(taskId, taskData);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    return await toggleTaskStatus(taskId, currentStatus);
  };

  const homepageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
    padding: '40px 20px',
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    '@media (max-width: 768px)': {
      padding: '30px 15px'
    },
    '@media (max-width: 480px)': {
      padding: '20px 10px'
    }
  };

  const homepageHeaderStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '40px 20px',
    '@media (max-width: 768px)': {
      marginBottom: '30px',
      padding: '30px 15px'
    },
    '@media (max-width: 480px)': {
      marginBottom: '20px',
      padding: '20px 10px'
    }
  };

  const homepageTitleStyle = {
    color: 'white',
    fontSize: '3.5rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    margin: '0 0 15px 0',
    textTransform: 'uppercase',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    animation: 'fadeInDown 0.8s ease-out',
    '@media (max-width: 768px)': {
      fontSize: '2.5rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '2rem'
    }
  };

  const homepageSubtitleStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.2rem',
    fontWeight: 400,
    margin: '0',
    animation: 'fadeInUp 0.8s ease-out 0.2s both',
    '@media (max-width: 768px)': {
      fontSize: '1rem'
    },
    '@media (max-width: 480px)': {
      fontSize: '0.9rem'
    }
  };

  const applyResponsiveStyles = (baseStyle, mediaQueries) => {
    const windowWidth = window.innerWidth;
    let responsiveStyle = { ...baseStyle };

    if (windowWidth <= 480 && mediaQueries['@media (max-width: 480px)']) {
      responsiveStyle = { ...responsiveStyle, ...mediaQueries['@media (max-width: 480px)'] };
    } else if (windowWidth <= 768 && mediaQueries['@media (max-width: 768px)']) {
      responsiveStyle = { ...responsiveStyle, ...mediaQueries['@media (max-width: 768px)'] };
    }

    Object.keys(responsiveStyle).forEach(key => {
      if (key.startsWith('@media')) {
        delete responsiveStyle[key];
      }
    });

    return responsiveStyle;
  };

  return (
    <>
      <style>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div style={applyResponsiveStyles(homepageStyle, homepageStyle)}>
        <TaskList
          tasks={tasks}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
          isLoading={isFetching}
          isCreating={isCreating}
          isUpdating={isUpdating}
          deletingTaskId={deletingTaskId}
          showTitle={true}
        />
      </div>
    </>
  );
};
