import React, { Component } from 'react'
import { firebase } from '../../firebase'
import FileUploader from 'react-firebase-file-uploader'
import CircularProgress from '@material-ui/core/CircularProgress'

class Fileuploader extends Component {

    state = {
        name:'',
        isUploading:false,
        fileURL:''
    }

    handleUploadStart = () => {
        this.setState({
            isUploading:true
        })
    }

    handleUploadError = () => {
        this.setState({
            isUploading:false 
        })
    }

    // what happened after we successfully uploaded the pic
    // filename is just a name 
    handleUploadSuccess = (filename) => {

        console.log(filename)

        this.setState({
            name:filename, 
            isUploading: false
        })

        // fecth the actual image URL 
        firebase.storage().ref(this.props.dir)
        .child(filename).getDownloadURL()
        .then(url=>{
            console.log(url)
            this.setState({fileURL: url})
        })

        // give the filename to parent thru props 
        this.props.filename(filename)
    }

    // add player, we dont have image name and url, but we do have in edit player
    // execute this to change state before we render this file 
    static getDerivedStateFromProps(props, state) {
        // if we have default image name and url (in case of edit) then return new state
        if(props.defaultImg){
            return state = {
                name:props.defaultImg,
                fileURL:props.defaultImg
            }
        }
        
        return null
    }

    // reset all props/state to zero, tell parent thru this.props.resetImage()
    uploadAgain = () => {
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''
        })
        this.props.resetImage()
    }

    render() {
        return (
            <div>
                {/* if we dont have fileURL, then show file uploader button  */}
                { 
                    !this.state.fileURL ?
                    <div>
                        <div className='label_inputs'>{this.props.tag}</div>
                        {/* storageRef={firebase.storage().ref(this.props.dir)} this is one does the job for us  */}
                        <FileUploader
                            accept='image/*'
                            name='image'
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={ this.handleUploadStart }
                            onUploadError={ this.handleUploadError }
                            onUploadSuccess={ this.handleUploadSuccess }
                        />
                    </div>
                    :null
                 }
                 {
                     this.state.isUploading ?
                        <div className='progress'
                             style={{textAlign:'center', margin:'30px 0'}}
                        >
                            <CircularProgress
                                style={{color:'#98c6e9'}}
                                thickness={7}
                            />
                        </div>
                    : null
                 }
                 {
                     this.state.fileURL ?
                     <div className='image_upload_container'>
                          <img
                                style={{
                                    width:'100%'
                                }}
                                src={this.state.fileURL}
                                alt={this.state.name}
                          />
                          <div className='remove' onClick={()=>this.uploadAgain()}>
                              Remove
                          </div>
                     </div>
                    : null
                 }
            </div>
        )
    }
}

export default Fileuploader;




