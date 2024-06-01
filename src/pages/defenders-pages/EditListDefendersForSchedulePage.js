/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';

const EditListDefendersForSchedulePage = () => {
    const { id_DS } = useParams(); 
    const [defendersSchedule, setMembersGek] = useState([]);
    const [allDefendersSchedule, setAllMembersGek] = useState([]);
    const id_D = Number(localStorage.getItem('id_D'));
    
    const Name_dir = localStorage.getItem('Name_dir');
    const navigate = useNavigate();

    const fetchAllDefendersData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/students/thisYear', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const filteredStudents = response.data.filter(student => student.id_D === id_D);
            return filteredStudents;
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            return [];
        }
    };

    const fetchDefendersData = async () => {
        const token = localStorage.getItem('token');
        try {
            const schedulesResponse = await axios.get(`http://localhost:5000/defenseScheduleStudents/${id_DS}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const defenders = await Promise.all(schedulesResponse.data.map(async (def) => {
                const defenderResponse = await axios.get(`http://localhost:5000/students/${def.id_S}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                return { ...def, Fullname: defenderResponse.data.Fullname };
              }));

            return defenders;
        } catch (error) {
            console.error('Ошибка при загрузке данных о членах текущей ГЭК:', error);
            return [];
        }
    };

    const filterAndSortAllDefenders = (allMembers, members) => {
        const defenderIds = members.map(defender => defender.id_S);
        return allMembers
            .filter(defender => !defenderIds.includes(defender.id_S))
            .sort((a, b) => a.Fullname.localeCompare(b.Fullname));
    };

    const fetchData = async () => {
        const [defendersGecData, allDefendersData] = await Promise.all([
            fetchDefendersData(),
            fetchAllDefendersData()
        ]);

        setMembersGek(defendersGecData);

        const filteredAndSortAllDefenders = filterAndSortAllDefenders(allDefendersData, defendersGecData);
        setAllMembersGek(filteredAndSortAllDefenders);
    };

    useEffect(() => {
        fetchData();
    }, [id_DS]);

    const handleDefenderAdd = (defender) => {
        const updatedDefendersGek = [...defendersSchedule, defender].sort((a, b) => a.Fullname.localeCompare(b.Fullname));
        setMembersGek(updatedDefendersGek);
        const updatedAllDefendersGek = allDefendersSchedule.filter(d => d.id_S !== defender.id_S).sort((a, b) => a.Fullname.localeCompare(b.Fullname));
        setAllMembersGek(updatedAllDefendersGek);
    };

    const handleDefenderRemove = (defender) => {
        const updatedAllDefendersGek = [...allDefendersSchedule, defender].sort((a, b) => a.Fullname.localeCompare(b.Fullname));
        setAllMembersGek(updatedAllDefendersGek);
        const updatedDefendersGek = defendersSchedule.filter(d => d.id_S !== defender.id_S).sort((a, b) => a.Fullname.localeCompare(b.Fullname));
        setMembersGek(updatedDefendersGek);
    };

    const handleSaveList = async () => {
        const token = localStorage.getItem('token');
        try { 
            const studentIds = defendersSchedule.map(d => d.id_S);
            const gecCompositionResponse = await axios.put(`http://localhost:5000/defenseScheduleStudents/${id_DS}`, { studentIds }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/list-defenders');

            localStorage.removeItem('id_D');
            localStorage.removeItem('Name_dir');

            console.log(gecCompositionResponse.data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="container-fluid text-center my-3">
            <div className="row my-3">
                <Link to={`/list-defenders`} className="col-1">
                    <Button variant="primary" className="">Назад</Button>
                </Link>
                <h4 className="col-10">Редактирование состава защищающихся для защиты №{id_DS}</h4>
            </div>
            <div className="row justify-content-evenly">
                <Card style={{ minWidth: '500px', width: '40%', height: '70vh', overflowY: 'auto' }} className="my-2 text-center bg-light">
                    <Card.Header className="fs-4 bg-light">Состав студентов</Card.Header>
                    <Card.Body> 
                        <h5 className="my-2">Состав</h5>
                        <ListGroup className="container text-center">
                            {defendersSchedule.map((defender, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-2">
                                    <span className="mx-3">{defender.Fullname}</span>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleDefenderRemove(defender)}
                                        className="mx-3"
                                    >Удалить</Button>
                                </ListGroup.Item>
                            ))}    
                        </ListGroup>
                    </Card.Body>
                </Card>

                <Card style={{ minWidth: '500px', width: '40%', height: '70vh', overflowY: 'auto' }} className="my-2 text-center bg-light">
                    <Card.Header className="fs-4 bg-light">Список защищающихся направления {Name_dir}</Card.Header>
                    <Card.Body>
                        <ListGroup className="container">
                            {allDefendersSchedule.map((defender, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-2">
                                    <span className="mx-3">{defender.Fullname}</span>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleDefenderAdd(defender)}
                                        className="mx-3"
                                    >Добавить</Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
            <Button variant="primary" className="col-2 my-4" onClick={handleSaveList}>Сохранить состав</Button>
        </div>
    );
};

export default EditListDefendersForSchedulePage;