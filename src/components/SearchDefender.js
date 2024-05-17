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
          placeholder="Группа"
          name="group"
          value={filters.group}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control mx-2"
          placeholder="Тема"
          name="topic"
          value={filters.topic}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control mx-2"
          placeholder="Научный руководитель"
          name="scientificAdviser"
          value={filters.scientificAdviser}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control mx-2"
          placeholder="Средний балл"
          name="avg_Mark"
          value={filters.avg_Mark}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-3">
        <input
          type="text"
          className="form-control mx-2"
          placeholder="Диплом с отличием"
          name="red_Diplom"
          value={filters.red_Diplom}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Search;