/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const DefenderSchedulePage = () => {
    const { id_S } = useParams();
    const [defenderData, setDefenderData] = useState(null);
    const [ratings, setRatings] = useState({});

    const id_U = localStorage.getItem('id_U');
    const id_DSS = localStorage.getItem('id_DSS');
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

    const handleRatingChange = useCallback((criteria, value) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [criteria]: value
        }));
    }, []);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const dataToSave = {
            id_DSS: id_DSS,
            id_U: id_U,
            scores: Object.values(ratings),
            RecMagistracy: defenderData.magRec ? 'Да' : 'Нет',
            RecPublication: defenderData.publRec ? 'Да' : 'Нет'
        };

        try {
            console.log(dataToSave);
            await axios.post(`http://localhost:5000/resultComissionMember/create`, dataToSave, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.removeItem('id_DSS');
            localStorage.removeItem('id_U');
            navigate('/my-schedule/5');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const RatingCriteria = ({ criteria }) => {
        const ratingOptions = [5, 4, 3, 2];

        return (
            <div className="d-flex justify-content-center align-items-center">
                <div className="border border-black my-3 col-6">
                    <h6 className="py-2">{criteria}</h6>
                    <Form.Group>
                        {ratingOptions.map(option => (
                            <Form.Check
                                key={option}
                                className="px-4"
                                inline
                                type="radio"
                                label={option.toString()}
                                name={`rating-${criteria}`}
                                checked={ratings[criteria] === option}
                                onChange={() => handleRatingChange(criteria, option)}
                            />
                        ))}
                    </Form.Group>
                </div>
            </div>
        );
    };

    if (!defenderData) {
        return <div>Loading...</div>;
    }

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
                        </tr>
                    </thead>
                    <tbody>
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
                            <td>{defenderData.result}</td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <RatingCriteria criteria="Актуальность" />
                    <RatingCriteria criteria="Сложность работы" />
                    <RatingCriteria criteria="Возможность развития" />
                </div>

                <Button onClick={handleSave} className="mt-3" variant="primary">Сохранить</Button>
            </div>
        </div>
    );
};

export default DefenderSchedulePage;