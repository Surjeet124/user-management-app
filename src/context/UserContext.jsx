import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "../api/userService";


const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || "Something went wrong while loading users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const addUser = useCallback(async (userData) => {
    const created = await createUser(userData);
    setUsers((prev) => [{ ...userData, id: created.id ?? Date.now() }, ...prev]);
    return created;
  }, []);

  const editUser = useCallback(async (id, userData) => {
    await updateUser(id, userData);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...userData } : u)));
  }, []);

  const removeUser = useCallback(async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const value = { users, loading, error, loadUsers, addUser, editUser, removeUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUsers() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUsers must be used inside a <UserProvider>");
  }
  return ctx;
}
