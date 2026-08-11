import React from "react";

export default function Loader({ count = 6 }) {
  return (
    <div className="card-grid" aria-busy="true" aria-label="Loading users">
      {Array.from({ length: count }).map((_, i) => (
        <div className="user-card skeleton-card" key={i}>
          <div className="skeleton-line skeleton-tab" />
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line skeleton-line--wide" />
          <div className="skeleton-line skeleton-line--narrow" />
        </div>
      ))}
    </div>
  );
}
