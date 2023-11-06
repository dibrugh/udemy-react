import React, { Component } from 'react'
import ErrorMessage from '../errorMessage/ErrorMessage'


// Error boundaries (только классовые компоненты, который оборачивает предохраняемый компонент)
// Отлавливают ошибки только в методах render, жизненного цикла, constructor дочерних компонентов
// ! Не ловят ошибки в обработчиках событий (напр. OnClick(() => {})), в асинхронном коде, в предохранителе, внутри серверного рендеринга
export class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    // Занимается только обновлением состояния, что-то вроде setState для ошибок
/*     static getDerivedStateFromError(error) {
        return {error: true};
    } */

    // Принимает ошибку и объект компонента, в котором произошла ошибка
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        return this.props.children;
    }
}

export default ErrorBoundary