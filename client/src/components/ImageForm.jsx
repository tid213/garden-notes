import AWS from "aws-sdk";
import { supabase } from '../supabaseClient'
import { useState, useEffect } from "react";

function ImageForm({imageFor, imageForId, close}){
    const [file, setFile] = useState(null);
    const [fileLink, setFileLink] = useState();
    const [chooseImage, setChooseImage] = useState("Choose Image File")

    useEffect(()=>{
        console.log(imageForId)
    }, [])

    const refreshPage = ()=>{
      window.location.reload();
   }

    const setNoteImage = async (link) => {
      console.log(link)
        const {  error} = await supabase
          .from('notes')
          .update({note_image: link})
          .eq('id', imageForId)
        if(error){
          console.log(error)
        } else{
          console.log("link added")
        }
    }

    const setPlantImage = async (link) => {
        console.log(link)
          const {  error} = await supabase
            .from('plants')
            .update({plant_image: link})
            .eq('id', imageForId)
          if(error){
            console.log(error)
          } else{
            console.log("link added")
          }
      }

      const setPlotImage = async (link) => {
        console.log(link)
          const {  error} = await supabase
            .from('plots')
            .update({plot_image: link})
            .eq('id', imageForId)
          if(error){
            console.log(error)
          } else{
            console.log("link added")
          }
      }

    const createFileName = () => {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "garden-notes-images";

    // S3 Region
    const REGION = "us-west-1";

    // S3 Credentials
    const accessKey = process.env.REACT_APP_ACCESS_KEY;
    const secretKey = process.env.REACT_APP_SECRET_ACCESS_KEY;
    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: fileLink,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      let imageLink = "https://garden-notes-images.s3.us-west-1.amazonaws.com/" + fileLink;
      if(imageFor === "note"){
        setNoteImage(imageLink)
      } else if(imageFor === "plant"){
        setPlantImage(imageLink)
      } else if(imageFor === "plot"){
        setPlotImage(imageLink)
      }
      
      // Fille successfully uploaded
      alert("File uploaded successfully.");
      refreshPage()
    });
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    const fileExtension = file.name.split('.').pop();
    const fileName = createFileName() + "." + fileExtension;
    // Changing file state
    setFile(file);
    setFileLink(fileName);
    setChooseImage("Image Selected")
    console.log(fileName);
  };
  
  return (
    <div className="upload inter ml-4 mr-4 p-8 bg-white border border-customMidGreen rounded-lg shadow-md">
        <p className="mt-2 mb-2 font-semibold text-customMidGreen text-2xl">Upload image</p>
        <div className="upload-image mt-4">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
            <label htmlFor="fileInput" className=" w-full bg-customLightGreen hover:bg-customMidGreen text-white font-bold py-2 px-4 rounded inline-block cursor-pointer">
                {chooseImage}
            </label>
            <button onClick={uploadFile} className="w-full lg:ml-4 mt-2 lg:mt-0 bg-customMidGreen hover:bg-customDarkGreen text-white font-bold py-2 px-4 rounded inline-block cursor-pointer">
                Upload
            </button>
            <div className="close-button cursor-pointer mt-8 w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" onClick={() => close('close')}>Close</div>
        </div>
    </div>

  );
}

export default ImageForm;