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
                { name: 'John', salary: 800, increase: false, id: 1 },
                { name: 'Carl', salary: 3800, increase: true, id: 2 },
                { name: 'Grey', salary: 1200, increase: false, id: 3 },
            ],
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
            id: this.maxId++
        }
        this.setState(({data}) => {
            return {
                data: [...data, newItem]
            }
        })
    }

    render() {
        return (
            <div className="app">
                <AppInfo />

                <div className="search-panel">
                    <SearchPanel />
                    <AppFilter />
                </div>

                <EmployeesList data={this.state.data}
                    onDelete={this.deleteItem}
                />
                <EmployeesAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }
}

export default App;