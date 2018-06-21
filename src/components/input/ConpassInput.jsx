import React from 'react'
import { PropTypes } from 'prop-types'
import { isEmailValid } from '../../utils/utils'

class ConpassInput extends React.Component {

    state = { isInvalid: false, isEmailInvalid: false }

    changeValue = event => {
        const value = event.target.value
        this.props.onChangeText && this.props.onChangeText(value)
    }

    onCheckIfIsValid = () => {
        const { isInvalid, isEmailInvalid } = this.checkIfIsValid()
        this.setState({ isInvalid: isInvalid, isEmailInvalid: isEmailInvalid })
        this.props.afterValidateField && this.props.afterValidateField(!isInvalid && !isEmailInvalid)
    }

    checkIfIsValid = () => {
        const value = (this.props.value && this.props.value.trim()) || ''
        const isEmailInvalid = value !== '' && this.props.type === 'email' && !isEmailValid(value)
        const isInvalid = value === ''
        return {
            isInvalid: isInvalid, 
            isEmailInvalid: isEmailInvalid 
        }
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
                    onChange={this.changeValue}
                    onBlur={this.onCheckIfIsValid}
                />

                { this.props.extraView && this.props.extraView.after }
               
                { this.state.isInvalid && (this.props.blankErrorMessage !== '') && 
                    <small className="form-text errorField">
                        {this.props.blankErrorMessage}
                    </small> 
                }
               
                { this.state.isEmailInvalid && (this.props.invalidEmailMessage !== '') && 
                    <small className="form-text errorField">
                        {this.props.invalidEmailMessage}
                    </small> 
                }
               
            </div>
        )
    }
}

ConpassInput.propTypes = {
    title: PropTypes.string.isRequired,
    blankErrorMessage: PropTypes.string,
    invalidEmailMessage: PropTypes.string,
}
ConpassInput.defaultProps = {
    blankErrorMessage: '',
    invalidEmailMessage: '',
}

export default ConpassInput 