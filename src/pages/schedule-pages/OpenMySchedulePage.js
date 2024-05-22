/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const OpenMySchedulePage = () => {
    const { scheduleId } = useParams();
  
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [defenders, setDefenders] = useState([]);
    const [filteredDefenders, setFilteredDefenders] = useState([]);

    useEffect(() => {
        fetchData();
    }, [scheduleId]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const scheduleResponse = await axios.get(`http://localhost:5000/defenseScheduleStudents/${scheduleId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const studentIds = scheduleResponse.data.map(s => s.id_S);
            const studentResponses = await Promise.all(studentIds.map(id =>
                axios.get(`http://localhost:5000/students/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            ));
            
            const students = studentResponses.map(response => response.data);
            setDefenders(students.flat());
            setFilteredDefenders(students.flat());
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const sortData = useCallback((column, order, data) => {
        if (!column) return;
        const sorted = [...data].sort((a, b) => {
            if (column === 'Avg_Mark') {
                return order === 'asc' ? a[column] - b[column] : b[column] - a[column];
            } else if (column === 'Red_Diplom') {
                return order === 'asc' ? (a[column] ? -1 : 1) : (a[column] ? 1 : -1);
            } else {
                return order === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
            }
        });
        setFilteredDefenders(sorted);
    }, []);

    const handleColumnClick = column => {
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(order);
        sortData(column, order, defenders);
    };

    const renderSortArrow = column => {
        if (sortColumn === column) {
            return sortOrder === 'asc' ? ' ↑' : ' ↓';
        }
        return null;
    };

    return (
        <div className="container-fluid text-center my-3">
            <h4 className="col-12">Мои защиты</h4>
            <div className="my-4 mx-5" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th>№</th>
                            <th onClick={() => handleColumnClick('Fullname')}>ФИО{renderSortArrow('Fullname')}</th>
                            <th onClick={() => handleColumnClick('Group')}>Группа{renderSortArrow('Group')}</th>
                            <th onClick={() => handleColumnClick('Topic')}>Тема{renderSortArrow('Topic')}</th>
                            <th onClick={() => handleColumnClick('ScientificAdviser')}>Научрук{renderSortArrow('ScientificAdviser')}</th>
                            <th onClick={() => handleColumnClick('Avg_Mark')}>Средний балл{renderSortArrow('Avg_Mark')}</th>
                            <th onClick={() => handleColumnClick('Red_Diplom')}>Красный диплом{renderSortArrow('Red_Diplom')}</th>
                            <th>Рекомендация в магистратуру</th>
                            <th>Рекомендация к публикации</th>
                            <th>Оценка</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDefenders.map((defender, index) => (
                            <tr key={defender.id_S}>
                                <td>{index + 1}</td>
                                <td>{defender.Fullname}</td>
                                <td>{defender.Group}</td>
                                <td>{defender.Topic}</td>
                                <td>{defender.ScientificAdviser}</td>
                                <td>{defender.Avg_Mark}</td>
                                <td>{defender.Red_Diplom ? 'Да' : 'Нет'}</td>
                                <td>{defender.magRec ? 'Да' : ''}</td>
                                <td>{defender.publRec ? 'Да' : ''}</td>
                                <td>{defender.result}</td>
                                <td>
                                    <Link to={`/defender-schedule/${defender.id_S}`}>
                                        <Button variant="primary">Начать</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default OpenMySchedulePage;