import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
// Достаточно только этого компонента, т.к другие включаются уже внутрь его
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Имитируем получение данных с сервера
            data: [
                { name: 'John', salary: 800, increase: false, promotion: true, id: 1 },
                { name: 'Carl', salary: 3800, increase: true, promotion: false, id: 2 },
                { name: 'Grey', salary: 1200, increase: false, promotion: false, id: 3 },
            ],
            term: '',
            // Базовый фильтр
            filter: 'all',
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({ data }) => {
            // Нужно сохранять иммутабельность

            // 1 вариант
            /* const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after]; */

            return {
                /* 2й вариант */
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            promotion: false,
            id: this.maxId++
        }
        this.setState(({ data }) => {
            return {
                data: [...data, newItem]
            }
        })
    }

    onToggleProp = (id, prop) => {
        /*         this.setState(({data}) => {
                    Объемный вариант
                    const index = data.findIndex(elem => elem.id === id);
                    // Старая копия
                    const old = data[index];
                    // Новая
                    const newItem = {...old, increase: !old.increase};
                    // Формируем новый массив, вставляю туда новый айтем
                    const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        
                    return {
                        data: newArr
                    }
                }) */

        this.setState(({ data }) => ({
            data: data.map(item => {
                // Проходимся по каждому объекту и проверяем, чтобы id, который пришёл внутри метода, совпадал с id элемента
                if (item.id === id) {
                    // Возвращаем новый объект, с динамическими свойствами
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        }))
    }
    // Поиск сотрудника
    searchEmp = (items, term) => {
        // Нужно проработать вариант, когда пользователь ввёл строку, а потом стёр
        if (term.length === 0) return items;

        return items.filter(item => {
            // Берём name и ищем подстроку, т.е введенный символ
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        // Запись равносильна {term: term}
        this.setState({ term });
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'promotion': 
                return items.filter(item => item.promotion);
                // React автоматически доставляет break
            case 'salary': 
                return items.filter(item => item.salary > 1000)
            default: 
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    onChangeSalary = (id, newValue) => {
        this.setState(({data}) => ({
            data: data.map(elem => {
                if (elem.id === id) {
                    return {
                        ...elem,
                        salary: newValue,
                    }
                }
                return elem;
            })
        }))
    }

    render() {
        const { data, term, filter } = this.state;
        const employees = data.length;
        const increased = data.filter(elem => elem.increase).length;
        // Итоговые отфильтрованные данные + примененные фильтры. Т.е фильтруем отфильтрованный массив.
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased}
                />

                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}
                />
                <EmployeesAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }
}

export default App;