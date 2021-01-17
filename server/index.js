{/*const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const socketIo = require("socket.io");
const fs=require("fs");
const router = express.Router();
const path=require('path');
const pino = require('express-pino-logger')();
const port = process.env.PORT || 3001;
const base64=require("base-64");
//const ss=require('socket.io-stream');
//const stream=ss.createStream();
const WebSocket = require('ws');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const server = http.createServer(app);

const io = socketIo(server);


app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  
  const age='0 years this is zainab ka data';
  res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify({ greeting: `Hello ${name} ${'./src/original.png'} !` }));
});

const wsServer = new WebSocket.Server({ server: httpServer }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));

// array of connected websocket clients
let connectedClients = [];

wsServer.on('connection', (ws, req) => {
    console.log('Connected');
    // add new connected client
    connectedClients.push(ws);
    // listen for messages from the streamer, the clients will not send anything so we don't need to filter
    ws.on('message', data => {
        // send the base64 encoded frame to each connected ws
        connectedClients.forEach((ws, i) => {
            if (ws.readyState === ws.OPEN) { // check if it is still connected
                ws.send(data); // send
            } else { // if it's not connected remove from the array of connected ws
                connectedClients.splice(i, 1);
            }
        });
    });
});

app.get('/api/greeting', (req, res) => { res.send("Hi client"); });




let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  

  {/*ss(socket).on('profile-image', function(stream, data) {
    var filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
    console.log(filename);
  });
  
  

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
  
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  fs.readFile(path.join(__dirname)+'/original.png', function(err,buf){
    socket.emit("image",{image:true, buffer: base64.encode(buf)});
    //console.log('image file is initialized');
  })
  socket.emit("FromAPI", response);
};
setInterval(() => {
    
    
    const uri=this.getFrame(video);

    this.setState({
      selectedFile: this.dataURItoBlob(uri)
    })
    const data = new FormData()
    data.append('file', this.state.selectedFile);
    axios.post("http://localhost:3001/upload", data, { 
       // receive two    parameter endpoint url ,form data
   })
   .then(res => { // then print response status
    console.log(res.statusText)
    })
  }, 5000);


server.listen(port, () => console.log(`Listening on port ${port}`));*/}

const path = require('path');
const multer = require('multer');
const cors = require('cors');
const atob=require('atob');
const mysql=require('mysql');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pino = require('express-pino-logger')();
const app = express();
app.use(pino);
app.use(cors());
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3001;

const wsServer = new WebSocket.Server({ server: httpServer }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));

const mysqlConnection=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"images_db",
  multipleStatements:true
});

mysqlConnection.connect((err)=>{
  if(!err){
      console.log("Connected to mySQL workbench");
      app.get('/images',(req,res)=>{
    
        mysqlConnection.query("SELECT * from images_db.images",(err,rows,fields)=>{
            if(!err){
                res.send(rows);
            }
        })
        
    
    })
  }
  else{
      console.log("Connection Failed"+err);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/images')
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
  
},
})


const upload = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
   
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
         const fl='./public/images/'+req.file.originalname;
         mysqlConnection.query("INSERT INTO images_db.images (images) VALUES ('"+fl+"')");

    return res.status(200).send(req.file);
         
  })

});
// array of connected websocket clients
let connectedClients = [];

wsServer.on('connection', (ws, req) => {
  console.log((new Date())+'Received a new connection from origin'+ws.origin+'.');
  
  connectedClients.push(ws);
  const users=[];
  // listen for messages from the streamer, the clients will not send anything so we don't need to filter
  ws.on('message', data => {
      // send the base64 encoded frame to each connected ws
      users.push(data)
      
      for(key in connectedClients){
          if (connectedClients[key].readyState === connectedClients[key].OPEN) { // check if it is still connected
              connectedClients[key].send(data); // send
              
          } else { 
            // if it's not connected remove from the array of connected ws
              connectedClients.splice(key, 1);
          }
      }
  });
});



httpServer.listen(PORT, () => console.log(`HTTP server listening at http://localhost:${PORT}`));

//const ser=JSON.parse(data);
              
              //console.log(ser.user);
                //setInterval(function(){ 
                //    mysqlConnection.query("INSERT INTO images_db.images (images) VALUES ('"+ser.imgurl+"')");

                //}, 120000);
                // HTTP stuff
//app.get('/client', (req, res) => res.sendFile(path.resolve(__dirname, './client.html')));
{/*app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './public/index.html')));
app.get('/', (req, res) => {
    res.send(`
        <a href="streamer">Streamer</a><br>
        <a href="client">Client</a>
    `);
});
app.get('/api/greeting', (req, res) => { res.send("Hi client"); });*/}