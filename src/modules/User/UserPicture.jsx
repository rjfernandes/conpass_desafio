import React from 'react'
import { Link } from 'react-router-dom'
import { ConpassLayout, ConpassAvatar, ConpassButton } from '../../components/ConpassLibrary'
import { connect } from 'react-redux'
import StoreAction from '../../store/StoreAction'
import moment from 'moment'

class UserPicture extends React.Component {

    state = {}

    save = () => {
        const user = {...this.props.tmpUser, ...(this.state.image ? { image: this.state.image } : {}), createAt: moment().format() }
        this.props.dispatch({ type: StoreAction.add, payload: user })
        this.props.history.push('/')
    }

    render() {
        return (
            <ConpassLayout
                title="Profile photo"
                isTitleCentered={true}
                className="userUploadImage"
            >
                <div className="centerPage">
                    <ConpassAvatar 
                        instructions="Click to upload your profile image"
                        width={160}
                        style={{ margin: 'auto', marginTop: 20, marginBottom: 30 }}
                    />

                    <div className='pictureFinishButton'>
                        <Link to='/user/add' className='backLink'><i className="fa fa-chevron-left"></i> Voltar</Link>
                        <ConpassButton icon='chevron-right' onClick={this.save}>
                            Finish
                        </ConpassButton>
                    </div>

                </div>
            </ConpassLayout>
        )
    }
}


export default connect(state => state)(UserPicture)