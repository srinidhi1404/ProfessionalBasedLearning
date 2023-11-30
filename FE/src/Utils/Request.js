export const fetchApi = async (endpoint, body, method) => {
  let auth = localStorage.getItem("token");
<<<<<<< HEAD
<<<<<<< HEAD
//https://gorgeous-hosiery-yak.cyclic.app/
  let baseUrl = "http://localhost:3000/";
=======

  let baseUrl = "https://gorgeous-hosiery-yak.cyclic.app/";
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======

  let baseUrl = "https://gorgeous-hosiery-yak.cyclic.app/";
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
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
