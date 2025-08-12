import PropTypes from 'prop-types'

const styles = {
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  label: {
    fontWeight: 600,
    color: '#212529',
    marginBottom: '8px',
    fontSize: '0.95rem',
  },
  input: {
    background: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '1rem',
    color: '#495057',
    outline: 'none',
    transition: 'all 0.2s ease',
  },
  inputFocus: {
    background: 'white',
    borderColor: '#6366f1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
  },
  textarea: {
    background: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '1rem',
    color: '#495057',
    outline: 'none',
    transition: 'all 0.2s ease',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: '0.85rem',
    marginTop: '6px',
  }
};

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textArea
}) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field)
        
    }

    const handleOnBlur = (event) => {
        onBlurHandler(event.target.value, field)
    }

  return (
    <div style={styles.formGroup}>
        <label style={styles.label}>
            {label}
        </label>
        {textArea ? (
            <textarea
                type={type}
                value={value}
                onChange={handleValueChange}
                rows={5}
                style={styles.textarea}
                onFocus={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.background = '#f8f9fa';
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                  handleOnBlur(e);
                }}
            />
        ):(
            <input
                type={type}
                value={value}
                onChange={handleValueChange}
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.background = '#f8f9fa';
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                  handleOnBlur(e);
                }}
            />
        )}
        {showErrorMessage && validationMessage && (
          <span style={styles.errorMessage}>
              {validationMessage}
          </span>
        )}
    </div>
  )
}

Input.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string.isRequired,
    onBlurHandler: PropTypes.func.isRequired,
    textArea: PropTypes.bool
}

Input.defaultProps = {
    textArea: false
}