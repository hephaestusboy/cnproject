// client.js
const net = require('net');

const SERVER_IP = '192.168.1.10'; // Replace with the actual server IP
const SERVER_PORT = 5000;

// Create the client connection
const client = new net.Socket();

client.connect(SERVER_PORT, SERVER_IP, () => {
    console.log(`Connected to server at ${SERVER_IP}:${SERVER_PORT}`);
    client.write('Hello, server. This is the client.'); // Initial handshake message
});

// Listen for messages from the server
client.on('data', (data) => {
    const message = data.toString();
    console.log(`Message from server: ${message}`);
    displayMessage(message, 'incoming'); // Display message in the front-end
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Client error:', err.message);
});

// Function to display messages in the chat area on the front-end
function displayMessage(message, type) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add(type === 'incoming' ? 'incoming-message' : 'outgoing-message');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the latest message
}

// Handle message sending from the chat interface
document.getElementById('sendBtn').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message) {
        client.write(message); // Send the message to the server
        displayMessage(message, 'outgoing'); // Display message in chat area
        messageInput.value = ''; // Clear input
    }
});
