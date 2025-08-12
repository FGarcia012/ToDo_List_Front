import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';const styles = {
  taskFormContainer: {
    background: 'white',
    borderRadius: '16px',
    padding: '0',
    marginBottom: '0',
    boxShadow: 'none',
    border: 'none',
  },
  taskFormHeader: {
    marginBottom: '0',
    textAlign: 'center',
  },
  taskFormTitle: {
    color: '#212529',
    fontSize: '1.3rem',
    fontWeight: 600,
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  taskForm: {
    maxWidth: '100%',
  },
  formRow: {
    marginBottom: '20px',
  },
  formRowSplit: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
  },
  prioritySelect: {
    background: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '1rem',
    color: '#495057',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    appearance: 'none',
    paddingRight: '40px',
    backgroundImage: 'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23666" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>\')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '12px',
  },
  fieldHelp: {
    color: '#6b7280',
    fontSize: '0.8rem',
    marginTop: '6px',
    fontStyle: 'italic',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #f1f3f4',
  },
  btnCancel: {
    background: '#f8f9fa',
    color: '#6c757d',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  btnSubmit: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    minWidth: '140px',
  },
  btnSubmitDisabled: {
    background: '#adb5bd',
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  authFormLabel: {
    marginBottom: '8px',
    color: '#374151',
    fontWeight: 500,
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};

export const TaskForm = ({ 
  task = null, 
  onSubmit, 
  onCancel, 
  isLoading = false, 
  mode = 'create',
  showTitle = true
}) => {
  const [formState, setFormState] = useState({
    title: { 
      value: '', 
      isValid: true, 
      showError: false 
    },
    status: { 
      value: 'Incomplete', 
      isValid: true, 
      showError: false 
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormState({
        title: {
          value: task.title || '',
          isValid: true,
          showError: false
        },
        status: {
          value: task.status || 'Incomplete',
          isValid: true,
          showError: false
        }
      });
    }
  }, [task, mode]);

  const handleInputValueChange = (value, field) => {
    setFormState(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        showError: false,
        isValid: true
      }
    }));
  };

  const handleInputBlur = (value, field) => {
    const isValid = validateField(field, value);
    setFormState(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        isValid,
        showError: !isValid
      }
    }));
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'title':
        return value.trim().length >= 1;
      case 'status':
        return ['Incomplete', 'Complete'].includes(value);
      default:
        return true;
    }
  };

  const isFormValid = () => {
    const requiredFields = ['title'];
    return requiredFields.every(field => 
      formState[field].value.trim() !== '' && validateField(field, formState[field].value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      const updatedState = { ...formState };
      Object.keys(updatedState).forEach(field => {
        const isValid = validateField(field, updatedState[field].value);
        updatedState[field] = {
          ...updatedState[field],
          isValid,
          showError: !isValid && (field === 'title') 
        };
      });
      setFormState(updatedState);
      return;
    }

    setIsSubmitting(true);
    
    const taskData = {
      title: formState.title.value.trim(),
      status: formState.status.value
    };

    try {
      const success = await onSubmit(taskData);
      if (success && mode === 'create') {
        resetForm();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormState({
      title: { value: '', isValid: true, showError: false },
      status: { value: 'Incomplete', isValid: true, showError: false }
    });
  };

  const handleCancel = () => {
    if (mode === 'create') {
      resetForm();
    }
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div style={styles.taskFormContainer}>
      {showTitle && (
        <div style={styles.taskFormHeader}>
          <h2 style={styles.taskFormTitle}>
            {mode === 'edit' ? 'Editar Tarea' : 'Nueva Tarea'}
          </h2>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.taskForm}>
        <div style={styles.formRow}>
          <div style={styles.formField}>
            <Input
              field="title"
              label="Título *"
              value={formState.title.value}
              onChangeHandler={handleInputValueChange}
              onBlurHandler={handleInputBlur}
              type="text"
              showErrorMessage={formState.title.showError}
              validationMessage="El título es requerido"
            />
          </div>
        </div>

        <div style={styles.formRow}>
          <div style={styles.formField}>
            <div style={styles.authFormLabel}>
              <span>Estado</span>
            </div>
            <select
              value={formState.status.value}
              onChange={(e) => handleInputValueChange(e.target.value, 'status')}
              style={styles.prioritySelect}
              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
        </div>

        <div style={styles.formActions}>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              ...styles.btnCancel,
              ...(isSubmitting || isLoading ? { opacity: 0.5, cursor: 'not-allowed' } : {})
            }}
            disabled={isSubmitting || isLoading}
            onMouseEnter={(e) => !e.target.disabled && (e.target.style.background = '#e5e7eb')}
            onMouseLeave={(e) => !e.target.disabled && (e.target.style.background = '#f3f4f6')}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            style={{
              ...styles.btnSubmit,
              ...(!isFormValid() || isSubmitting || isLoading ? styles.btnSubmitDisabled : {})
            }}
            disabled={!isFormValid() || isSubmitting || isLoading}
            onMouseEnter={(e) => !e.target.disabled && (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !e.target.disabled && (e.target.style.transform = 'translateY(0)')}
          >
            {isSubmitting || isLoading ? (
              <div style={styles.loadingText}>
                {mode === 'edit' ? 'Actualizando...' : 'Creando...'}
              </div>
            ) : (
              mode === 'edit' ? 'UpdateTask' : 'AddTask'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    tid: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  isLoading: PropTypes.bool,
  mode: PropTypes.oneOf(['create', 'edit']),
  showTitle: PropTypes.bool,
};
