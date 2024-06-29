import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBooks = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://openlibrary.org/search.json?q=${query}`)
      .then(response => {
        setData(response.data.docs);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [query]);

  return { data, loading, error };
};

export default useFetchBooks;
