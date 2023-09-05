import './search-panel.css';

const SearchPanel = () => {
    return (
        <input 
            type="text" 
            // Классы идут с bootstrap
            className="form-control search-input"
            placeholder="Найти сотрудника"
            />
    );
}

export default SearchPanel;