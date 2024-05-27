import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';
import geksData from '../../data/geksData.json';

const EditListDefendersForSchedulePage = () => {
    const { id_DS } = useParams(); // Получаем параметр маршрута
    const [membersGek, setMembersGek] = useState([]);
    const [secretariesGek, setSecretariesGek] = useState([]);
    const [allMembersGek, setAllMembersGek] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Состав'); // Добавляем состояние для выбранной категории

    useEffect(() => {
        // Находим данные выбранной ГЭК по идентификатору из параметра маршрута
        const gek = geksData.find(gek => gek.id === parseInt(id_DS));
        if (gek) {
            setMembersGek(gek.members || []);
            setSecretariesGek(gek.secretaries || []);
        }
        const filteredMembersData = membersData.filter(member => {
            return !gek || !gek.members.find(gekMember => gekMember.id === member.id);
        });
    
        // Устанавливаем отфильтрованные данные в setAllMembersGek
        setAllMembersGek(filteredMembersData);
    }, [gekId]);
    
    const handleMemberAdd = (member) => {
        // Добавить участника в выбранную категорию
        if (selectedCategory === 'Состав') {
            setMembersGek([...membersGek, member]);
        } else if (selectedCategory === 'Секретари') {
            setSecretariesGek([...secretariesGek, member]);
        }
        
        // Удалить участника из списка доступных участников
        const updatedMembers = allMembersGek.filter(m => m.id !== member.id);
        setAllMembersGek(updatedMembers);
    };
        
    const handleMemberRemove = (member) => {
        // Добавить участника обратно в список доступных участников
        setAllMembersGek([...allMembersGek, member]);
        
        // Удалить участника из списка текущих участников
        const updatedMembers = membersGek.filter(m => m.id !== member.id);
        setMembersGek(updatedMembers);
    };

    const handleSecretarieRemove = (member) => {
        // Добавить участника обратно в список доступных участников
        setAllMembersGek([...allMembersGek, member]);
        
        // Удалить участника из списка текущих участников
        const updatedSecretaries = secretariesGek.filter(m => m.id !== member.id);
        setSecretariesGek(updatedSecretaries);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Сортировка по алфавиту ФИО
    const sortedMembersGek = membersGek.slice().sort((a, b) => a.name.localeCompare(b.name));
    const sortedSecretariesGek = secretariesGek.slice().sort((a, b) => a.name.localeCompare(b.name));
    const sortedAllMembersGek = allMembersGek.slice().sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="container-fluid text-center my-3">
        <div className="row my-3">
            <Link to={`/gek`} className="col-1">
                <Button variant="primary" className="">Назад</Button>
            </Link>
            <h4 className="col-10">Редактирование ГЭК</h4>
        </div>
      <div className="row justify-content-evenly">
        <Card style={{ minWidth: '500px', width: '40%', height: '80vh', overflowY: 'auto' }} className="my-2 text-center bg-light">
            <Card.Header className="fs-4 bg-light">Текущие члены ГЭК №{gekId}</Card.Header>
            <Card.Body> 
                <Button 
                    variant={selectedCategory === 'Состав' ? 'primary' : 'secondary'} 
                    onClick={() => handleCategoryChange('Состав')}
                    className="mx-3 my-2"
                >Состав</Button>
                <ListGroup className="container text-center">
                    {sortedMembersGek.map((member, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-2">
                        <span className="mx-3">{member.name}</span>
                        <Button 
                            variant="danger" 
                            onClick={() => handleMemberRemove(member)}
                            className="mx-3"
                        >Удалить</Button>
                    </ListGroup.Item>
                    ))}    
                </ListGroup>
                <Button 
                    variant={selectedCategory === 'Секретари' ? 'primary' : 'secondary'} 
                    onClick={() => handleCategoryChange('Секретари')}
                    className="mx-2 my-2"
                >Секретари</Button>
                <ListGroup className="container text-center">
                    {sortedSecretariesGek.map((member, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-2">
                        <span className="mx-3">{member.name}</span>
                        <Button 
                            variant="danger" 
                            onClick={() => handleSecretarieRemove(member)}
                            className="mx-3"
                        >Удалить</Button>
                    </ListGroup.Item>
                    ))}    
                </ListGroup>
            </Card.Body>
        </Card>
    
        <Card style={{ minWidth: '500px', width: '40%', height: '80vh', overflowY: 'auto' }} className="my-2 text-center bg-light">
            <Card.Body>
                <Card.Title className="text-center fs-4">Члены ГЭК</Card.Title>
                <ListGroup className="container">
                    {sortedAllMembersGek.map((member, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center py-2">
                        <span className="mx-3">{member.name}</span>
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
    </div>
  );
};

export default EditListDefendersForSchedulePage;