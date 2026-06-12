import React from "react";

const EmptyState = ({ 
  title = "No data found", 
  message = "Try adjusting your search or filter", 
  icon = "📦",
  actionText,
  onAction 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionText && onAction && (
        <button className="empty-state-button" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;