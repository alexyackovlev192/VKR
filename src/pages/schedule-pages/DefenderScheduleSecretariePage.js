/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const DefenderScheduleSecretariePage = () => {
    const { id_S } = useParams();
    const [defenderData, setDefenderData] = useState(null);
    const [redDiplom, setRedDiplom] = useState(false);
    const result = localStorage.getItem('Result') || '';

    const [scoresData, setScoresData] = useState({});
    const [formData, setFormData] = useState({
        Result: result,
        RecMag: localStorage.getItem('RecMag') === 'Да',
        RecPub: localStorage.getItem('RecPub') === 'Да',
        NumberProtocol: localStorage.getItem('NumberProtocol') || ''
    });
    const [changedFields, setChangedFields] = useState({});
    const id_U = localStorage.getItem('id_U');
    const id_DSS = localStorage.getItem('id_DSS');
    const id_DS = localStorage.getItem('id_DS');
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [id_S]);

    useEffect(() => {
        if (defenderData) {
            setDefenderData(prevData => ({
                ...prevData,
                magRec: formData.RecMag ? 'Да' : null,
                publRec: formData.RecPub ? 'Да' : null,
                Red_Diplom: redDiplom ? 'Да' : null,
                NumberProtocol: formData.NumberProtocol || ''
            }));
        }
    }, [formData, redDiplom]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const studentResponse = await axios.get(`http://localhost:5000/students/${id_S}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const resultResponse = await axios.get(`http://localhost:5000/resultComissionMember/GecResult/${id_DSS}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setScoresData(resultResponse.data);
            setDefenderData(studentResponse.data);
            setRedDiplom(studentResponse.data.Red_Diplom === 'Да');  
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
        setChangedFields((prevFields) => ({
            ...prevFields,
            [name]: true
        }));
    };
    
    const handleRecChange = useCallback((field, value) => {
        setDefenderData(prevState => ({
            ...prevState,
            [field]: value ? 'Да' : null
        }));
        if (field === 'Red_Diplom') {
            setRedDiplom(value);
            setChangedFields((prevFields) => ({
                ...prevFields,
                [field]: true
            }));
        }
    }, [setDefenderData, setRedDiplom, setChangedFields]); 

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const dataToSave = {
            id_DSS: id_DSS,
            id_U: id_U,
            id_S: id_S,
            Result: formData.Result,
            RecMagistracy: formData.RecMag ? 'Да' : null,
            RecPublication: formData.RecPub ? 'Да' : null,
            NumberProtocol: formData.NumberProtocol,
            Red_Diplom: redDiplom ? 'Да' : null
        };
        const dataToEdit = {
            id_U: id_U,
            id_S: id_S
        };
    
        // Добавляем изменённые поля в тело запроса
        Object.keys(changedFields).forEach(field => {
            if (changedFields[field]) { 
                if (field === 'RecMag') {
                    dataToEdit['RecMagistracy'] = formData[field] ? 'Да' : null;
                } else if (field === 'RecPub') {
                    dataToEdit['RecPublication'] = formData[field] ? 'Да' : null;
                } else {
                    dataToEdit[field] = formData[field] || defenderData[field];
                }
            }
        });

        console.log(dataToEdit);
        console.log(dataToSave);
        try {
            if (result && parseInt(result) > 0) {
                await axios.put(`http://localhost:5000/resultComissionSecretary/${id_DSS}`, dataToEdit, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                await axios.post(`http://localhost:5000/resultComissionSecretary/create`, dataToSave, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            }
            navigate(`/my-schedule-sec/${id_DS}`);
            localStorage.removeItem('edit');
            localStorage.removeItem('id_DSS');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleBackButton = () => {
        navigate(`/my-schedule-sec/${id_DS}`);
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
                            <th>Оценка</th>
                            <th>Рекомендация в магистратуру</th>
                            <th>Рекомендация к публикации</th>
                            <th>№ Протокола</th>
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
                                <td className={redDiplom ? "table-success" : "table-danger"}>
                                    <Form.Check
                                        type="checkbox"
                                        checked={redDiplom}
                                        onChange={() => handleRecChange('Red_Diplom', !redDiplom)}
                                    />
                                </td>
                                <td>
                                    <Form.Select
                                        type="text"
                                        name="Result"
                                        value={formData.Result}
                                        onChange={handleInputChange}
                                    >
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Select>
                                </td>
                                <td className={formData.RecMag ? "table-success" : "table-danger"}>
                                    <Form.Check
                                        type="checkbox"
                                        name="RecMag"
                                        checked={formData.RecMag}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td className={formData.RecPub ? "table-success" : "table-danger"}>
                                    <Form.Check
                                        type="checkbox"
                                        name="RecPub"
                                        checked={formData.RecPub}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="NumberProtocol"
                                        value={formData.NumberProtocol}
                                        onChange={handleInputChange}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="my-5 mx-5 text-center">
                    <h4 className="">Оценки и рекомендации от членов ГЭК</h4>
                    <table className="table table-striped table-bordered table-light table-hover text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Оценка</th>
                                <th>Рекомендация в магистратуру</th>
                                <th>Рекомендация к публикации</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoresData && (
                                <tr key={scoresData.id}>
                                    <td>{scoresData.averageResult}</td>
                                    <td>{scoresData.RecMagistracy}</td>
                                    <td>{scoresData.RecPublication}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>  
                <Button onClick={handleSave} className="mt-3" variant="primary">Завершить защиту</Button>
            </div>
        </div>
    );
};

export default DefenderScheduleSecretariePage;