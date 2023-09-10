import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
// Достаточно только этого компонента, т.к другие включаются уже внутрь его
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'

function App () {
    // Имитируем получение данных с сервера
    const data = [
        {name: 'John', salary: 800, increase: false, id: 1},
        {name: 'Carl', salary: 3800, increase: true, id: 2},
        {name: 'Grey', salary: 1200, increase: false, id: 3},
    ];

    return (
        <div className="app">
            <AppInfo/> 

            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>

            <EmployeesList data={data}/>
            <EmployeesAddForm/>
        </div>
    );
}

export default App;