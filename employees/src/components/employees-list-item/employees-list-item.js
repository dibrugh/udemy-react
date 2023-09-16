import { Component } from 'react';

import './emplooyees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            increase: false,
            promotion: false,
        }
    }

    onIncrease = () => {
        // Чтобы сохранять предыдущее состояние, используем callback, который принимает state.
        // Чтобы не писать state.increase, используем деструктуризацию
        this.setState(({increase}) => ({
            increase: !increase,
        }))
    }

    onPromotion = () => {
        this.setState(({promotion}) => ({
            promotion: !promotion,
        }))
    }

    render() {
        const {name, salary, onDelete} = this.props;
        const {increase, promotion} = this.state;

        let classNames = "list-group-item d-flex justify-content-between";
        increase && (classNames += ' increase');
        promotion && (classNames += ' like');

        return (
            <li className={classNames}>
                <span className="list-group-item-label"
                onClick={this.onPromotion}
                >{name}</span>
                <input type="text" className="list-group-item-input" defaultValue={salary + '$'} />
                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className="btn-cookie btn-sm "
                        onClick={this.onIncrease}
                        >
                        <i className="fas fa-cookie"></i>
                    </button>

                    <button type="button"
                        className="btn-trash btn-sm "
                        onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
        );
    }

}

export default EmployeesListItem;


// Задание
// Клик должен быть по сотруднику, т.е по span. При клике должен добавляться класс .like (появление звёздочки)