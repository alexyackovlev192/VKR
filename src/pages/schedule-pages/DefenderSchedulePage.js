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
    const id_DS = localStorage.getItem('id_DS');

    const recMag = localStorage.getItem('RecMag') === 'Да';
    const recPub = localStorage.getItem('RecPub') === 'Да';
    const result = localStorage.getItem('Result');

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [id_S]);

    useEffect(() => {
        setDefenderData(prevData => ({
            ...prevData,
            magRec: recMag,
            publRec: recPub
        }));
    }, [recMag, recPub]);

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
            RecMagistracy: defenderData.magRec ? 'Да' : null,
            RecPublication: defenderData.publRec ? 'Да' : null
        };

        try {
            await axios.post(`http://localhost:5000/resultComissionMember/create`, dataToSave, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate(`/my-schedule/${id_DS}`);
            localStorage.removeItem('DataDefender');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleBackButton = () => {
        navigate(`/my-schedule/${id_DS}`);
        localStorage.removeItem('DataDefender');
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

    return (
        <div className="container-fluid px-5">
            <div className="row text-center my-4">
                <div className="col-1">
                    <Button variant="primary" onClick={handleBackButton}>Назад</Button>
                </div>
                <h3 className="col-10">Защита №{id_DS}</h3>
            </div>
            <div className="my-4 mx-5 text-center" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
                                <td>{result > 0 ? result : ''}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div>
                    <RatingCriteria criteria="Актуальность" />
                    <RatingCriteria criteria="Сложность работы" />
                    <RatingCriteria criteria="Возможность развития" />
                </div>

                <Button onClick={handleSave} className="mt-3" variant="primary">Сохранить результаты</Button>
            </div>
        </div>
    );
};

export default DefenderSchedulePage;