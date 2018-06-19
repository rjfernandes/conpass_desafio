import React from 'react'
import { ConpassLayout, ConpassButton, ConpassAvatar } from '../../components/ConpassLibrary'
import { connect } from 'react-redux'
import moment from 'moment'

class UserList extends React.Component {
    state = {
        isOrderDesc: true,
    }

    formatDate = strDate => moment(strDate).format('MMM D, YYYY, HH:mm')

    usersOrderDesc = () => this.props.users.sort((bf, af) => moment(af.createAt).isSame(moment(bf.createAt)) ? 
                                (af.index > bf.index ? 1 : -1) :
                                moment(af.createAt).isAfter(moment(bf.createAt)) ? 1 : -1
                            )

    usersOrderAsc = () => this.props.users.sort((bf, af) => moment(af.createAt).isSame(moment(bf.createAt)) ? 
                                (af.index < bf.index ? 1 : -1) :
                                moment(af.createAt).isBefore(moment(bf.createAt)) ? 1 : -1
                            )

    render() {
        const users = (this.state.isOrderDesc ? this.usersOrderDesc : this.usersOrderAsc)()

        return (
            <ConpassLayout
                title="Users"
                headerView={ <ConpassButton isBlue={true} to='/user/add'>Add new user</ConpassButton> }
                className="userList"
            >
                
                <table className='table'>
                    <thead>
                        <tr className='userListHeader'>
                            <th colSpan={2}>
                                <div className="text">
                                    Full Name
                                </div>
                            </th>
                            <th className='userListSmallColumn'>
                                <a className="text link" onClick={() => this.setState( { isOrderDesc: !this.state.isOrderDesc })}>
                                    Created at <i className={`fa ${this.state.isOrderDesc ? 'fa-caret-down' : 'fa-caret-up'}`}></i>
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
                                                            {this.formatDate(user.createdAt)}
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

export default connect(store => store)(UserList)
