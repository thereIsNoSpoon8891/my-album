import { useState } from "react"
import AWS from 'aws-sdk'
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
         // S3 Bucket Name
    const S3_BUCKET = "my-album-project";

    // S3 Region
    const REGION = "US East (N. Virginia) us-east-1";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: "AKIASZH4O7HJWCX3TG5Y",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });


    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: image.name,
      Body: image,
    };

    // Uploading file to s3

    const upload = s3
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      // File uploading progress
      console.log(
        "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
      );
    })
    .promise();

    upload.then((err, data) => {
    console.log(err);
    // Fille successfully uploaded
    alert("Image uploaded successfully.");
  });
}
    return(
        <div>
            <input type='file' accepts='image/*' onChange={selectImage}/>
            <button onClick={uploadImage}>Upload Image</button>
        </div>
    )
}

export default UploadImage