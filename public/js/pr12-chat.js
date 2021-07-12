const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')

socket.on('newMessage', data => {
    addMessage(data, false)
})

const postMessage = () => {
    const message = messageEl.value.trim();
    console.log(message);
  const from = user.value;

  const data = { message, from };

  socket.emit('message', data);
  addMessage(data, true);

  messageEl.value = '';
}

const addMessage = (data, user = false) => {
  console.log(data);
  if (data.message){
  chatBox.innerHTML += `
  <li class="message${user ? ' uMessage' : ''}">
      ${data.from}: ${data.message}
  </li>
  `;} else {
    chatBox.innerHTML += `
    <li class="message${user ? ' uMessage' : ''}">
        ${data.data.from}: ${data.data.message}
    </li>
    `;
  }
}
