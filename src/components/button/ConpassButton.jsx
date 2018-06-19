import React from 'react'
import { Link } from 'react-router-dom';

export default props => {
    const newProps = {...props}
    delete newProps.isBlue
    delete newProps.to

    const btn = `btn baseButton ${props.disabled ? 'disabledButton' : (props.isBlue ? 'blueButton' : 'greenButton')}`

    if (props.to) {
        return (
                <Link to={props.to} className={btn}>
                    {props.children} {props.icon && <i className={`fa fa-${props.icon}`} style={{marginLeft:4}}></i>}
                </Link>
            )
    }

    return (
        <button {...newProps} className={btn}>
            {props.children} {props.icon && <i className={`fa fa-${props.icon}`} style={{marginLeft:4}}></i>}
        </button>
    )
}