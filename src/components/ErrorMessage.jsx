import React from "react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-banner" role="alert">
      <p>
        <strong>Couldn't complete that request.</strong> {message}
      </p>
      {onRetry && (
        <button type="button" className="btn btn--ghost" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
