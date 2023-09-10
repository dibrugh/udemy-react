import EmployeesListItem from '../employees-list-item/employees-list-item';

import './employees-list.css';

const EmployeesList = ({data}) => {

    const elements = data.map(item => {
        // Деструктуризация по остаточному принципу (получаем id + всё остальные записываем в ...itemProps)
        const {id, ...itemProps} = item;
        return (
            // <EmployeesListItem name={item.name} salary={item.salary}/>
            // Используя spread-оператор
            <EmployeesListItem key={id} {...itemProps}/>
        )
    })

    return (
        // Список формируем переиспользованием компонентов item-а
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployeesList;