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
        // первичная загрузка
        loading: true,
        error: false,
        newItemLoading: false,
        // Чтобы не загрязнять экземпляр MarvelService создаём локальное состояние offset в этом компоненте (не увеличиваем в MarvelService)
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount = () => {
        this.onRequest();
    }

    // При клике на Load more
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLoaded)
            // Отлавливаем возможные ошибки
            .catch(this.onError)
    }

    // Пока загружаются
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    // Когда уже загрузились, помещаем в стейт
    onCharListLoaded = (newCharList) => {
        let ended = false;
        // Делаем проверку, что в запросе не закончились персонажи и пришло 9, как нам нужно
        if (newCharList.length < 9) {
            ended = true;
        }

        // Как только данные загрузятся, loading переходит в false и убирает спиннер
        // Т.к мы хотим дозагружать персонажей, важно сохранять предыдущий state, поэтому передаём в качестве callback
        // Чтобы сформировать список из старого стейта + новый, нужно передать старый в setState
        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? charList.map((item) => <CharItem item={item} onCharSelected={this.props.onCharSelected} />) : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>

                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    // Если персонажи закончились, скрываем кнопку
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                    // стрелочная функция чтобы передавать аргумент
                    onClick={() => this.onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;