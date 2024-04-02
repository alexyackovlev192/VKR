import React from 'react';
import Form from 'react-bootstrap/Form';

const MemberForm = ({ formData, handleInputChange, isEditing }) => {
  const { fullName, position, email } = formData || {};

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