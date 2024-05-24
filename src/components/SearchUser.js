import React from 'react';

const Search = ({ filters, handleFilterChange }) => {
  return (
    <div className="row justify-content-center text-center mb-3">
      <h4>Поиск</h4>
      <div className="col-3">
        <label htmlFor="fullname" className="my-2">ФИО</label>
        <input
          type="text"
          className="form-control mx-2"
          id="fullname"
          name="fullname"
          value={filters.fullname}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-3">
        <label htmlFor="post" className="my-2">Должность</label>
        <input
          type="text"
          className="form-control mx-2"
          id="post"
          name="post"
          value={filters.post}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-3">
        <label htmlFor="mail" className="my-2">Почта</label>
        <input
          type="text"
          className="form-control mx-2"
          id="mail"
          name="mail"
          value={filters.mail}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Search;