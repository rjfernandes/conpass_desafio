import React from 'react'
import { connect } from 'react-redux'
import { ConpassLayout, ConpassButton, ConpassInput, ConpassStepper } from '../../components/ConpassLibrary'

class UserAdd extends React.Component {
    state = {}

    fields = ['firstName', 'lastName', 'companyName', 'email']

    getField = field => ( this.state[field] || { value: '', isValid: false })

    changeValue = field => value => this.setState({ [field] : {...this.getField(field), value: value } })
    setIsValid = field => boolValue => this.setState({ [field] : {...this.getField(field), isValid: boolValue } })

    /**
     * Checa se cada um dos campos inseridos são válidos
     * Só passa se todos forem válidos
     */
    isFormValid = () => this.isSamePassword() && this.fields.reduce((acc, field) => acc && this.getField(field).isValid && this.getField(field).value.trim() !== '' )

    /**
     * Senhas
     */
    bothPasswords = () => {
        const password = this.getField('password')
        const repeatPassword = this.getField('repeatPassword')
        const hasPasswords = password.value.trim() !== '' && repeatPassword.value.trim() !== ''

        return {
            hasPasswords: hasPasswords,
            hasPassword: password.value.trim() !== '',
            hasRepeatPassword: repeatPassword.value.trim() !== '',
            areEquals: hasPasswords && password.value.trim() === repeatPassword.value.trim()
        }
    }

    isSamePassword = () => this.bothPasswords().areEquals

    isNotSamePassword = () => {
        const { hasPasswords, areEquals } = this.bothPasswords()
        if (!hasPasswords) {
            return false
        }
        return !areEquals
    }

    /**
     * Salvar as infos
     */
    save = () => {
        let user = {}
        const fields = [...this.fields, ...['password', 'repeatPassword']]
        fields.forEach(field => user = {...user, [field]: this.getField(field).value})
        localStorage.setItem('tmpUser', JSON.stringify(user))
        this.props.history.push('/user/picture')
    }

    componentDidMount = () => {
        const tmpUser = JSON.parse(localStorage.getItem('tmpUser') || '{}')
        let user = {}
        Object.keys(tmpUser).forEach(key => user[key] = { value: tmpUser[key], isValid: true } )
        this.setState(user)
    }

    render = () => {

        const { hasPassword, hasRepeatPassword } = this.bothPasswords()

        return (
            <ConpassLayout
                title="Register"
                containerClassName="userAdd"
                headerView={
                    <ConpassStepper
                        current={1}
                        total={2}
                    />

                }
            >
                <form onSubmit={this.save} autoComplete='on'>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <ConpassInput
                                title="First Name"
                                placeholder="John"
                                blankErrorMessage="First Name can't be blank"
                                value={this.getField('firstName').value}
                                onChangeText={this.changeValue('firstName')}
                                afterValidateField={this.setIsValid('firstName')}
                            />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <ConpassInput
                                title="Last Name"
                                placeholder="Michael"
                                blankErrorMessage="Last Name can't be blank"
                                value={this.getField('lastName').value}
                                onChangeText={this.changeValue('lastName')}
                                afterValidateField={this.setIsValid('lastName')}
                            />
                        </div>
                    </div>

                    <ConpassInput
                        title="Company Name"
                        placeholder="Apple Inc"
                        blankErrorMessage="Company Name can't be blank"
                        value={this.getField('companyName').value}
                        onChangeText={this.changeValue('companyName')}
                        afterValidateField={this.setIsValid('companyName')}
                    />

                    <ConpassInput
                        title="Email"
                        type="email"
                        placeholder="name@company.com"
                        blankErrorMessage="Email can't be blank"
                        invalidEmailMessage="Invalid email address"
                        value={this.getField('email').value}
                        onChangeText={this.changeValue('email')}
                        afterValidateField={this.setIsValid('email')}
                    />

                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <ConpassInput
                                title="Password"
                                type="password"
                                blankErrorMessage={!hasPassword && "Password can't be blank"}
                                value={this.getField('password').value}
                                onChangeText={this.changeValue('password')}
                                afterValidateField={this.setIsValid('password')}
                                extraView={{
                                    after: this.isNotSamePassword() && <small className="errorField">Passwords must be equals</small> 
                                }}
                            />
                            
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <ConpassInput
                                title="Repeat password"
                                type="password"
                                blankErrorMessage={!hasRepeatPassword && "Repeat password can't be blank"}
                                value={this.getField('repeatPassword').value}
                                onChangeText={this.changeValue('repeatPassword')}
                                afterValidateField={this.setIsValid('repeatPassword')}
                            />
                        </div>
                    </div>

                    <ConpassButton 
                        disabled={!this.isFormValid()} 
                        icon='chevron-right'
                        type='submit'
                    >
                        NEXT STEP
                    </ConpassButton>

                </form>
            </ConpassLayout>
        )
    }
}

export default connect(state => state)(UserAdd)