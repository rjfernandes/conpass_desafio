import React from 'react'
import logo from '../../assets/img/logo.png'
import { PropTypes } from 'prop-types'

const ConpassLayout = props => (
    <div className={`conpassLayout ${props.className || ''}`}>
        <div className="whiteSection">
            <div className='logoHeader container'>
                <img src={logo} alt='Conpass' />
            </div>
        </div>

        <div className="graySection">
            <div className={`body container ${props.containerClassName || ''}`}>
                <div className="row topBottomMargins">
                    <div className={`${props.headerView ? 'col-md-6' : 'col-md-12'} zeroPadding`}>
                        <h1 className={`title ${props.isTitleCentered ? 'center' : ''}`}>{props.title}</h1>
                    </div>
                    { props.headerView && <div className="col-md-6 zeroPadding">
                        <div className="float-sm-right">
                            {props.headerView}
                        </div>
                    </div>}
                </div>
                {props.children}
            </div>
        </div>
    </div>
)

ConpassLayout.propTypes = {
    title: PropTypes.string.isRequired,
    isTitleCentered: PropTypes.bool,
    headerView: PropTypes.element,
    children: PropTypes.element.isRequired,
}

export default ConpassLayout