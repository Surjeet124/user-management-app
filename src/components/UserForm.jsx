import React, { useState } from "react";



export default function UserForm({ initialData, onSubmit, onCancel, submitLabel = "Save" }) {
  const [form, setForm] = useState(() => ({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    company: initialData?.company?.name || initialData?.company || "",
  }));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: { name: form.company.trim() },
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
      </div>

      <div className="field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={submitting}>{submitting ? "Saving…" : submitLabel}</button>
        {onCancel && (<button type="button" className="btn btn--ghost" onClick={onCancel} disabled={submitting}>Cancel</button>)}
      </div>
    </form>
  );
}
