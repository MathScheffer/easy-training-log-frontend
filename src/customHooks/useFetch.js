import React from 'react';

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(async (url, options) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
    //  console.log(`Response: ${response}`)
      json = await response.json();
      if (response.ok === false) {
        if (typeof error === 'object'){
            setError(json)
            json = null
        }else{
          throw new Error(error)
        }
        
      };
      
    } catch (err) {
      json = null;
      setError(err);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);
    //console.log(`Data no useFetch: ${data}`)
  return { data, loading, error, request, setError };
};

export default useFetch;
