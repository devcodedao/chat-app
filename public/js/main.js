
/**
      * @param connect,disconnect su kien nhan duoc tu server gui ve client 
      * **/
var socket = io();
socket.on("connect", () => {
    console.log("server connected")
    // socket.emit("emitMsg",{
    //     from:"nguyendataht@gmail.com",
    //     content:"Welcome to my chat app"
    // })
})
socket.emit("createMessage", {
    from: "nguyendataht@gmail.com",
    content: "Xin chao Dat"
}, (data) => {
    console.log("Success", data)
})
socket.on("newMessage", msg => {
    console.log(msg)
    var li=$('<li></li>');
    li.text(`${msg.from}:${msg.content}`)
    $('#messages').append(li)
})
socket.on("disconnect", () => {
    console.log("server disconnect")
})

$('#message-form').on('submit', e => {
    socket.emit('createMessage', {
        from: "Devdao2604@gmail.com",
        content: $('[name=message]').val()
    },(data)=>{
        console.log("Success",data)
    })
    e.preventDefault()
})
socket.on('newLocationMessage',message=>{
    var li=$('<li></li>');
    var a=$('<a target="_blank">My current location</a>')
    li.text(`${message.from}`)
    a.attr('href',message.url)
    li.append(a)
   
    $('#messages').append(li)
})

$('#send-location').on('click',()=>{
    if(!navigator.geolocation){
        return alert("Trinh duyet da cu")
    }
    else{
        navigator.geolocation.getCurrentPosition(position=>{
           socket.emit('createLocation',{
               from:"devdao2604@gmail.com",
               latitude:position.coords.latitude,
               longitude:position.coords.longitude
           })
        },()=>{
            alert('Unable to fetch location')
        })
    }
})

