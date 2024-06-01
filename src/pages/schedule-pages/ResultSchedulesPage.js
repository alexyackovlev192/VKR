import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const ResultSchedulesPage = () => {
    const [results, setResults] = useState([]);
    const Year = 2024;
    const id_D = 3;

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5000/resultComissionSecretary/resultsByIdDOrYear?id_D=${id_D}&Year=${Year}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            setResults(response.data);
          })
          .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
          });
      }, []);

    return (
        <div className="px-5">
            <div className="text-center my-4">
                <h3>Список членов комиссии</h3>
            </div>
            <div className="justify-content-center text-center mb-3">
                <div className="row justify-content-center mb-3">
                    <div className="col-2">
                        <label htmlFor="year" className="my-2">Год проведения защиты</label>
                        <input
                            type="text"
                            className="form-control mx-2"
                            id="year"
                            name="year"
                            // value={filters.fullname}
                            // onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="direction" className="my-2">Направление</label>
                        <input
                            type="text"
                            className="form-control mx-2"
                            id="direction"
                            name="direction"
                            // value={filters.post}
                            // onChange={handleFilterChange}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor="id_DS" className="my-2">Номер защиты</label>
                        <input
                            type="text"
                            className="form-control mx-2"
                            id="id_DS"
                            name="id_DS"
                            // value={filters.mail}
                            // onChange={handleFilterChange}
                        />
                    </div>
                </div>
                <Button variant="primary" className="col-1 mx-3">
                    Вывести
                </Button>
            </div>
            <div className="my-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <table className="table table-striped table-bordered table-light table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>№</th>
                            <th >ФИО студента</th>
                            <th>Номер группы</th>
                            <th>Тема</th>
                            <th >Научрук</th>
                            <th>Красный диплом</th>
                            <th>Год защиты</th>
                            <th>Направление</th>
                            <th>Номер ГЭК</th>
                            <th>Оценка</th>
                            <th>Рекомендация в магистратуру</th>
                            <th>Рекомендация к публикации</th>
                            <th>Номер защиты</th>
                            <th>Номер протокола</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((res, index) => (
                        <tr
                            key={res.id}
                        >
                            <td>{index + 1}</td>
                            <td>{res.studentName}</td>
                            <td>{res.Group}</td>
                            <td>{res.Topic}</td>
                            <td>{res.ScientificAdviser}</td>
                            <td>{res.Red_Diplom ? 'Да' : null}</td>
                            <td>{res.Year}</td>
                            <td>{res.Name_direction}</td>
                            <td>{res.gec}</td>
                            <td>{res.result}</td>
                            <td>{res.recMagistracy}</td>
                            <td>{res.recPublication}</td>
                            <td>{res.id_DS}</td>
                            <td>{res.numberProtocol}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>     
        </div>
    );
};

export default ResultSchedulesPage;