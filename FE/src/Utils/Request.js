
export const fetchApi =async (endpoint , body, method ) => {
 let auth = localStorage.getItem('token')
 
    let baseUrl = 'http://localhost:3000';
    let data ={
        method: method, // or 'PUT'
        headers: {
          "content-type": "application/json",
          'token': auth ? auth : null
        },
        body:  method== "GET" ? null : JSON.stringify(body),
      }
    
    try {
        const response = await fetch(`${baseUrl}${endpoint}`,data,
         );
        const result = await response.json();

        return result;
      } catch (error) {
    
        return error
      }
}



// import React, { useState, useEffect } from 'react';

// const Request = ({ url, method = 'GET', body = null, headers = {}, onSuccess, onError }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url, {
//           method,
//           body: body && JSON.stringify(body),
//           headers: {
//             'Content-Type': 'application/json',
//             ...headers,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const responseData = await response.json();
//         setData(responseData);
//         setIsLoading(false);
//         if (onSuccess) {
//           onSuccess(responseData);
//         }
//       } catch (err) {
//         setError(err);
//         setIsLoading(false);
//         if (onError) {
//           onError(err);
//         }
//       }
//     };

//     fetchData();
//   }, [url, method, body, headers, onSuccess, onError]);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div>
//       {/* Render your component using the fetched data */}
//       {/* For example, <MyComponent data={data} /> */}
//     </div>
//   );
// };

// export default Request;


