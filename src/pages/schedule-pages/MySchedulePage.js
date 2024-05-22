import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import '../style-pages/MySchedulePage.css';

const MySchedulePage = () => {
    const [scheduleDetails, setScheduleDetails] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const id_U = decodedToken.id_U;

        const fetchSchedules = async () => {
            try {
                const gekResponse = await axios.get(`http://localhost:5000/gecComposition/UserGecs/${id_U}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const schedulesWithDetails = await Promise.all(gekResponse.data.map(async (gek) => {
                    const detailedGekResponse = await axios.get(`http://localhost:5000/defenseSchedule/${gek.id_G}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const defenseSchedules = detailedGekResponse.data;

                    const schedulesWithDirections = await Promise.all(defenseSchedules.map(async (schedule) => {
                        const directionResponse = await axios.get(`http://localhost:5000/directions/${schedule.id_D}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        return {
                            ...schedule,
                            Name_direction: directionResponse.data.Name_direction
                        };
                    }));

                    return schedulesWithDirections;
                }));
                
                const flattenedScheduleDetails = schedulesWithDetails.flat().sort((a, b) => new Date(a.date) - new Date(b.date));
                setScheduleDetails(flattenedScheduleDetails);
                console.log(flattenedScheduleDetails[1].id_DS);
            } catch (error) {
                console.error('Error loading schedules:', error);
            }
        };
        fetchSchedules();
    }, []);

    return (
        <div className="container-fluid text-center my-3">
            <h4 className="col-12">Мои защиты</h4>
            <div className="row justify-content-evenly col-12 mx-3">
                {scheduleDetails.map((item, index) => (
                    <Card key={index} className="col-2 mx-2 my-4 text-center bg-light">
                        <Card.Body>
                            <Card.Title>{new Date(item.date).toLocaleDateString('ru', { day: '2-digit', month: '2-digit' })}</Card.Title>
                            <Card.Text>
                                <span>
                                    <p>ГЭК №{item.id_G}</p>
                                    <p>Время: {item.time}</p>
                                    <p>Направление: {item.Name_direction}</p>
                                    <p>Аудитория: {item.classroom}</p>
                                </span>
                            </Card.Text>
                            <Link to={`/my-schedule/${item.id_DS}`} className="col-1">
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