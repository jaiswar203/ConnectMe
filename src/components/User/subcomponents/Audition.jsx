import React, { useEffect, useState } from 'react'


const Audition = ({ isYoutube = true, edit,openHandler ,data}) => {
    
    useEffect(() => {

    }, [])
    return (
        <div className="connectme__user-audition">
            <div className="connectme__user-audition__title">
                <h1>Audition</h1>
                {edit && (
                    <div className="edit" onClick={()=>openHandler(data?.value,"Audition","audition.value",{audition:true,placeholder:"Paste Your Youtube Share Link"},"")}>
                        <h2>Edit</h2>
                    </div>
                )}
            </div>
            <div className="connectme__user-audition__content">
                {isYoutube ? (
                    <iframe src={`https://www.youtube.com/embed/${data?.value}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                ) : (
                    <video src="https://cdn.videvo.net/videvo_files/video/free/2012-10/large_watermarked/hd1967_preview.mp4" controls></video>
                )}
            </div>
        </div>
    )
}

export default Audition