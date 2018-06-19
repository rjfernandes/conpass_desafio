import React from 'react'
import { connect } from 'react-redux'
import { ConpassLayout, ConpassButton, ConpassInput, ConpassStepper } from '../../components/ConpassLibrary'
import StoreAction from '../../store/StoreAction'
import moment from 'moment'

class UserAdd extends React.Component {
    state = {}

    fields = ['firstName', 'lastName', 'companyName', 'email', 'password']

    getField = field => ( this.state[field] || { value: '', isValid: false })

    changeValue = field => value => this.setState({ [field] : {...this.getField(field), value: value } })
    setIsValid = field => booValue => this.setState({ [field] : {...this.getField(field), isValid: booValue } })

    /**
     * Checa se cada um dos campos inseridos são válidos
     * Só passa se todos forem válidos
     */
    isValid = () => this.isSamePassword() && [...this.fields, ...['repeatPassword']].reduce((acc, field) => acc && this.getField(field).isValid )

    /**
     * Verifica se é a mesma senha
     */
    isSamePassword = () => {
        const password = this.getField('password')
        const repeatPassword = this.getField('repeatPassword')
        return password.isValid && repeatPassword.isValid && password.value === repeatPassword.value
    }

    /**
     * Salvar as infos
     */
    save = () => {
        let user = {}
        this.fields.forEach(field => user = {...user, [field]: this.getField(field).value})
        this.props.dispatch({ type: StoreAction.tmpUser, payload: user })
        this.props.history.push('/user/picture')
    }

    componentDidMount = () => {
        if (!this.props.tmpUser) {
            return 
        }

        const tmpUser = this.props.tmpUser
        let user = {}
        Object.keys(tmpUser).forEach(key => { 
            if (key !== 'password') {
                user[key] = { value: tmpUser[key], isValid: true }
            }
        })
        this.setState(user)
    }

    render = () => (
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
                    value={this.getField('email').value}
                    onChangeText={this.changeValue('email')}
                    afterValidateField={this.setIsValid('email')}
                />

                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <ConpassInput
                            title="Password"
                            type="password"
                            value={this.getField('password').value}
                            onChangeText={this.changeValue('password')}
                            afterValidateField={this.setIsValid('password')}
                        />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <ConpassInput
                            title="Repeat password"
                            type="password"
                            value={this.getField('repeatPassword').value}
                            onChangeText={this.changeValue('repeatPassword')}
                            afterValidateField={this.setIsValid('repeatPassword')}
                        />
                    </div>
                </div>

                <ConpassButton 
                    disabled={!this.isValid()} 
                    icon='chevron-right'
                    type='submit'
                >
                    NEXT STEP
                </ConpassButton>

            </form>
        </ConpassLayout>
    )
}

export default connect(state => state)(UserAdd)