import React from 'react'
import { Link } from 'react-router-dom'
import { ConpassLayout, ConpassUploadAvatar, ConpassButton } from '../../components/ConpassLibrary'
import { connect } from 'react-redux'
import StoreAction from '../../store/StoreAction'
import moment from 'moment'

export class UserPicture extends React.Component {

    state = {}

    /**
     * Coloca a imagem selecionada no state
     */
    onPickedImage = image => this.setState({ image: image } ) 

    /**
     * Objeto contendo a data de criação e a imagem (se escolhida)
     */
    userToBeSaved = () => ({...JSON.parse(localStorage.getItem('tmpUser')), ...(this.state.image ? { image: this.state.image } : {}), createdAt: moment().format() })

    /**
     * Salvar e retornar para a lista de usuários
     */
    save = () => {
        this.props.dispatch({ type: StoreAction.add, payload: this.userToBeSaved() })
        localStorage.removeItem('tmpUser')
        this.props.history && this.props.history.push('/')
    }

    /**
     * Verifica se existe usuário temporário no storage
     * Caso não exista, direciona para a tela de adicionar usuário
     */
    componentDidMount = () => !localStorage.getItem('tmpUser') && this.props.history && this.props.history.push('/user/add')

    render() {
        return (
            <ConpassLayout
                title="Profile photo"
                isTitleCentered={true}
                className="userUploadImage"
            >
                <div className="centerPage">
                    <ConpassUploadAvatar 
                        width={160}
                        image={this.state.image}
                        style={{ margin: 'auto', marginTop: 20, marginBottom: 45 }}
                        onPickedImage={this.onPickedImage}
                    />

                    <div className="pictureFinishButton">
                        <Link to="/user/add" className="backLink">&lt; Voltar</Link>
                        <ConpassButton icon="chevron-right" onClick={this.save}>
                            Finish
                        </ConpassButton>
                    </div>

                </div>
            </ConpassLayout>
        )
    }
}


export default connect(state => ({...state}))(UserPicture)