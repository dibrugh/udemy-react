import React, { Component } from 'react'
import './charItem.scss'

export class CharItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let imgStyle = { 'objectFit': 'cover' };
        if(this.props.item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = { 'objectFit': 'unset' };
        }
        console.log(this.props.item.thumbnail)
        return (
            <li
                className="char__item"
                key={this.props.item.id}>
                <img src={this.props.item.thumbnail} alt={this.props.item.name} style={imgStyle} />
                <div className="char__name">{this.props.item.name}</div>
            </li>
        )
    }
}


export default CharItem