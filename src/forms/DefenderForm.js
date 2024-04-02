import React from 'react';
import Form from 'react-bootstrap/Form';

const DefenderForm = ({ formData, handleInputChange, isEditing }) => {
    const { fullName, group, topic, supervisor, averageGrade, hasHonors } = formData || {};

    return (
    <Form>
        <Form.Group controlId="formFullName">
            <Form.Label>ФИО</Form.Label>
            <Form.Control
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleInputChange}
            readOnly={isEditing}
            />
        </Form.Group>
        <Form.Group controlId="formGroup">
            <Form.Label>Группа</Form.Label>
            <Form.Control
            type="text"
            name="group"
            value={group}
            onChange={handleInputChange}
            readOnly={isEditing}
            />
        </Form.Group>
        <Form.Group controlId="formTopic">
            <Form.Label>Тема</Form.Label>
            <Form.Control
            type="text"
            name="topic"
            value={topic}
            onChange={handleInputChange}
            readOnly={isEditing}
            />
        </Form.Group>
        <Form.Group controlId="formSupervisor">
            <Form.Label>Научрук</Form.Label>
            <Form.Control
            type="text"
            name="supervisor"
            value={supervisor}
            onChange={handleInputChange}
            readOnly={isEditing}
            />
        </Form.Group>
        <Form.Group controlId="formAverageGrade">
            <Form.Label>Средний балл</Form.Label>
            <Form.Control
            type="text"
            name="averageGrade"
            value={averageGrade}
            onChange={handleInputChange}
            readOnly={isEditing}
            />
        </Form.Group>
        <Form.Group controlId="formHasHonors">
            <Form.Check
            type="checkbox"
            label="Красный диплом"
            name="hasHonors"
            checked={hasHonors}
            onChange={handleInputChange}
            disabled={isEditing}
            />
        </Form.Group>
        </Form>
  );
};

export default DefenderForm;