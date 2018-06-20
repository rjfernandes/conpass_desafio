import React from 'react'

export default class ConpassInput extends React.Component {

    state = { isInvalid: false, isEmailInvalid: false }

    checkValue = event => {
        const value = event.target.value
        this.props.onChangeText && this.props.onChangeText(value)
    }

    checkIfIsValid = () => {
        const value = (this.props.value && this.props.value.trim()) || ''
        const isEmailInvalid = value !== '' && this.props.type === 'email' && !this.isValidEmail(value)
        const isInvalid = value === ''
        this.setState({ isInvalid: isInvalid, isEmailInvalid: isEmailInvalid })
        this.props.afterValidateField && this.props.afterValidateField(!isInvalid && !isEmailInvalid)
    }

    /**
     * Email
     */
    isValidEmail = email => {
        if (email === '') {
            return false
        }
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return emailPattern.test(email)
    }

    render = () => {
        let props = {...this.props}
        
        const fieldsToDelete = ['onChangeText', 'blankErrorMessage', 'invalidEmailMessage', 'afterValidateField', 'extraView']

        fieldsToDelete.forEach(e => delete props[e])
        
        return (
            <div className="form-group">
                { this.props.extraView && this.props.extraView.before }
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

                { this.props.extraView && this.props.extraView.after }
               
                { this.state.isInvalid && this.props.blankErrorMessage && 
                    <small className="form-text errorField">
                        {this.props.blankErrorMessage}
                    </small> 
                }
               
                { this.state.isEmailInvalid && this.props.invalidEmailMessage && 
                    <small className="form-text errorField">
                        {this.props.invalidEmailMessage}
                    </small> 
                }
               
            </div>
        )
    }
}