import React from 'react'
import PropTypes from 'prop-types'

const ConpassAvatar = props => {

    const getInitials = value => {
        const partsValue = value.split(' ')

        const firstPart = partsValue[0]

        if (partsValue.length === 1) {
            return firstPart.substring(0, 1)
        }

        const lastPart = partsValue[partsValue.length - 1]

        return `${firstPart.substring(0, 1)}${lastPart.substring(0, 1)}`
    }

    const style = {...{width: props.width, height: props.width }, ...props.style }

    if (props.image) {
        return <img className="avatarImage" style={style} alt="" src={props.image} />
    }

    const initials = props.value && getInitials(props.value)

    return ( 
        <div className="avatarImage" style={style}>
            <div className="text" style={{ fontSize: initials && props.width * 0.5}}>{ initials || props.instructions }</div>
        </div>
    )
}

ConpassAvatar.propTypes = {
    width: PropTypes.number
}

export default ConpassAvatar