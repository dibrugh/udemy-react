import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        // Названия name-ов беру из switch цикла в app.js
        { name: 'all', label: 'Все сотрудники' },
        { name: 'promotion', label: 'На повышение' },
        { name: 'salary', label: 'З/П больше 1000$' },
    ];

    // Динамически отрисовываем кнопки
    const buttons = buttonsData.map(({ name, label }) => {
        // В props передаю дефолтное значение filter, т.е all
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';

        return (
            <button
                type="button"
                className={`btn ${clazz}`}
                key={name}
                // Через стрелочную функцию, т.к нужно передать аргумент
                onClick={() => props.onFilterSelect(name)}
                >
                {label}
            </button>
        )
    })

    return (
        // Встроенный BS класс
        <div className="btn-group">
            {buttons}
        </div>
    );
}

export default AppFilter;