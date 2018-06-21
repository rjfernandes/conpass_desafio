import React from 'react'
import { ConpassLayout, ConpassButton, ConpassInput, ConpassStepper } from '../../components/ConpassLibrary'
import { isEmailValid } from '../../utils/utils'

export default class UserAdd extends React.Component {
    state = {}

    fields = ['firstName', 'lastName', 'companyName']

    /**
     * Busca o campo e sua validação dentro do state
     */
    getField = field => ( this.state[field] || { value: '', isValid: false })

    /**
     * Altera o valor do campo dentro do state
     */
    changeValue = field => value => this.setState({ [field] : {...this.getField(field), value: value } })

    /**
     * Altera o isValid do campo dentro do state
     */
    setIsValid = field => boolValue => this.setState({ [field] : {...this.getField(field), isValid: boolValue } })

    /**
     * Checa se cada um dos campos inseridos são válidos
     * Só passa se todos forem válidos
     */
    isFormValid = () => this.isSamePassword() && this.isEmailValid() && this.fields.reduce((acc, field) => acc && this.getField(field).isValid && this.getField(field).value.trim() !== '' )

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
     * Email
     */
    isEmailValid = () => isEmailValid(this.getField('email').value)

    /**
     * Salvar as infos
     */
    save = () => {
        let user = {}
        const fields = [...this.fields, ...['email', 'password', 'repeatPassword']]
        fields.forEach(field => user = {...user, [field]: this.getField(field).value})
        localStorage.setItem('tmpUser', JSON.stringify(user))
        this.props.history && this.props.history.push('/user/picture')
    }

    /**
     * Monta o objeto na estrutura para verificação do form e armazena no state
     */
    mountUserIntoState = tmpUser => {
        let user = {}
        Object.keys(tmpUser).forEach(key => user[key] = { value: tmpUser[key], isValid: true } )
        this.setState(user)
    }

    /**
     * Busca o usuário temporário armazenado no localStorage e envia para montagem do state
     */
    componentDidMount = () => {
        const tmpUser = JSON.parse(localStorage.getItem('tmpUser') || '{}')
        this.mountUserIntoState(tmpUser)
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
                                blankErrorMessage={hasPassword ? "" : "Password can't be blank"}
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
                                blankErrorMessage={hasRepeatPassword ? "" : "Repeat password can't be blank"}
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
