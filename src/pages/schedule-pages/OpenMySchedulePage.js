/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

const OpenMySchedulePage = () => {
    const { id_DS } = useParams();

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [defenders, setDefenders] = useState([]);
    const [filteredDefenders, setFilteredDefenders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [id_DS]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const id_U = localStorage.getItem('id_U');
    
        try {
            const scheduleResponse = await axios.get(`http://localhost:5000/defenseScheduleStudents/${id_DS}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const studentScheduleData = scheduleResponse.data;
    
            const studentResponses = await Promise.all(studentScheduleData.map(async (s) => {
                const studentDataResponse = await axios.get(`http://localhost:5000/students/${s.id_S}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const studentData = studentDataResponse.data;
                let resultData = null;
                try {
                    const resultResponse = await axios.get(`http://localhost:5000/resultComissionMember/${s.id_DSS}/${id_U}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    resultData = resultResponse.data;
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.warn(`Result not found for student ID: ${s.id_S} and DSS ID: ${s.id_DSS}`);
                    } else {
                        console.error('Error fetching resultComissionMember data: ', error);
                    }
                }
                return { ...studentData, id_DSS: s.id_DSS, ...resultData };
            }));
    
            const students = studentResponses.map((defender) => {
                if (!defender.resultData) {
                    return {
                        ...defender,
                        resultData: {
                            RecMagistracy: null,
                            RecPublication: null,
                            Result: null
                        }
                    };
                }
                return defender;
            });
    
            setDefenders(students);
            setFilteredDefenders(students);
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

    const handleClickButton = (d) => {
        localStorage.setItem('id_DSS', d.id_DSS);
        navigate(`/defender-schedule/${d.id_S}`);
    };

    const handleBackButton = () => {
        localStorage.removeItem('id_DS');
        navigate(`/my-schedule`);
    };

    return (
        <div className="container-fluid text-center px-5">
            <div className="row my-4">
                <div className="col-1">
                    <Button variant="primary" onClick={handleBackButton}>Назад</Button>
                </div>
                <h3 className="col-10">Защита №{id_DS}</h3>
            </div>
            {filteredDefenders.length > 0 ? (
                <>
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
                                        <td>{defender.RecMagistracy ? defender.RecMagistracy : ''}</td>
                                        <td>{defender.RecPublication ? defender.RecPublication : ''}</td>
                                        <td>{defender.Result}</td>
                                        <td>
                                            <Button 
                                                variant="primary" 
                                                onClick={() => handleClickButton(defender)} 
                                                disabled={defender.Result}
                                            >
                                                {defender.Result ? 'Редактировать' : 'Начать'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </>
            ) : (
                <p>Данных нет</p>
            )}    
        </div>
    );
};

export default OpenMySchedulePage;