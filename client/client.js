import React,{ Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios';

const WS_URL = "ws://127.0.0.1:3001";
const ws = new WebSocket(WS_URL);

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      userName:'',
      isLoggedIn:false,
      messages:[],
      selectedFile: null
    }
    this.videoRef = React.createRef();
    this.screenRef = React.createRef();
    this.canvasRef = React.createRef();
    this.getFrame=this.getFrame.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  onButtonClicked=()=>{
    const video = this.videoRef.current;
    const constraints = {video: {width: 426, height: 240}}
    navigator.mediaDevices.getUserMedia(constraints).then(
    (stream) => { video.srcObject = stream })
    video.style.visibility = "hidden";

    const screen = this.screenRef.current;
    navigator.mediaDevices.getDisplayMedia({video: {width: 426, height: 240}}).then(
      (streamer)=>{screen.srcObject=streamer}
    )
    screen.style.visibility = "hidden";

    const canvas = this.canvasRef.current;
    canvas.width = 426;
    canvas.height = 240;
    canvas.style.visibility = "hidden";


    setInterval(() => {
    canvas.getContext('2d').drawImage(video, 0, 0);
      canvas.toBlob(function(blob){
      const data = new FormData();
      data.append('file', blob,((Math.random() * new Date().getTime()).toString(36).replace(/\./g, ''))+'.png');
      axios.post("http://localhost:3001/upload", data, { 
     })
     .then(res => { // then print response status
      console.log(res.statusText)
   }) 
      },'image/png')

  }, 30000);

  const FPS=1;
    setInterval(() => {
        ws.send(JSON.stringify({
          type: "message",
          imgurl: this.getFrame(video),
          scr:this.getFrame(screen),
          user:this.state.userName
      }));
  }, 100 / FPS);
  }

  componentDidMount(){
    ws.onopen = () => {
        console.log(`Connected to ${WS_URL}`);
        
    }
  }

  getFrame(vid) {
    const canvas = document.createElement('canvas');
    canvas.width = 426;
    canvas.height = 240;
    canvas.getContext('2d').drawImage(vid, 0, 0);
    const data = canvas.toDataURL('image/png');
    return data;
  }

  handleChange(event){
    this.setState({userName:event.target.value});
  }
  handleSubmit(){
    this.setState({isLoggedIn:true, userName:this.state.userName})
  }

  render() {
    return (
      <div className="main">
        {this.state.isLoggedIn?
        <div>
        <video autoPlay={true} ref={this.videoRef} />
        <video autoPlay={true} ref={this.screenRef} />
        <canvas ref={this.canvasRef}></canvas>
        <div id="result"></div>
        <h1>Hello im {this.state.userName}</h1>
        <button className="al" type="submit" onClick={this.onButtonClicked}>OK</button>
        </div>
      :
      <div style={{padding: '200px 40px'}}>
        <h1>LOGIN</h1>
        <form onSubmit={this.handleSubmit}>
          <input id="name" type="text" onChange={this.handleChange}/>
          <br/><br/>
          <button className="al" type="submit">Submit</button>
        </form>
      </div>
  }
      </div>
      
    )
  }

}
export default App;
