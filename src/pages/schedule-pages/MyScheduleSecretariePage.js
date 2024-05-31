import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import '../style-pages/MySchedulePage.css';

const MySchedulePage = () => {
    const [scheduleDetails, setScheduleDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        const id_U = decodedToken.id_U;
        localStorage.setItem('id_U', id_U);

        const fetchSchedules = async () => {
            try {
                const gekResponse = await axios.get(`http://localhost:5000/gecs/UserGecs/${id_U}`, {
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
                localStorage.setItem('id_DS', flattenedScheduleDetails.id_DS);
            } catch (error) {
                console.error('Error loading schedules:', error);
            }
        };
        fetchSchedules();
    }, []);

    const handleOpen = (i) => {
        navigate(`/my-schedule-sec/${i.id_DS}`);
        localStorage.setItem('id_DS', i.id_DS);
    }

    return (
        <div className="container-fluid px-5">
            <div className="text-center my-4">
                <h3>Защиты секретаря комиссии</h3>
            </div>
            {scheduleDetails.length > 0 ? (
                <>
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
                                <Button onClick={() => handleOpen(item)} className="mt-3" variant="primary">Открыть</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div> 
                </>
                ) : (
                    <p>Данных нет</p>
                )}
        </div>
    );
};

export default MySchedulePage;