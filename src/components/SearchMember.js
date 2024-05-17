import React from 'react';

const Search = ({ filters, handleFilterChange }) => {
  return (
    <div className="row justify-content-center text-center mb-3">
      <h4>Поиск</h4>
      <div className="col-3">
        <input
          type="text"
          className="form-control mx-2"
          placeholder="ФИО"
          name="fullname"
          value={filters.fullname}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control mx-2"
          placeholder="Должность"
          name="post"
          value={filters.post}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control mx-2"
          placeholder="Почта"
          name="mail"
          value={filters.topic}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Search;