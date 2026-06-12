import React from "react";

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "An error occurred while loading the data", 
  error = null,
  onRetry 
}) => {
  return (
    <div className="error-state">
      <div className="error-state-icon">⚠️</div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-message">{message}</p>
      {error && (
        <details className="error-state-details">
          <summary>Error details</summary>
          <pre>{typeof error === 'string' ? error : error.message}</pre>
        </details>
      )}
      {onRetry && (
        <button className="error-state-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;