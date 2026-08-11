import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user, onDelete }) {
  const initial = user.name?.charAt(0)?.toUpperCase() || "?";
  const companyName = typeof user.company === "string" ? user.company : user.company?.name;
  return (
    <article className="user-card">
      <span className="user-card__tab" aria-hidden="true">
        {initial}
      </span>
      <h3 className="user-card__name">{user.name}</h3>
      {companyName && <p className="user-card__company">{companyName}</p>}
      <dl className="user-card__meta">
        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{user.phone}</dd>
        </div>
      </dl>
      <div className="user-card__actions">
        <Link to={`/users/${user.id}`} className="btn btn--ghost">View / Edit</Link>
        <button type="button" className="btn btn--danger" onClick={() => onDelete(user)}>Delete</button>
      </div>
    </article>
  );
}
