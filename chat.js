document.addEventListener('DOMContentLoaded', () => {
    const contactsList = document.getElementById('contacts');
    const chatTitle = document.getElementById('chatTitle');
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const searchBar = document.getElementById('searchBar');
    const emojiBtn = document.getElementById('emojiBtn');
    const settingsBtn = document.getElementById('settingsBtn');

    // Mock user data
    const users = ['Alice', 'Bob', 'Charlie'];

    // Populate contacts list
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        li.addEventListener('click', () => selectContact(user));
        contactsList.appendChild(li);
    });

    // Function to select a contact and load their chat
    function selectContact(user) {
        chatTitle.textContent = `Chat with ${user}`;
        messagesDiv.innerHTML = ''; // Clear existing messages

        // Mock messages
        const mockMessages = [
            { type: 'incoming', text: 'Hello!' },
            { type: 'outgoing', text: 'Hi there!' },
        ];

        mockMessages.forEach(message => {
            const div = document.createElement('div');
            div.classList.add('message', message.type);
            const p = document.createElement('p');
            p.classList.add('text');
            p.textContent = message.text;
            div.appendChild(p);
            messagesDiv.appendChild(div);
            messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
        });
    }

    // Event listener for sending messages
    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            const div = document.createElement('div');
            div.classList.add('message', 'outgoing');
            const p = document.createElement('p');
            p.classList.add('text');
            p.textContent = message;
            div.appendChild(p);
            messagesDiv.appendChild(div);
            messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
            messageInput.value = '';
        }
    });

    // Optional: Handle 'Enter' key to send a message
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Search functionality
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        Array.from(contactsList.children).forEach(li => {
            if (li.textContent.toLowerCase().includes(query)) {
                li.style.display = '';
            } else {
                li.style.display = 'none';
            }
        });
    });

    // Emoji button functionality
    emojiBtn.addEventListener('click', () => {
        const emoji = prompt('Enter emoji:');
        if (emoji) {
            messageInput.value += emoji;
        }
    });

    // Settings button functionality (mock implementation)
    settingsBtn.addEventListener('click', () => {
        alert('Settings functionality is not implemented yet.');
    });
});
