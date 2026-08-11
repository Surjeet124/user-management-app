import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import { fetchUserById } from "../api/userService";
import UserForm from "../components/UserForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, loading: listLoading, editUser, removeUser } = useUsers();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    const inContext = users.find((u) => String(u.id) === id);
    if (inContext) {
      setUser(inContext);
      setLoading(false);
      return;
    }
    if (listLoading) return;

    setLoading(true);
    setError(null);
    fetchUserById(id)
      .then(setUser)
      .catch((err) => setError(err.message || "Couldn't load this user."))
      .finally(() => setLoading(false));
  }, [id, users, listLoading]);

  async function handleUpdate(userData) {
    setActionError(null);
    try {
      await editUser(user.id, userData);
      setUser((prev) => ({ ...prev, ...userData }));
      setEditing(false);
    } catch (err) {
      setActionError(err.message || "Couldn't save those changes.");
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Delete ${user.name}? This can't be undone.`);
    if (!confirmed) return;

    setActionError(null);
    try {
      await removeUser(user.id);
      navigate("/");
    } catch (err) {
      setActionError(err.message || "Couldn't delete that user.");
    }
  }

  if (loading) return <Loader count={1} />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <p className="empty-state">User not found.</p>;

  const companyName = typeof user.company === "string" ? user.company : user.company?.name;

  return (
    <section className="detail-view">
      <Link to="/" className="back-link">
        ← Back to directory
      </Link>

      {actionError && <ErrorMessage message={actionError} />}

      {!editing ? (
        <div className="detail-card">
          <span className="user-card__tab" aria-hidden="true">
            {user.name?.charAt(0)?.toUpperCase()}
          </span>
          <h1>{user.name}</h1>
          {companyName && <p className="user-card__company">{companyName}</p>}

          <dl className="user-card__meta detail-meta">
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{user.phone}</dd>
            </div>
            {user.website && (
              <div>
                <dt>Website</dt>
                <dd>{user.website}</dd>
              </div>
            )}
            {user.address?.city && (
              <div>
                <dt>City</dt>
                <dd>{user.address.city}</dd>
              </div>
            )}
          </dl>

          <div className="form-actions">
            <button type="button" className="btn btn--primary" onClick={() => setEditing(true)}>
              Edit user
            </button>
            <button type="button" className="btn btn--danger" onClick={handleDelete}>
              Delete user
            </button>
          </div>
        </div>
      ) : (
        <div className="form-panel">
          <h2>Edit {user.name}</h2>
          <UserForm
            initialData={user}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
            submitLabel="Save changes"
          />
        </div>
      )}
    </section>
  );
}
