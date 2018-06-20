import React from 'react'
import ConpassAvatar from './ConpassAvatar'

const ConpassUploadAvatar = props => {
    let fileRef = null

    const triggerFileUpload = () => fileRef && fileRef.click()

    const convertPickedImageToBase64 = event => {
        const files = event.target.files
        if (!props.onPickedImage || !files || files.length === 0) {
            return
        }

        const pickedFile = files[0]
        const reader = new FileReader()
        reader.onload = e => props.onPickedImage(e.target.result)
        reader.readAsDataURL(pickedFile)
    }

    const newProps = {...props}
    delete newProps.onPickedImage
    delete newProps.image

    return (
        <a className="link conpassUploadAvatar" {...newProps} style={{...props.style, width: props.width, height: props.width }} onClick={triggerFileUpload}>
            <ConpassAvatar {...props} style={{margin: 0}} className="backgroundImage" />
            <div className="text">
                {props.image ? 'Click to Edit image' : 'Click to upload your profile image'}
            </div>
            <input ref={ref => fileRef = ref} className="fileUpload" type="file" onChange={convertPickedImageToBase64} accept="image/*" />
        </a>
    )
}

export default ConpassUploadAvatar