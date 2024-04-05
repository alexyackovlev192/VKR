import React from 'react';
import { Form } from 'react-bootstrap';

const MemberForm = ({ formData, handleInputChange, isEditing }) => {
  const { name, position, email } = formData || {};

  return (
    <Form>
      <Form.Group controlId="formFullName">
        <Form.Label>ФИО</Form.Label>
        <Form.Select
          type="text"
          name="fullName"
          value={name}
          onChange={handleInputChange}
          readOnly={isEditing}
        >
          <option value={name}>{name}</option>
          <option value="Петров Петр Петрович">Петров Петр Петрович</option>
          <option value="Сидоров Сидор Сидорович">Сидоров Сидор Сидорович</option>
          <option value="Алексеев Алексей Алексеевич">Алексеев Алексей Алексеевич</option>
      </Form.Select>
      </Form.Group>
      <Form.Group controlId="formPosition">
        <Form.Label>Должность</Form.Label>
        <Form.Control
          type="text"
          name="position"
          value={position}
          onChange={handleInputChange}
          readOnly={isEditing}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Почта</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          readOnly={isEditing}
        />
      </Form.Group>
    </Form>
  );
};

export default MemberForm;