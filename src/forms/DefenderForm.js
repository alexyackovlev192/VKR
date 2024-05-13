import React from 'react';
import { Form } from 'react-bootstrap';

const DefenderForm = ({ formData, handleInputChange }) => {
    const { Fullname, Group, Topic, ScientificAdviser, Avg_Mark, Red_Diplom, YearOfDefense, Name_direction } = formData || {};

    return (
    <Form>
        <Form.Group controlId="formFullName">
            <Form.Label>ФИО</Form.Label>
            <Form.Control
            type="text"
            name="Fullname"
            value={Fullname || ""}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formGroup">
            <Form.Label>Группа</Form.Label>
            <Form.Control
            type="text"
            name="Group"
            value={Group || ""}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formTopic">
            <Form.Label>Тема</Form.Label>
            <Form.Control
            type="text"
            name="Topic"
            value={Topic || ""}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formSupervisor">
            <Form.Label>Научрук</Form.Label>
            <Form.Control
            type="text"
            name="ScientificAdviser"
            value={ScientificAdviser || ""}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formAverageGrade">
            <Form.Label>Средний балл</Form.Label>
            <Form.Control
            type="text"
            name="Avg_Mark"
            value={Avg_Mark || ""}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formYear">
            <Form.Label>Год защиты студента</Form.Label>
            <Form.Control
            type="text"
            name="YearOfDefense"
            value={YearOfDefense || ""}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formDirection">
            <Form.Label>Наименование направления</Form.Label>
            <Form.Control
            type="text"
            name="Name_direction"
            value={Name_direction || ""}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formHasHonors">
            <Form.Check
            type="checkbox"
            label="Красный диплом"
            name="Red_Diplom"
            checked={Red_Diplom || ""}
            onChange={handleInputChange}
            />
        </Form.Group>
    </Form>
  );
};

export default DefenderForm;