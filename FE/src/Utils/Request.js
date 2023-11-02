export const fetchApi = async (endpoint, body, method) => {
  let auth = localStorage.getItem("token");

  let baseUrl = "https://professional-based-learning-qene.vercel.app/";
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
  

if (!response.ok) {
  console.error("Request failed with status:", response.status);
  // Handle the error
} else {
  const data = await response.json(); // Parse the response data
  // Handle the data
}

    const result = await response.json();

    return result;
  } catch (error) {
    return error;
  }
};
