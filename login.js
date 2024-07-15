document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                messageElement.textContent = 'Login successful!';
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = 'Invalid username or password';
                messageElement.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            messageElement.textContent = 'An error occurred. Please try again later.';
            messageElement.style.color = 'red';
        });
});

document.getElementById('new-user-button').addEventListener('click', function() {
    window.location.href = 'register.html';
});
