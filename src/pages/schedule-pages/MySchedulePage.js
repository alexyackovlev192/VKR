import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

import '../style-pages/MySchedulePage.css';

const MySchedulePage = () => {
    const [schedules, setSchedules] = useState([]);
    const [directions, setDirections] = useState({}); // Используем объект для хранения направлений по их id

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        const fetchSchedules = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/defenseSchedule/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                const schedulesData = response.data;
                setSchedules(schedulesData);
                
                const directionPromises = schedulesData.map(async (sched) => {
                    const directionResponse = await axios.get(`http://localhost:5000/directions/${sched.id_D}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    return { id: sched.id_D, name: directionResponse.data.Name_direction };
                });

                const directionsData = await Promise.all(directionPromises);
                const directionsMap = directionsData.reduce((acc, direction) => {
                    acc[direction.id] = direction.name;
                    return acc;
                }, {});
                
                setDirections(directionsMap);
                
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchSchedules();
    }, []);

    return (
        <div className="container-fluid text-center my-3">
            <h4 className="col-12">Мои защиты</h4>
            <div className="row justify-content-evenly col-12 mx-3">
                {schedules.map((item, index) => (
                    <Card key={index} className="col-2 mx-2 my-4 text-center bg-light">
                        <Card.Body>                
                            <Card.Title>{new Date(item.date).toLocaleDateString('ru', { day: '2-digit', month: '2-digit' })}</Card.Title>
                            <Card.Text>
                                <div>
                                    <p>ГЭК №{item.id_G}</p>
                                    <p>Время: {item.time}</p>
                                    <p>Направление: {directions[item.id_D] || 'Загрузка...'}</p>
                                    <p>Аудитория: {item.classroom}</p>
                                </div>
                            </Card.Text>
                            <Link to={`/my-schedule/${item.id}`} className="col-1">
                                <Button variant="primary">Начать</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MySchedulePage;