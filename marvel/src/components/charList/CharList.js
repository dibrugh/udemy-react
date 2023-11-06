import './charList.scss';

import MarvelService from '../../services/MarvelService';
import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import CharItem from '../charItem/CharItem';

class CharList extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        charList: [],
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded)
            // Отлавливаем возможные ошибки
            .catch(this.onError)
    }

    // Если персонаж загрузился, помещаем в стейт
    onCharListLoaded = (charList) => {
        // Как только данные загрузятся, loading переходит в false и убирает спиннер
        this.setState({
            charList,
            loading: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const { loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? this.state.charList.map((item) => <CharItem item={item} onCharSelected={this.props.onCharSelected}/>) : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>

                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;