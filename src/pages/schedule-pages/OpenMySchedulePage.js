import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';

import defendersData from '../../data/defendersData.json';

const OpenMySchedulePage = () => {
    const { scheduleId } = useParams(); // Получаем параметр маршрута
    const [defenders, setDefenders] = useState([]);
    useEffect(() => {
        // Находим данные о защищающихся по идентификатору из параметра маршрута
        const defs = defendersData.filter(defs => defs.id % 2 === 0); // используем filter вместо find
        if (defs.length > 0) { // проверяем, найдены ли данные
            setDefenders(defs);
        } else {
            setDefenders([]); // если данные не найдены, устанавливаем пустой массив
        }
    }, [scheduleId]);
  return (
    <div className="container-fluid text-center my-3">
        <h4 className="col-12">Мои защиты</h4>
        <div className="my-4 mx-5" style={{ maxHeight: '70vh', overflowY: 'auto' }}>                
            <table className="table table-striped table-bordered table-light table-hover text-center">
                <thead className="table-dark">
                    <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Группа</th>
                    <th>Тема</th>
                    <th>Научрук</th>
                    <th>Средний балл</th>
                    <th>Красный диплом</th>
                    <th>Рекомендация в магистратуру</th>
                    <th>Рекомендация к публикации</th>
                    <th>Оценка</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {defenders.map((defender, index) => (
                    <tr 
                        key={defender.id} 
                        >
                        <td>{index + 1}</td>
                        <td>{defender.name}</td>
                        <td>{defender.group}</td>
                        <td>{defender.topic}</td>
                        <td>{defender.supervisor}</td>
                        <td>{defender.averageGrade}</td>
                        <td>{defender.hasHonors ? 'Да' : 'Нет'}</td>
                        <td>{defender.magRec ? 'Да' : ''}</td>
                        <td>{defender.publRec ? 'Да' : ''}</td>
                        <td>{defender.result}</td>
                        <td>
                            <Link to={`/defender-schedule/${defender.id}`} className="col-1">
                                <Button variant="primary" className="">Начать</Button>
                                {console.log(defender.id)}  
                            </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    
  );
};

export default OpenMySchedulePage;