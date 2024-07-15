document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const messageElement = document.getElementById('register-message');

    if (!validatePassword(password)) {
        messageElement.textContent = 'Password must be at least 8 characters long, contain a number, and a capital letter.';
        messageElement.style.color = 'red';
        return;
    }
    
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            if (users.find(user => user.username === username)) {
                messageElement.textContent = 'Username already exists';
                messageElement.style.color = 'red';
                return;
            }
            
            users.push({ username, password });
            
            return fetch('save_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(users)
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageElement.textContent = 'User registered successfully!';
                messageElement.style.color = 'green';
            } else {
                messageElement.textContent = 'Error saving user data';
                messageElement.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageElement.textContent = 'An error occurred. Please try again later.';
            messageElement.style.color = 'red';
        });
});

function validatePassword(password) {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;
    
    return password.length >= minLength && hasNumber.test(password) && hasSymbol.test(password);
}
