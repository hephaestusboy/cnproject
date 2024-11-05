// server.js
const net = require('net');
const readline = require('readline');

const PORT = 5000; // Server's listening port
let clientSocket = null;

// Create the server
const server = net.createServer((socket) => {
    clientSocket = socket;
    const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`Client connected from ${clientAddress}`);

    // Send an initial greeting message to the client
    socket.write('Hello client, connection established. You can now send messages.');

    // Handle incoming messages from client
    socket.on('data', (data) => {
        const message = data.toString();
        console.log(`Message from client: ${message}`);
        displayMessage(message, 'incoming'); // Display message in the front-end
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        clientSocket = null;
    });

    socket.on('error', (err) => {
        console.error('Server error:', err.message);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
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

// Listen for message sending from the front-end
document.getElementById('sendBtn').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message && clientSocket) {
        clientSocket.write(message); // Send the message to the client
        displayMessage(message, 'outgoing'); // Display message in the chat area
        messageInput.value = ''; // Clear the input
    }
});
