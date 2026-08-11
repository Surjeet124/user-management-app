import React, { useState } from "react";
import { useUsers } from "../context/UserContext";
import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function HomePage() {
  const { users, loading, error, loadUsers, addUser, removeUser } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [actionError, setActionError] = useState(null);

  async function handleCreate(userData) {
    setActionError(null);
    try {
      await addUser(userData);
      setShowForm(false);
    } catch (err) {
      setActionError(err.message || "Couldn't create that user.");
    }
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(`Delete ${user.name}? This can't be undone.`);
    if (!confirmed) return;

    setActionError(null);
    try {
      await removeUser(user.id);
    } catch (err) {
      setActionError(err.message || "Couldn't delete that user.");
    }
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Directory</h1>
          <p className="page-subtitle">{loading ? "Loading contacts…" : `${users.length} people on file`}</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Close" : "+ New user"}
        </button>
      </div>

      {actionError && <ErrorMessage message={actionError} />}

      {showForm && (
        <div className="form-panel">
          <h2>Add a new user</h2>
          <UserForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} submitLabel="Create user" />
        </div>
      )}

      {loading && <Loader />}

      {!loading && error && <ErrorMessage message={error} onRetry={loadUsers} />}

      {!loading && !error && users.length === 0 && (
        <p className="empty-state">No users yet. Add one with the button above.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="card-grid">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
