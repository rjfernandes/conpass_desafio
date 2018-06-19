import React from 'react'

export default class ConpassInput extends React.Component {

    state = { isInvalid: false }

    checkValue = event => {
        const value = event.target.value
        this.props.onChangeText && this.props.onChangeText(value)
    }

    checkIfIsValid = () => {
        const value = (this.props.value && this.props.value.trim()) || ''
        const isInvalid = value === '' || (this.props.type === 'email' && value.indexOf('@') <= 0)
        this.setState({ isInvalid: isInvalid  })
        this.props.afterValidateField && this.props.afterValidateField(!isInvalid)
    }

    render = () => {
        let props = {...this.props}
        delete props.onChangeText
        delete props.blankErrorMessage
        delete props.afterValidateField

        return (
            <div className="form-group">
                <label>{props.title}</label>
                <input 
                    {...props}
                    type={props.type || 'text'} 
                    autoComplete={props.title && props.title.replace(/ /g, '-').toLowerCase()}
                    placeholder={props.placeholder && `i.e ${props.placeholder}`} 
                    className={`form-control ${props.className || 'blueBorderInput'}`}
                    onChange={this.checkValue}
                    onBlur={this.checkIfIsValid}
                />
                { this.state.isInvalid && <small className="form-text errorField">
                    {this.props.blankErrorMessage}
                </small> }
            </div>
        )
    }
}