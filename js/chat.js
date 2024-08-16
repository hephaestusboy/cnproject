 document.addEventListener('DOMContentLoaded', () => {
    const contactsList = document.getElementById('contacts');
    const chatTitle = document.getElementById('chatHeader'); // Adjusted to match HTML ID
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const searchBar = document.getElementById('searchBar');
    const emojiBtn = document.getElementById('emojiBtn'); // Ensure this exists in your HTML
    const settingsBtn = document.getElementById('settingsBtn');
    const signOutBtn = document.getElementById('signOutBtn'); // Ensure this exists in your HTML

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
    
        // Fetch or generate messages dynamically based on the user
        const mockMessages = getMessagesForUser(user); // Replace with actual data fetch
    
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
    if (emojiBtn) { // Ensure emojiBtn exists before adding listener
        emojiBtn.addEventListener('click', () => {
            const emoji = prompt('Enter emoji:');
            if (emoji) {
                messageInput.value += emoji;
            }
        });
    }
     
    // Settings button functionality
    settingsBtn.addEventListener('click', () => {
        document.getElementById('chatApp').style.display = 'none';
        document.getElementById('settingsPage').style.display = 'flex';
    });

    // Logout button functionality in settings
    const logoutBtn = document.querySelector('.logout-button');
    logoutBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    
    // Toggle settings sections
    document.querySelectorAll('.settings-sidebar ul li').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all sections
            document.querySelectorAll('.settings-section').forEach(section => {
                section.classList.remove('active');
            });

            // Add active class to the clicked item
            document.querySelectorAll('.settings-sidebar ul li').forEach(li => {
                li.classList.remove('active');
            });

            item.classList.add('active');

            // Display the selected section
            const target = item.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    document.getElementById('settingsBtn').addEventListener('click', function() {
        document.getElementById('chatApp').style.display = 'none';
        document.getElementById('settingsPage').style.display = 'flex';
    });
    
    document.querySelectorAll('.settings-sidebar ul li').forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all list items
            document.querySelectorAll('.settings-sidebar ul li').forEach(li => {
                li.classList.remove('active');
            });
            // Add active class to the clicked item
            this.classList.add('active');
            
            // Hide all settings sections
            document.querySelectorAll('.settings-section').forEach(section => {
                section.classList.remove('active');
            });
    
            // Show the selected section
            const sectionId = this.getAttribute('data-target');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    document.getElementById('backBtn').addEventListener('click', function() {
        document.getElementById('settingsPage').style.display = 'none';
        document.getElementById('chatApp').style.display = 'flex';
    });
    
    // Add logic to save button
    document.querySelector('.save-button').addEventListener('click', function() {
        // Example: Update the profile name and status in the sidebar
        const newName = document.getElementById('profileName').value;
        const newStatus = document.getElementById('profileStatus').value;
        if (newName) {
            document.getElementById('userName').textContent = newName;
        }
        if (newStatus) {
            document.getElementById('status').textContent = newStatus;
        }
    
        // After saving, you could optionally hide the settings page and show the chat app again
        document.getElementById('settingsPage').style.display = 'none';
        document.getElementById('chatApp').style.display = 'flex';
    });
    
});
