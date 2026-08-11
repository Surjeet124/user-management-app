const BASE_URL = "https://jsonplaceholder.typicode.com/users";


async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} (${response.statusText})`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export async function fetchUsers() {
  const response = await fetch(BASE_URL);
  return handleResponse(response);
}

export async function fetchUserById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return handleResponse(response);
}

export async function createUser(userData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export async function updateUser(id, userData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}
