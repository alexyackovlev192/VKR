import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import NoDataMessage from '../../components/NoDataMessage'; 
import { writeFile, utils } from 'xlsx';

const ResultSchedulesPage = () => {
  const [results, setResults] = useState([]);
  const [year, setYear] = useState('');
  const [direction, setDirection] = useState('');
  const [idDS, setIdDS] = useState('');
  const [checkClick, setCheckClick] = useState(false);
  const [directions, setDirections] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [columns, setColumns] = useState({
    studentName: true,
    Group: true,
    Topic: true,
    ScientificAdviser: true,
    Red_Diplom: true,
    Year: true,
    Name_direction: true,
    result: true,
    recMagistracy: true,
    recPublication: true,
    gec: true,
    id_DS: true,
    numberProtocol: true
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/directions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setDirections(response.data);
    })
    .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  const fetchResults = () => {
    const token = localStorage.getItem('token');
    
    let url = 'http://localhost:5000/resultComissionSecretary/resultsByIdDOrYear?';

    const handleParametrs = () => {
        if (false) return `id_DS=${false}`;
        else if(year && direction) return `id_D=${direction}&Year=${year}`;
        else if(year) return `Year=${year}&`;
    }
    
    console.log(direction);
    url += handleParametrs();
  
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.length > 0) {
          setCheckClick(true);
          setResults(response.data);
        } else {
          setCheckClick(true);
          setResults([]);
        }
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setCheckClick(false); // Сброс состояния перед новым запросом

    if (year && direction) {
      fetchResults();
    } else if (year && !direction) {
      fetchResults();
    } else if (!year && direction) {
      setErrorMessage('Пожалуйста, заполните поле "Год".');
    }
  };

  const handleExportToExcel = () => {
    const ws = utils.json_to_sheet(
      results.map((res, index) => {
        const rowData = {
          '№': index + 1,
        };
        Object.keys(columns).forEach((col) => {
          if (columns[col]) {
            rowData[col] = res[col];
          }
        });
        return rowData;
      })
    );

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Results');

    writeFile(wb, 'results.xlsx');
  };

  const handleColumnToggle = (column) => {
    setColumns(prevColumns => ({
      ...prevColumns,
      [column]: !prevColumns[column]
    }));
  };

  const handleSelectAll = () => {
    setColumns(prevColumns => {
      const updatedColumns = {};
      for (const column in prevColumns) {
        updatedColumns[column] = true;
      }
      return updatedColumns;
    });
  };
console.log(results);
  return (
    <div className="px-5">
      <div className="text-center my-4">
        <h3>Список членов комиссии</h3>
      </div>
      <form className="justify-content-center text-center mb-3" onSubmit={handleFormSubmit}>
        <div className="row justify-content-center mb-3">
          <div className="col-2">
            <label htmlFor="year" className="my-2">Год проведения защиты</label>
            <input
              type="text"
              className="form-control mx-2"
              id="year"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="col-3">
            <label htmlFor="direction" className="my-2">Направление</label>
            <select
              className="form-control mx-2"
              id="direction"
              name="direction"
              value={direction.Name_direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value=""></option>
              {directions.map((dir, index) => (
                <option key={index} value={dir.id_D}>{dir.Name_direction}</option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <label htmlFor="id_DS" className="my-2">Номер защиты</label>
            <input
              type="text"
              className="form-control mx-2"
              id="id_DS"
              name="id_DS"
              value={idDS}
              onChange={(e) => setIdDS(e.target.value)}
            />
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="">
            <Button variant="primary" type="submit" className="mx-3">
                Вывести
            </Button>
            {results.length > 0 &&
            <Button variant="primary" onClick={handleSelectAll} className="mx-3">
                Вывести все
            </Button>}
            <Button variant="secondary" type="button" className="mx-3" onClick={handleExportToExcel}>
                Скачать таблицу
            </Button>
        </div>
      </form>
      {results.length > 0 &&
        <div className="mb-4">
            {Object.keys(columns).map((col) => (
                <div key={col} className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={col}
                    checked={columns[col]}
                    onChange={() => handleColumnToggle(col)}
                />
                <label className="form-check-label" htmlFor={col}>
                    {col === 'studentName' && 'ФИО студента'}
                    {col === 'Group' && 'Группа'}
                    {col === 'Topic' && 'Тема'}
                    {col === 'ScientificAdviser' && 'Научрук'}
                    {col === 'Red_Diplom' && 'Красный диплом'}
                    {col === 'Year' && 'Год защиты'}
                    {col === 'Name_direction' && 'Направление'}
                    {col === 'result' && 'Оценка'}
                    {col === 'recMagistracy' && 'Рекомендация в магистратуру'}
                    {col === 'recPublication' && 'Рекомендация к публикации'}
                    {col === 'gec' && 'ГЭК'}
                    {col === 'id_DS' && 'Защита'}
                    {col === 'numberProtocol' && 'Протокол'}
                </label>
                </div>
            ))}
      </div>}
      <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {results.length > 0 ? (
          <table className="table table-striped table-bordered table-light table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>№</th>
                {columns.studentName && <th>ФИО студента</th>}
                {columns.Group && <th>Номер группы</th>}
                {columns.Topic && <th>Тема</th>}
                {columns.ScientificAdviser && <th>Научрук</th>}
                {columns.Red_Diplom && <th>Красный диплом</th>}
                {columns.Year && <th>Год защиты</th>}
                {columns.Name_direction && <th>Направление</th>}
                {columns.result && <th>Оценка</th>}
                {columns.recMagistracy && <th>Рекомендация в магистратуру</th>}
                {columns.recPublication && <th>Рекомендация к публикации</th>}
                {columns.gec && <th>Номер ГЭК</th>}
                {columns.id_DS && <th>Номер защиты</th>}
                {columns.numberProtocol && <th>Номер протокола</th>}
              </tr>
            </thead>
            <tbody>
              {results.map((res, index) => (
                <tr key={res.id}>
                  <td>{index + 1}</td>
                  {columns.studentName && <td>{res.studentName}</td>}
                  {columns.Group && <td>{res.Group}</td>}
                  {columns.Topic && <td>{res.Topic}</td>}
                  {columns.ScientificAdviser && <td>{res.ScientificAdviser}</td>}
                  {columns.Red_Diplom && <td>{res.Red_Diplom ? 'Да' : 'Нет'}</td>}
                  {columns.Year && <td>{res.Year}</td>}
                  {columns.Name_direction && <td>{res.Name_direction}</td>}
                  {columns.result && <td>{res.result}</td>}
                  {columns.recMagistracy && <td>{res.recMagistracy}</td>}
                  {columns.recPublication && <td>{res.recPublication}</td>}
                  {columns.gec && <td>{res.gec}</td>}
                  {columns.id_DS && <td>{res.id_DS}</td>}
                  {columns.numberProtocol && <td>{res.numberProtocol}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (checkClick ? (<NoDataMessage />) : (''))}   
      </div>
    </div>
  );
};

export default ResultSchedulesPage;