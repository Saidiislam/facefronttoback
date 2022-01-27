import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    loadModels,
    getFullFaceDescription,
    createMatcher,
    isFaceDetectionModelLoaded
} from '../api/face';


function UploadImage() {
    const [imageObj, setImageObj] = useState({})
    const [discriptor, setDiscriptor] = useState([])
    const [name, setName] = useState('')
    const handleFileChange = (event) => {
        setImageObj(URL.createObjectURL(event.target.files[0]))
    }
    const handleButtonClick = async(e) => {
        e.preventDefault();
        let blob = await fetch(imageObj)
      .then(r => r.blob())
      .catch(error => console.log(error));
    if (!!blob && blob.type.includes('image')) {
      setImageObj(URL.createObjectURL(blob))

      await getFullFaceDescription(imageObj).then(fullDesc => {
        fullDesc.map(fd => {
            setDiscriptor(fd.descriptor.toString())
        })
      });
    }
    }
    useEffect(() => {
        loadModels()
    }, [])
    console.log(discriptor)
    const postdata = async () =>{
        const {data} = await axios.post('http://localhost:5500/api/faceapi/descriptor', {name,discriptor})
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleButtonClick}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name'/><br/><br />
                <input
                id="myFileUpload"
                type="file"
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png"
            /> <br/><br />
                <button type='submit'>Upload</button>
            </form>
            <button onClick={postdata}>postdata</button>
        </div>
    )
}

export default UploadImage
