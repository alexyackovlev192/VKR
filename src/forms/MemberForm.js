import React from 'react';
import { Form } from 'react-bootstrap';

const MemberForm = ({ formData, handleInputChange, members}) => {
  const { Fullname, Post, Mail } = formData || {};

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>ФИО</Form.Label>
        <Form.Control
          aria-label="Default select example"
          type="text"
          name="Fullname"
          value={Fullname || ""}
          onChange={handleInputChange}
        >
          {/* <option value="Fullname">{Fullname}</option>
          {members.map((member, index) => (
            <option key={index} value={member.Fullname}>{member.Fullname}</option>
          ))} */}
        </Form.Control>
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