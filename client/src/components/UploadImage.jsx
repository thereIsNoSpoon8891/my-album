import { useState } from "react"
import axios from 'axios'

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


const UploadImage = () => {
    
    const [image, setImage] = useState(null)
    
    const selectImage = e => {// select image to be uploaded
        setImage(e.target.files[0])
    }
    
    const uploadImage = () => {
        if(image) {
            const formData = new FormData();
                formData.append('image', image)
                    userAxios.post("/api/authenticate/upload", formData)
                        .then(res => console.log(res))
                        .then(data => {
                            if(data.success) {
                                console.log(data.imageUrl)
                            } else {
                                console.log(`Failed to upload image`)
                            }
                        })
                        .catch(err => console.log(err))
        }
    }
    return(
        <div>
            <input type='file' accepts='image/*' onChange={selectImage}/>
            <button onClick={uploadImage}>Upload Image</button>
        </div>
    )
}

export default UploadImage