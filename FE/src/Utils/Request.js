export const fetchApi = async (endpoint, body, method) => {
  let auth = localStorage.getItem("token");
//https://gorgeous-hosiery-yak.cyclic.app/
  let baseUrl = "https://professionalbasedlearning.onrender.com/";
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
