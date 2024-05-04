import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import defendersData from '../../data/defendersData.json';

const OpenMySchedulePage = () => {
    const { scheduleId } = useParams();
  
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchText, setSearchText] = useState('');
    const [sortedMembers, setSortedMembers] = useState(defendersData);

    useEffect(() => {
        const defs = defendersData.filter(def => def.id % 2 === 0);
        if (defs.length > 0) {
            setDefenders(defs);
        } else {
            setDefenders([]);
        }
    }, [scheduleId]);

    const sortData = useCallback((column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }

        const sortedData = filteredDefenders.slice().sort((a, b) => {
            if (column === 'averageGrade') {
                return sortOrder === 'asc' ? a[column] - b[column] : b[column] - a[column];
            } else if (column === 'hasHonors') {
                const aValue = a[column] ? 'Да' : 'Нет';
                const bValue = b[column] ? 'Да' : 'Нет';
                return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            } else {
                return sortOrder === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
            }
        }); 

        setSortedMembers(sortedData);
    }, [sortColumn, sortOrder, sortedMembers]);

    const renderSortArrow = (column) => {
        if (sortColumn === column) {
            return sortOrder === 'asc' ? ' ↑' : ' ↓';
        }
        return null;
    };

    const handleSearch = useCallback((e) => {
        setSearchText(e.target.value);
        const filteredData = defendersData.filter((defender) => {
          const { name, group, topic, supervisor, averageGrade, hasHonors } = defender;
          const searchRegExp = new RegExp(e.target.value.trim(), 'i');
          return (
            searchRegExp.test(name) ||
            searchRegExp.test(group) ||
            searchRegExp.test(topic) ||
            searchRegExp.test(supervisor) ||
            searchRegExp.test(averageGrade.toString()) ||
            searchRegExp.test(hasHonors ? 'Да' : 'Нет')
          );
        });
        setSortedMembers(filteredData);
      }, []);

    return (
        <div className="container-fluid text-center my-3">
            <h4 className="col-12">Мои защиты</h4>
            <div className="my-4 mx-5" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Поиск..."
                    value={searchText}
                    onChange={handleSearch}
                />
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th>№</th>
                            <th onClick={() => sortData('name')}>ФИО{renderSortArrow('name')}</th>
                            <th onClick={() => sortData('group')}>Группа{renderSortArrow('group')}</th>
                            <th onClick={() => sortData('topic')}>Тема{renderSortArrow('topic')}</th>
                            <th onClick={() => sortData('supervisor')}>Научрук{renderSortArrow('supervisor')}</th>
                            <th onClick={() => sortData('averageGrade')}>Средний балл{renderSortArrow('averageGrade')}</th>
                            <th onClick={() => sortData('hasHonors')}>Красный диплом{renderSortArrow('hasHonors')}</th>
                            <th>Рекомендация в магистратуру</th>
                            <th>Рекомендация к публикации</th>
                            <th>Оценка</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDefenders.map((defender, index) => (
                            <tr key={defender.id}>
                                <td>{index + 1}</td>
                                <td>{defender.name}</td>
                                <td>{defender.group}</td>
                                <td>{defender.topic}</td>
                                <td>{defender.supervisor}</td>
                                <td>{defender.averageGrade}</td>
                                <td>{defender.hasHonors ? 'Да' : 'Нет'}</td>
                                <td>{defender.magRec ? 'Да' : ''}</td>
                                <td>{defender.publRec ? 'Да' : ''}</td>
                                <td>{defender.result}</td>
                                <td>
                                    <Link to={`/defender-schedule/${defender.id}`}>
                                        <Button variant="primary">Начать</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default OpenMySchedulePage;