import React, { Component } from "react";
import './style.css';

class Selfie extends Component {
  state = {
    imageURL: '',
    permissionDenied: false,
    noCameraFound: false
  }

  videoRef= React.createRef();
  canvasRef = React.createRef();
  imageRef = React.createRef();

  componentDidMount = async () => {
    this.startCamera();
  }

  startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      if(stream){
        this.videoRef.current.srcObject = stream;
      }
      else{
        this.setState({noCameraFound: true});
      }
    } 
    catch (err) {
      this.setState({permissionDenied:true})
    }
  }

    takeSelfie = async () => {
        const width = this.videoRef.current.videoWidth;
        const height = this.videoRef.current.videoHeight;

        const ctx = this.canvasRef.current.getContext('2d');

        this.canvasRef.current.width = width;
        this.canvasRef.current.height = height;

        ctx.drawImage(this.videoRef.current, 0, 0, width, height);

        const imageDataURL = this.canvasRef.current.toDataURL('image/png');
        this.stopCam();

        this.setState({
            imageURL: imageDataURL
        })
    }

    stopCam = () => {
        const stream = this.videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => {
            track.stop();
        });
    }

    backToCam = () => {
        this.setState({
            imageURL: ''
        }, () => {
            this.startCamera();
        })
    }



    render() {
      const { permissionDenied, noCameraFound, imageURL } = this.state;

      return (
        <div style={{width: "100%", height: "100%"}}>
          <div className="pageHeading">Implement Selfie Functionality</div>
          {permissionDenied && <div className="errorMessage">Permission denied to camera. Allow camera permission and reload the page.</div>}
          {noCameraFound && <div className="errorMessage">No video device detected. Connect a video device and reload the page.</div>}

          <div className="selfie">
            {imageURL === '' && <div className="cam">
              <video width="100%" height="100%" className="video-player" autoPlay={true} ref={this.videoRef}>
                Your browser does not support video.
              </video>
              {!permissionDenied && !noCameraFound &&
              <button className="controlBtn" onClick={this.takeSelfie}>
                Capture
              </button>}
            </div>}

          <canvas ref={this.canvasRef} style={{ display: 'none' }}></canvas>
          {imageURL !== '' && <div className="preview">
            <img className="previewImg" src={imageURL} alt="Selfie Preview" ref={this.imageRef} />
              <div className="btnsContainer">
                <button className="controlBtn" onClick={this.backToCam}>
                  Click Again
                </button>
                <a href={imageURL} download="selfie.png" className="controlBtn">
                  Save Selfie
                </a>
              </div>
            </div>}
            </div>

        </div>
        )
    }
}

export default Selfie;