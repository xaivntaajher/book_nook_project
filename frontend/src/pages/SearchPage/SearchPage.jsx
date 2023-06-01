import React, { useState } from 'react';
import axios from 'axios';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      setSearchResults(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div key={item.id}>
              <h3>{item.volumeInfo.title}</h3>
              {item.volumeInfo.imageLinks && (
                <img
                  src={item.volumeInfo.imageLinks.thumbnail}
                  alt={item.volumeInfo.title}
                />
              )}
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;