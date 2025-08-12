import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
    animation: 'fadeIn 0.2s ease-out',
  },
  modalContent: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    animation: 'slideIn 0.3s ease-out',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  modalSmall: {
    maxWidth: '500px',
    width: '100%',
  },
  modalMedium: {
    maxWidth: '600px',
    width: '100%',
  },
  modalLarge: {
    maxWidth: '800px',
    width: '100%',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 30px 20px 30px',
    borderBottom: '1px solid #f1f3f4',
    position: 'sticky',
    top: 0,
    background: 'white',
    borderRadius: '16px 16px 0 0',
    zIndex: 1,
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#212529',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  modalCloseBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    color: '#6b7280',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
  },
  modalBody: {
    padding: '30px',
  },
};

export const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true,
  overlayClickClose = true 
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && overlayClickClose) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const getContentSize = () => {
    switch (size) {
      case 'small':
        return styles.modalSmall;
      case 'large':
        return styles.modalLarge;
      default:
        return styles.modalMedium;
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
      <div style={styles.modalOverlay} onClick={handleOverlayClick}>
        <div style={{
          ...styles.modalContent,
          ...getContentSize()
        }}>
          {(title || showCloseButton) && (
            <div style={styles.modalHeader}>
              {title && <h2 style={styles.modalTitle}>{title}</h2>}
              {showCloseButton && (
                <button 
                  style={styles.modalCloseBtn}
                  onClick={onClose}
                  title="Cerrar"
                  onMouseEnter={(e) => {
                    e.target.style.background = '#f3f4f6';
                    e.target.style.color = '#1f2937';
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'none';
                    e.target.style.color = '#6b7280';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  ×
                </button>
              )}
            </div>
          )}
          <div style={styles.modalBody}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showCloseButton: PropTypes.bool,
  overlayClickClose: PropTypes.bool,
};

export default Modal;
