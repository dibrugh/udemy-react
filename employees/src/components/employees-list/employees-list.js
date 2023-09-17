import EmployeesListItem from '../employees-list-item/employees-list-item';

import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp }) => {

    const elements = data.map(item => {
        // Деструктуризация по остаточному принципу (получаем id + всё остальные записываем в ...itemProps)
        const {id, ...itemProps} = item;
        return (
            // <EmployeesListItem name={item.name} salary={item.salary}/>
            // Используя spread-оператор
            <EmployeesListItem 
            key={id} 
            {...itemProps}
            onDelete={() => onDelete(id)}
            // Нужно передать строку с prop, который мы будем менять. Для этого можно использовать data-аттрибуты (в дочернем компоненте).
            // Во время любого события, вроде клика, первым аргументом автоматически подставляется объект события
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            />
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