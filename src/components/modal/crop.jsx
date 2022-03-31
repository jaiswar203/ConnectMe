import { useState,useCallback } from 'react'
import Cropper from 'react-easy-crop'

const Crop = ({img}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    return (
        <div className="connectme__cropper">
            <Cropper
                image={img}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                cropSize={{width: 500,height: 500}}

            />
        </div>
    )
}

export default Crop