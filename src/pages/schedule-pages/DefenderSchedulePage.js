import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import defendersData from '../../data/defendersData.json';

const DefenderSchedulePage = () => {
    const { defId } = useParams();
    const [defenders, setDefenders] = useState([]);

    useEffect(() => {
        const defs = defendersData.filter(def => def.id === parseInt(defId));
        setDefenders(defs || []);
    }, [defId]);

    const handleRecChange = useCallback((index, field, value) => {
        const updatedDefenders = [...defenders];
        updatedDefenders[index][field] = value;
        setDefenders(updatedDefenders);
    }, [defenders]);

    const handleRatingChange = useCallback((index, criteria, value) => {
        const updatedDefenders = [...defenders];
        updatedDefenders[index][criteria] = value;
        setDefenders(updatedDefenders);
    }, [defenders]);

    const RatingCriteria = ({ index, criteria }) => {
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
                                name={`rating-${index}-${criteria}`}
                                checked={defenders[index][criteria] === option}
                                onChange={() => handleRatingChange(index, criteria, option)}
                            />
                        ))}
                    </Form.Group>
                </div>
            </div>
        );
    };

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
                        {defenders.map((defender, index) => (
                            <tr key={defender.id}>
                                <td>{index + 1}</td>
                                <td>{defender.name}</td>
                                <td>{defender.group}</td>
                                <td>{defender.topic}</td>
                                <td>{defender.supervisor}</td>
                                <td>{defender.averageGrade}</td>
                                <td>{defender.hasHonors ? 'Да' : 'Нет'}</td>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={defender.magRec}
                                        onChange={(e) => handleRecChange(index, 'magRec', e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        checked={defender.publRec}
                                        onChange={(e) => handleRecChange(index, 'publRec', e.target.checked)}
                                    />
                                </td>
                                <td>{defender.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {defenders.map((_, index) => (
                    <div key={index}>
                        <RatingCriteria index={index} criteria="Актуальность" />
                        <RatingCriteria index={index} criteria="Сложность работы" />
                        <RatingCriteria index={index} criteria="Возможность развития" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DefenderSchedulePage;