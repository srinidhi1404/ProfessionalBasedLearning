export const fetchApi = async (endpoint, body, method) => {
  let auth = localStorage.getItem("token");

  let baseUrl = "http://localhost:3000";
  let data = {
    method: method, 
    headers: {
      "content-type": "application/json",
      token: auth ? auth : null,
    },
    body: method === "GET" ? null : JSON.stringify(body),
  };
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, data);
    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};
