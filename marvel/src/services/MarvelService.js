
// Class на нативном JS, поэтому не нужно extends Component
class MarvelService {
    // Формируем базовый путь и ключ
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f82fb1b4de23f8833770901066aedc4c';
    // Создаём функцию, которая будет возвращать данные в формате JSON
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        // Преобразовываем каждый элемент
        return res.data.results.map(this._transformCharacter);
    }

    // Т.к getResource асинхронная
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    // Функция, которая формирует объект только с нужными данными для избежания дублирования кода в других компонентах
    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description.length ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}

export default MarvelService;