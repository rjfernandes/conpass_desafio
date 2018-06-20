import React from 'react'

const ConpassStepper = props => {

    const items = Array(props.total).fill({}).map((item, index) => ({ step: index + 1, isSelected: index + 1 === props.current }) )

    return (
        <div className="conpassStepper">
            
            {items.map(item => <div className="inline" key={item.step} >
                                    <span 
                                        style={{
                                            width: 40 * (item.isSelected ? 1 : 0.7),
                                            height: 40 * (item.isSelected ? 1 : 0.7),
                                        }} 
                                        className={`rounded ${item.isSelected ? 'full' : 'empty'}`}
                                    > 
                                        { item.step } 
                                    </span>
                                </div>
                    )}
            <div className="middleLine" />
        </div>
    )
}

export default ConpassStepper