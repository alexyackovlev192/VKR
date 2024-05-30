/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, ListGroup, Form } from 'react-bootstrap';
import WarningWindow from '../../components/WarningWindow';

const EditGekPage = () => {
    const { id_G } = useParams(); 
    const [membersGek, setMembersGek] = useState([]);
    const [allMembersGek, setAllMembersGek] = useState([]);
    const [secretarieData, setSecretarieData] = useState({});
    const [secretariesData, setSecretariesData] = useState([]); 
    const [showWarningWindow, setShowWarningWindow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchAllMembersData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/gecMembers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            return [];
        }
    };

    const fetchSecretarieData = async () => {
        const token = localStorage.getItem('token');
        try {
            const secretarieIdResponse = await axios.get(`http://localhost:5000/gecs/SecretaryId/${id_G}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const secretarieResponse = await axios.get(`http://localhost:5000/users/${secretarieIdResponse.data.id_U}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            localStorage.setItem('id_U', secretarieIdResponse.data.id_U);

            const secretariesResponse = await axios.get('http://localhost:5000/secretariesGec', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSecretariesData(secretariesResponse.data);
            return secretarieResponse.data;
        } catch (error) {
            console.error('Ошибка при загрузке данных секретаря:', error);
            return {};
        }
    };
    
    const fetchMembersData = async () => {
        const token = localStorage.getItem('token');
        try {
            const compositionsResponse = await axios.get(`http://localhost:5000/gecComposition/${id_G}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const membersGec = await Promise.all(compositionsResponse.data.map(async (comp) => {
                const memberResponse = await axios.get(`http://localhost:5000/users/${comp.id_U}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                return { ...comp, Fullname: memberResponse.data.Fullname };
              }));

            return membersGec;
        } catch (error) {
            console.error('Ошибка при загрузке данных о членах текущей ГЭК:', error);
            return [];
        }
    };

    const filterAndSortAllMembersGek = (allMembers, members) => {
        const memberIds = members.map(member => member.id_U);
        return allMembers
            .filter(member => !memberIds.includes(member.id_U))
            .sort((a, b) => a.Fullname.localeCompare(b.Fullname));
    };

    const fetchData = async () => {
        const [membersGecData, allMembersData, secretarieData] = await Promise.all([
            fetchMembersData(),
            fetchAllMembersData(),
            fetchSecretarieData()
        ]);

        setMembersGek(membersGecData);
        setSecretarieData(secretarieData);

        const filteredAndSortedAllMembersGek = filterAndSortAllMembersGek(allMembersData, membersGecData, secretarieData);
        setAllMembersGek(filteredAndSortedAllMembersGek);
    };


    useEffect(() => {
        fetchData();
    }, [id_G]);

    const handleMemberAdd = (member) => {
        const updatedMembersGek = [...membersGek, member].sort((a, b) => a.Fullname.localeCompare(b.Fullname));
        setMembersGek(updatedMembersGek);
        const updatedAllMembersGek = allMembersGek.filter(m => m.id_U !== member.id_U).sort((a, b) => a.Fullname.localeCompare(b.Fullname));
        setAllMembersGek(updatedAllMembersGek);
    };

    const handleMemberRemove = (member) => {
        const updatedAllMembersGek = [...allMembersGek, member].sort((a, b) => a.Fullname.localeCompare(b.Fullname));
        setAllMembersGek(updatedAllMembersGek);
        const updatedMembersGek = membersGek.filter(m => m.id_U !== member.id_U).sort((a, b) => a.Fullname.localeCompare(b.Fullname));
        setMembersGek(updatedMembersGek);
    };

    const handleSaveGek = async () => {
        if (membersGek.length < 1) {
            setErrorMessage('Состав не сформирован');
            setShowWarningWindow(true);
            return;
          }
        const memberIds = membersGek.map(m => m.id_U);
        const secretaryId = secretarieData.id_U;

        if (memberIds.includes(secretaryId)) {
            setErrorMessage('Секретарь не должен входить в состав комиссии');
            setShowWarningWindow(true);
            return;
        }
        const token = localStorage.getItem('token');
        try { 
            const gecCompositionResponse = await axios.put(`http://localhost:5000/gecComposition/${id_G}`, { memberIds, secretaryId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/gek');
            console.log(gecCompositionResponse.data);
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleSecretaryChange = (e) => {
        const selectedSecretary = secretariesData.find(sec => sec.Fullname === e.target.value);
        setSecretarieData(selectedSecretary);
    };

    const handleCloseWarningWindow = () => {
        setShowWarningWindow(false);
      };

    return (
        <div className="container-fluid text-center my-3">
            <div className="row my-3">
                <Link to={`/gek`} className="col-1">
                    <Button variant="primary" className="">Назад</Button>
                </Link>
                <h4 className="col-10">Редактирование ГЭК</h4>
            </div>
            <div className="row justify-content-evenly">
                <Card style={{ minWidth: '500px', width: '40%', height: '70vh', overflowY: 'auto' }} className="my-2 text-center bg-light">
                    <Card.Header className="fs-4 bg-light">ГЭК №{id_G}</Card.Header>
                    <Card.Body> 
                        <h5 className="my-2">Состав</h5>
                        <ListGroup className="container text-center">
                            {membersGek.map((member, index) => (
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
                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-2">
                                <Form.Select
                                    type="text"
                                    name="Fullname"
                                    onChange={handleSecretaryChange}>
                                    <option value={secretarieData.Fullname}>{secretarieData.Fullname}</option>
                                    {Array.isArray(secretariesData) && secretariesData.map((sec, index) => (
                                        sec.Fullname !== secretarieData.Fullname &&
                                        <option key={index} value={sec.Fullname}>{sec.Fullname}</option>
                                    ))}
                                </Form.Select>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>

                <Card style={{ minWidth: '500px', width: '40%', height: '70vh', overflowY: 'auto' }} className="my-2 text-center bg-light">
                    <Card.Header className="fs-4 bg-light">Список членов ГЭК</Card.Header>
                    <Card.Body>
                        <ListGroup className="container">
                            {allMembersGek.map((member, index) => (
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
            </div>
            <Button variant="primary" className="col-2 my-4" onClick={handleSaveGek}>Сохранить ГЭК</Button>
            <WarningWindow show={showWarningWindow} handleClose={handleCloseWarningWindow} errorMessage={errorMessage} />
        </div>
    );
};

export default EditGekPage;