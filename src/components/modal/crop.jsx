import { useEffect } from 'react'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../../lib/crop'
import Modal from './Modal'

const Crop = ({ img, w, h, setcroppedUrl, setModal }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const [previeModal, setPrevieModal] = useState(false)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])


    const onClickHandler = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(img, croppedAreaPixels)
            setcroppedUrl(croppedImage)
            setCroppedImage(croppedImage)
        } catch (error) {
            console.log({ error })
        }
        setModal(false)
    })
    useEffect(() => {

    }, [zoom, croppedAreaPixels, croppedImage, previeModal])

    const newUrl = croppedImage && URL.createObjectURL(croppedImage)

    const onCancel = () => {
        setCroppedImage(null)
        setModal(false)
    }

    // const preview = async() => {
    //     try {
    //         const croppedImage = await getCroppedImg(img, croppedAreaPixels)
    //         setCroppedImage(croppedImage)
    //     } catch (error) {
    //         console.log({ error })
    //     }
    // }

    return (
        <div className="connectme__cropper">
            <div className="connectme__cropper-action">
                <div className="upload" onClick={onClickHandler}>
                    <h2>Crop & Upload</h2>
                </div>
                {/* <div className="crop" onClick={preview}>
                    <h2>Preview</h2>
                </div> */}
                <div className="cancel" onClick={onCancel}>
                    <h2>Cancel</h2>
                </div>
            </div>
            <div className="connectme__cropper-container">
                <Cropper
                    image={img}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onZoomChange={setZoom}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    cropSize={{ width: w, height: h }}
                />
            </div>
            
        </div>
    )
}

export default Crop