import React from 'react';
import { Form } from 'react-bootstrap';

const MemberForm = ({ formData, handleInputChange  }) => {
  const { name, position, email } = formData || {};

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>ФИО</Form.Label>
        <Form.Select
          aria-label="Default select example"
          type="text"
          name="name"
          defaultValue={name || ""}
          onChange={(e) => handleInputChange(e)}
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
          value={position || ""}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Почта</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={email || ""}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
};

export default MemberForm;