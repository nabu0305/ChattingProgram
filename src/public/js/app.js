const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open",()=>{
    console.log("Connection to Server ✔");
});

socket.addEventListener("message",(message) =>{
    console.log("New massage: ",message.data);
});

socket.addEventListener("close",()=>{
    console.log("DisConnection to Server ❌");
});

setTimeout(() => {
    socket.send("Hello from the browser");
}, 10000);