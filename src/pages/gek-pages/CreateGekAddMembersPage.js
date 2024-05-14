import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, ListGroup } from 'react-bootstrap';

const CreateGekAddMemberPage = () => {
    const [formData, setFormData] = useState(() => {
        const savedFormData = localStorage.getItem('formData');
        return savedFormData ? JSON.parse(savedFormData) : null;
      });
    const [membersGek, setMembersGek] = useState([]);
    const [allMembersGek, setAllMembersGek] = useState([]);
    var id_S;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/gecMembers', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setAllMembersGek(response.data);
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
    };

    const handleMemberAdd = (member) => {
        const updatedMembersGek = [...membersGek, member];
        setMembersGek(updatedMembersGek);
        const updatedAllMembersGek = allMembersGek.filter(m => m.id_U !== member.id_U);
        setAllMembersGek(updatedAllMembersGek);
    };

    const handleMemberRemove = (member) => {
        const updatedAllMembersGek = [...allMembersGek, member];
        setAllMembersGek(updatedAllMembersGek);
        const updatedMembersGek = membersGek.filter(m => m.id_U !== member.id_U);
        setMembersGek(updatedMembersGek);
    };

    const sortedMembersGek = membersGek.slice().sort((a, b) => a.Fullname.localeCompare(b.Fullname));
    const sortedAllMembersGek = allMembersGek.slice().sort((a, b) => a.Fullname.localeCompare(b.Fullname));


    const handleSaveGek = (data) => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:5000/students/create', data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log('Новая гэк создана:', response.data);
          })
          .catch(error => console.error('Ошибка при создании гэк:', error));
          

        axios.get('http://localhost:5000/gecs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            id_S = response.data.length - 1;
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));


        axios.post(`http://localhost:5000/gecComposition/${id_S}`, membersGek.map(m => m.id_U), formData.Fullname, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => {
              console.log('Новая гэк создана:', response.data);
              localStorage.removeItem('formData');
            })
            .catch(error => console.error('Ошибка при создании гэк:', error));

        localStorage.removeItem('formData');
        setFormData(null);
      };


    return (
        <div className="container-fluid text-center my-3">
            <div className="row my-3">
                <Link to={`/create-gek`} className="col-1">
                    <Button variant="primary" className="">Назад</Button>
                </Link>
                <h4 className="col-10">Создание ГЭК</h4>
            </div>
            <div className="row justify-content-evenly">
                <Card style={{ minWidth: '500px', width: '40%', height: '70vh', overflowY: 'auto' }} className="my-2 text-center bg-light">
                    <Card.Header className="fs-4 bg-light">Новая ГЭК</Card.Header>
                    <Card.Body> 
                        <h5 className="my-2">Состав</h5>
                        <ListGroup className="container text-center">
                            {sortedMembersGek.map((member, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-2">
                                    <span className="mx-3">{member.Fullname}</span>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleMemberRemove(member)}
                                        className="mx-3"
                                    >Удалить</Button>
                                </ListGroup.Item>
                            ))}    
                        </ListGroup>
                        <h5 className="my-2">Секретарь ГЭК</h5>
                        <ListGroup className="container text-center">
                            <ListGroup.Item  className="d-flex justify-content-between align-items-center py-2">
                                <span className="mx-3">{formData.Fullname}</span>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>

                <Card style={{ minWidth: '500px', width: '40%', height: '70vh', overflowY: 'auto' }} className="my-2 text-center bg-light">
                    <Card.Header className="fs-4 bg-light">Члены ГЭК</Card.Header>
                    <Card.Body>
                        <ListGroup className="container">
                            {sortedAllMembersGek.map((member, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-2">
                                    <span className="mx-3">{member.Fullname}</span>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => handleMemberAdd(member)}
                                        className="mx-3"
                                    >Добавить</Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
                <Link to={ `/gek` }>
                    <Button variant="primary" className="col-2 my-4" onClick={handleSaveGek(formData)}>Создать ГЭК</Button>
                </Link>
            </div>
        </div>
    );
};

export default CreateGekAddMemberPage;