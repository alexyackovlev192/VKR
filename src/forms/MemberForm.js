import React from 'react';
import { Form } from 'react-bootstrap';

const MemberForm = ({ formData, handleInputChange }) => {
  const { Fullname, Post, Mail } = formData || {};

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>ФИО</Form.Label>
        <Form.Control
          type="text"
          name="Fullname"
          value={Fullname || ""}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formPosition">
        <Form.Label>Должность</Form.Label>
        <Form.Control
          type="text"
          name="Post"
          value={Post || ""}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Почта</Form.Label>
        <Form.Control
          type="text"
          name="Mail"
          value={Mail || ""}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
};

export default MemberForm;