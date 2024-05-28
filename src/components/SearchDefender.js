import React from 'react';
import './style-components/SearchDefender.css';

const SearchDefender = ({ filters, handleFilterChange }) => {
  const handleRadioChange = (e) => {
    const { value } = e.target;
    handleFilterChange({ target: { name: 'redDiplom', value: value === 'empty' ? '' : value } });
  };

  return (
    <div className="row justify-content-center text-center mb-3">
      <h4 className="sel">Поиск</h4>
      <div className="col-2 my-2">
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
      <div className="col-1 my-2">
        <label htmlFor="group" className="my-2">Группа</label>
        <input
          type="text"
          className="form-control mx-2"
          id="group"
          name="group"
          value={filters.group}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-2 my-2">
        <label htmlFor="topic" className="my-2">Тема</label>
        <input
          type="text"
          className="form-control mx-2"
          id="topic"
          name="topic"
          value={filters.topic}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-2 my-2">
        <label htmlFor="scientificAdviser" className="my-2">Научный руководитель</label>
        <input
          type="text"
          className="form-control mx-2"
          id="scientificAdviser"
          name="scientificAdviser"
          value={filters.scientificAdviser}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-1 my-2">
        <label htmlFor="avgMark" className="my-2">Средний балл</label>
        <input
          type="text"
          className="form-control mx-2"
          id="avgMark"
          name="avgMark"
          value={filters.avgMark}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-1 my-2">
        <label htmlFor="name_direction" className="my-2">Направление</label>
        <input
          type="text"
          className="form-control mx-2"
          id="name_direction"
          name="name_direction"
          value={filters.name_direction}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-2 my-2">
        <label className="my-2">Красный диплом</label>
        <div className="form-control mx-2 d-flex justify-content-around">
          <div>
            <input
              type="radio"
              id="redDiplomYes"
              name="redDiplom"
              value="Да"
              checked={filters.redDiplom === 'Да'}
              onChange={handleRadioChange}
            />
            <label htmlFor="redDiplomYes">Да</label>
          </div>
          <div>
            <input
              type="radio"
              id="redDiplomNo"
              name="redDiplom"
              value="Нет"
              checked={filters.redDiplom === 'Нет'}
              onChange={handleRadioChange}
            />
            <label htmlFor="redDiplomNo">Нет</label>
          </div>
          <div>
            <input
              type="radio"
              id="redDiplomEmpty"
              name="redDiplom"
              value="empty"
              checked={filters.redDiplom === ''}
              onChange={handleRadioChange}
            />
            <label htmlFor="redDiplomEmpty">Все</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDefender;
