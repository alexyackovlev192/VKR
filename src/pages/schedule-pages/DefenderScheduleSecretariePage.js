/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const DefenderScheduleSecretariePage = () => {
    const { id_S } = useParams();
    const [defenderData, setDefenderData] = useState(null);
    const [ratings, setRatings] = useState({});

    const id_U = localStorage.getItem('id_U');
    const id_DSS = localStorage.getItem('id_DSS');
    const id_DS = localStorage.getItem('id_DS');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [id_S]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const studentResponse = await axios.get(`http://localhost:5000/students/${id_S}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDefenderData(studentResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleRecChange = useCallback((field, value) => {
        setDefenderData(prevState => ({
            ...prevState,
            [field]: value
        }));
    }, []);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const dataToSave = {
            id_DSS: id_DSS,
            id_U: id_U,
            scores: Object.values(ratings),
            RecMagistracy: defenderData?.magRec ? 'Да' : 'Нет',
            RecPublication: defenderData?.publRec ? 'Да' : 'Нет'
        };

        try {
            await axios.post(`http://localhost:5000/resultComissionSecretary/create`, dataToSave, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate(`/my-schedule-sec/${id_DS}`);
            localStorage.removeItem('id_DSS');
            localStorage.removeItem('id_DS');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div className="container-fluid text-center my-3">
            <div className="row my-3">
                <Link to={`/my-schedule-sec/${id_DS}`} className="col-1">
                    <Button variant="primary" className="">Назад</Button>
                </Link>
                <h4 className="col-10">Мои защиты</h4>
            </div>
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
                        </tr>
                    </thead>
                    <tbody>
                        {defenderData && (
                            <tr key={defenderData.id}>
                                <td>1</td>
                                <td>{defenderData.Fullname}</td>
                                <td>{defenderData.Group}</td>
                                <td>{defenderData.Topic}</td>
                                <td>{defenderData.ScientificAdviser}</td>
                                <td>{defenderData.Avg_Mark}</td>
                                <td>{defenderData.Red_Diplom ? 'Да' : 'Нет'}</td>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={defenderData.magRec}
                                        onChange={(e) => handleRecChange('magRec', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={defenderData.publRec}
                                        onChange={(e) => handleRecChange('publRec', e.target.checked)}
                                    />
                                </td>
                                <td>
                                <Form.Select
                                    type="text"
                                    name="result">
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Button onClick={handleSave} className="mt-3" variant="primary">Сохранить</Button>
            </div>
        </div>
    );
};

export default DefenderScheduleSecretariePage;