
// Class на нативном JS, поэтому не нужно extends Component
class MarvelService {
    // Формируем базовый путь и ключ
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f82fb1b4de23f8833770901066aedc4c';
    // Создаём функцию, которая будет возвращать данные в формате JSON
    getResource = async (url) => {
        let res = await fetch (url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?
        limit=9&offset=210&${this._apiKey}`);
    }
}

export default MarvelService;