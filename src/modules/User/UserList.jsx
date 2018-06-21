import React from 'react'
import { ConpassLayout, ConpassButton, ConpassAvatar } from '../../components/ConpassLibrary'
import { connect } from 'react-redux'
import { formatDate } from '../../utils/utils'

export class UserList extends React.Component {

    /**
     * Campo inicial para ordenação
     */
    state = {
        orderField: 'createdAt',
        isOrderDesc: true,
    }

    /**
     * Ordenação das colunas
     * Se o campo for o mesmo do state, inverte a ordem
     * Se for diferente, ajusta para o novo campo com a ordenação atual
     */
    setOrder = field => {
        if (this.state.orderField !== field) {
            this.setState({ orderField: field })
        }
        else {
            this.setState( { isOrderDesc: !this.state.isOrderDesc })
        }
    }

    /**
     * Função para ordenação dos usuários 
     */
    orderFnc = (bf, af) => {
        const orderField = this.state.orderField
        const bfValue = orderField === 'firstName' ? `${bf.firstName} ${bf.lastName}` : bf[orderField]
        const afValue = orderField === 'firstName' ? `${af.firstName} ${af.lastName}` : af[orderField]
        return (this.state.isOrderDesc ? afValue > bfValue : afValue < bfValue) ? 1 : -1
    }

    /**
     * Lista dos usuários ordenada
     */
    sortedUsers = () => (this.props.users || []).sort(this.orderFnc)

    render() {
        const users = this.sortedUsers()
        const orderField = this.state.orderField

        return (
            <ConpassLayout
                title="Users"
                headerView={ <ConpassButton isBlue={true} to='/user/add'>Add new user</ConpassButton> }
                className="userList"
            >
                
                <table className="table">
                    <thead>
                        <tr className="userListHeader">
                            <th colSpan={2}>
                                <a className="text link" onClick={() => this.setOrder('firstName')}>
                                    Full Name { orderField === 'firstName' && <i className={`orderIcon fa ${this.state.isOrderDesc ? 'fa-caret-down' : 'fa-caret-up'}`}></i> }
                                </a>
                            </th>
                            <th className="userListSmallColumn">
                                <a className="text link" onClick={() => this.setOrder('createdAt')}>
                                    Created at { orderField === 'createdAt' && <i className={`orderIcon fa ${this.state.isOrderDesc ? 'fa-caret-down' : 'fa-caret-up'}`}></i> }
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map((user, index) => <tr key={index}>
                                                        <td style={{width: 48}}>
                                                            <ConpassAvatar
                                                                value={`${user.firstName} ${user.lastName}`}
                                                                image={user.image}
                                                                width={48}
                                                            />
                                                        </td>
                                                        <td className="middleCell nameCell">
                                                            {user.firstName} {user.lastName}
                                                        </td>
                                                        <td className="middleCell createAtCell">
                                                            {formatDate(user.createdAt)}
                                                        </td>
                                                    </tr>
                                    )
                        }
                        { users.length === 0 && <tr>
                                                    <td colSpan={3}>
                                                        <div className="alert alert-secondary">
                                                            Não há usuários cadastrados
                                                        </div>
                                                    </td>
                                                </tr>
                        }
                    </tbody>
                </table>
            </ConpassLayout>
        )
    }
}

export default connect(state => ({...state}))(UserList)
