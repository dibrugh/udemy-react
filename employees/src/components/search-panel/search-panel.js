import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            term: '',
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;
        // Установка локального состояния
        this.setState({term})
        // Пробрасываем локальное состояние наверх
        this.props.onUpdateSearch(term)
    }

    render () {
        return (
            <input 
                type="text" 
                // Классы идут с bootstrap
                className="form-control search-input"
                placeholder="Найти сотрудника"
                // Локальное состояние
                value={this.state.term}
                onChange={this.onUpdateSearch}
                />
        );
    }
}

export default SearchPanel;