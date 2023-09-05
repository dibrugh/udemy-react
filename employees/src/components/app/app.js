import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
// Достаточно только этого компонента, т.к другие включаются уже внутрь его
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css'

function App () {
    return (
        <div className="app">
            <AppInfo/> 

            <div className="search-panel">
                <SearchPanel/>
                <AppFilter/>
            </div>

            <EmployeesList/>
            <EmployeesAddForm/>
        </div>
    );
}

export default App;