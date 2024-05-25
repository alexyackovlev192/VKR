import React from 'react';
import { Form } from 'react-bootstrap';

const UserForm = ({ formData, handleInputChange, isEditMode }) => {
    const { Fullname, Post, Roles, Login, Password, Mail } = formData || {};
    
    const rolesOptions = [
        { id_R: 1, name: 'Администратор' },
        { id_R: 2, name: 'Член комиссии' },
        { id_R: 3, name: 'Технический секретарь' },
        { id_R: 4, name: 'Секретарь комиссии' }
    ];

    return (
        <Form>
            {!isEditMode && (
                <Form.Group controlId="formFullName">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control
                        type="text"
                        name="Fullname"
                        value={Fullname || ""}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
            {!isEditMode && (
                <Form.Group controlId="formPost">
                    <Form.Label>Должность</Form.Label>
                    <Form.Control
                        type="text"
                        name="Post"
                        value={Post || ""}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
                <Form.Group controlId="formRoles">
                    <Form.Label>Роль</Form.Label>
                    {rolesOptions.map((role) => (
                        <Form.Check
                            key={role.id_R}
                            type="checkbox"
                            id={`role-${role.id_R}`}
                            label={role.name}
                            name="Roles"
                            value={role.id_R}
                            checked={Roles ? Roles.includes(role.id_R) : false}
                            onChange={handleInputChange}
                        />
                    ))}
                </Form.Group>
            {!isEditMode && (
                <Form.Group controlId="formLogin">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control
                        type="text"
                        name="Login"
                        value={Login || ""}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
            {!isEditMode && (
                <Form.Group controlId="formPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        name="Password"
                        value={Password || ""}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
            {!isEditMode && (
                <Form.Group controlId="formMail">
                    <Form.Label>Почта</Form.Label>
                    <Form.Control
                        type="text"
                        name="Mail"
                        value={Mail || ""}
                        onChange={handleInputChange}
                    />
                </Form.Group>
            )}
        </Form>
    );
};

export default UserForm;