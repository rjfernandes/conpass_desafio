import React from 'react'
import PropTypes from 'prop-types'

class ConpassAvatar extends React.Component {

    getInitials = value => {
        const partsValue = (value || '').trim().toUpperCase().split(' ')

        const firstPart = partsValue[0]

        if (partsValue.length === 1) {
            return firstPart.substring(0, 1)
        }

        const lastPart = partsValue[partsValue.length - 1]

        return `${firstPart.substring(0, 1)}${lastPart.substring(0, 1)}`
    }

    render() {
        const props = this.props
        const style = {...{width: props.width, height: props.width }, ...props.style }
        const className = `avatarImage ${props.className || ''}`

        if (props.image) {
            return <img className={className} style={style} alt="" src={props.image} />
        }

        const initials = this.getInitials(props.value)

        return ( 
            <div className={className} style={style}>
                <div className="text" style={{ fontSize: props.width * 0.5}}>{ initials }</div>
            </div>
        )
    }
}

ConpassAvatar.propTypes = {
    width: PropTypes.number.isRequired,
    image: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object,
            ]),
    value: PropTypes.string,
}

export default ConpassAvatar