import React,{Component} from 'react';
import './App.css';
import './index.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button id="close" onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:'',
      messages:[],
    };
    this.unique=[];
    this.connected=[];
    this.luci={};
    this.messages1='';
    
  }

  componentDidMount(){
    const WS_URL = "ws://127.0.0.1:3001";
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => console.log(`Connected to ${WS_URL}`);
        ws.onmessage = message => {
            const dataFromServer=JSON.parse(message.data);
            console.log('got reply!',dataFromServer);
            if(dataFromServer.type==="message"){
                this.setState((state)=>({
                  user: dataFromServer.user,
                  messages: [...state.messages,
                  {
                      msg: dataFromServer.imgurl,
                      user: dataFromServer.user,
                      screen: dataFromServer.scr
                  }]
                })
                );
                this.connected.push(dataFromServer.user);
                this.unique=[...new Set(this.connected)];

                const grouped= this.state.messages.reduce((a,next)=>{
                  let key=next.user;
                  a[key]=(a[key] || []).concat(next);
                  return a;
                }, {}); 
                this.luci=grouped;
              }
        }
  }

  render() {
    return (
      <div>
        <div>
        <h1>ClassRoom View</h1>
       <div className="app">
        <div width="500" height="500">
        <ul>
        {this.unique.map(message=><li><Content myDataProp = {message} ll={this.luci}></Content></li>)}
        </ul>
        </div></div>
        </div>
    </div>
    )
  }
}
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      show:false
    };    
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  render() {
    
    const len=this.props.ll[this.props.myDataProp].length;
    const needed=len-1;
    const mymsg=this.props.ll[this.props.myDataProp][needed].msg;
    const myscr=this.props.ll[this.props.myDataProp][needed].screen;

    setTimeout(() => {
      this.cc=mymsg
    }, 20000);
     return (
        <div className="card">
          <div>
        
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <img src={mymsg} alt="video streaming"/>
          <img src={myscr} alt="screen sharing"/>
          <h3 id="name">{this.props.myDataProp}</h3>
          
        </Modal>
        
        <button type="button" onClick={this.showModal}>
          <img src={this.cc} width="250" height="180" alt="user"/>
          <h3 className="container">{this.props.myDataProp}</h3>
        </button>
        
        </div>
          
        </div>
     );
  }
}

export default App;
{/*
                  
  //setInterval(this.cc=mymsg,1000000/2);
    //let i=1;
    //settimeout(this.cc=mymsg,10000);
    //console.log(msg);
    //this.unique.push(this.connected.filter((v,i,a)=>a.indexOf(v)==i));

  // set the base64 string to the src tag of the image
            //const canvas=this.canvasRef.current;
            
            //const img=new Image();
            //canvas.src = message.data;
<div style={{ backgroundColor: 'white', padding: '2rem' }}>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Card>
                                    {/* <Image src='/images/avatar/large/elliot.jpg' avatar /> 
                                    <img src={stdnt} alt="picnew"></img>
                                    <Card.Content>
                                        <Card.Header>Shivavarshini K</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>Exam date 20/10/20</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            01:00:00
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <a>
                                            <Icon name='comment alternate' color='green' />
                                        </a><a>
                                            <Icon name='eye' color='yellow' />
                                        </a><a>
                                            <Icon name='envelope outline' color='blue' />
                                        </a>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </div>

  {msg.map(ms=><img src={ms} />)}
  if(dataFromServer.user == this.unique){
                  const usr=dataFromServer.user;
                  this.setState((state)=>({
                    user_img: [...state.user,
                      {
                        usr: dataFromServer.imgurl
                      }]
                  })
                  );
                }

                
  function App() {
  const canvasRef = React.createRef();
  

  //const img = document.querySelector('img');
        
        const WS_URL = "ws://127.0.0.1:3001";
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => console.log(`Connected to ${WS_URL}`);
        ws.onmessage = message => {
            // set the base64 string to the src tag of the image
            const canvas=canvasRef.current;
            
            //const img=new Image();
            canvas.src = message.data;
            

        }
        
  return (
    <div className="App">
      
        <div>
        <img ref={canvasRef} src="" />
        <h1>Hello Client</h1>
        </div>
      
    </div>
  );
}

export default App;


this.i=0;
    this.j=0;
    this.usr='';
this.n=this.state.user.length;
                for(this.i=0;this.i<this.n;this.i++){
                  this.usr=this.state.user[this.i].user;
                  for(this.j=this.i++;this.j<this.n;this.j++)
                  {
                    if (this.usr != this.state.user[this.j].user){
                      this.setState((state)=>({
                      
                        unique_user:[...state.unique_user,
                        {
                            user: this.usr
                              
                        }]
                      })
                      );
                    }
                  }
                }
                this.n1=this.state.unique_user.length;

import React,{Component} from 'react';
import logo from './logo.svg';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: '',
      age: ''
     
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleChange1(event) {
    this.setState({ age: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)} ${encodeURIComponent(this.state.age)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="age">Enter your age: </label>
            <input
              id="age"
              type="text"
              value={this.state.age}
              onChange={this.handleChange1}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.greeting}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;*/}
