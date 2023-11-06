import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    // Вызывается после создания компонента на странице, в этот момент можно выполнять запросы на сервер, подписываться, выполнять асинхр. 
    componentDidMount() {
        this.updateChar();
    }

    // предыщие Props и State нужны для того, чтобы не получить бесконечный цикл, т.к setState вызывает ререндер
    componentDidUpdate(prevProps, prevState) {
        // Избегаем попадание в бесконечный цикл + не запускаем перерисовку, если пользователь кликает несколько раз по 1 персонажу
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    // Обновление компонента по клику
    updateChar = () => {
        const { charId } = this.props;
        // Если id не приходит в props, ретурним
        if (!charId) {
            return;
        }

        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    // Если персонаж загрузился, помещаем в стейт
    onCharLoaded = (char) => {
        // Как только данные загрузятся, loading переходит в false и убирает спиннер
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    // Крутим спиннер пока получаем данные
    onCharLoading = () => {
        this.setState({
            loading: true,
        })
    }

    render() {
        const { char, loading, error } = this.state;
        // Условный рендеринг

        // Если не загружен персонаж, не загрузка, не ошибка, то отображаем Skeleton в качестве заглушки
        const skeleton = char || loading || error ? null : <Skeleton />
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        // Не загрузка, не ошибка, но есть персонаж !(!char)
        const content = !(loading || error || !char) ? <View char={char} /> : null;
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

// Разделяем компонент выше на 2 компонента: View и State
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Unfortunately, there are no comics...'}
                {
                    // Список комиксов меняться не будет, поэтому можно индекс использовать в качестве key
                    comics.map((item, i) => {
                        // Если комиксов больше 9, выходим из цикла. Но на больших числах такое лучше не использовать, т.к каждый раз
                        // идёт проверка и просто выход из условия.
                        if (i > 9) return;
                        return (
                            <li ket={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;