const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentPage === 'dashboard.html' && !currentUser) {
        window.location.href = 'login.html';
    } else if ((currentPage === 'login.html' || currentPage === 'index.html') && currentUser) {
        window.location.href = 'dashboard.html';
    }
}

checkAuth();

// Sign-up
if (currentPage === 'index.html') {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;

        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if user already exists
        if (users.some(user => user.email === email)) {
            alert('משתמש כבר קיים במערכת!');
            return;
        }

        // Add new user with registration date
        users.push({
            email,
            password,
            fname,
            lname,
            registrationDate: new Date().toISOString()
        });

        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', email);

        alert('נרשמת בהצלחה!');
        window.location.href = 'dashboard.html';
    });
}

// Login
if (currentPage === 'login.html') {
    const form = document.getElementById('login-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('agreements').checked;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', email);
            window.location.href = 'dashboard.html';
        } else {
            alert('שם משתמש או סיסמא שגויים');
        }
    });
}

if (currentPage === 'dashboard.html') {
    const currentUser = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === currentUser);

    if (user) {
        document.getElementById('welcome-user').textContent = `שלום ${user.fname}!`;
        
        document.getElementById('fname').value = user.fname;
        document.getElementById('lname').value = user.lname;
        document.getElementById('email').value = user.email;

        function updateClock() {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('he-IL');
            const dateStr = now.toLocaleDateString('he-IL');
            document.getElementById('current-time').textContent = `${dateStr} ${timeStr}`;
        }
        updateClock();
        setInterval(updateClock, 1000);

        if (user.registrationDate) {
            const regDate = new Date(user.registrationDate);
            document.getElementById('registration-date').textContent = regDate.toLocaleDateString('he-IL');
            
            function updateTimeSince() {
                const now = new Date();
                const diff = now - regDate;
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                document.getElementById('time-since-registration').textContent = 
                    `${days} ימים ו-${hours} שעות`;
            }
            updateTimeSince();
            setInterval(updateTimeSince, 1000 * 60); // Update every minute
        }

        const form = document.getElementById('profile-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const updatedUser = {
                ...user,
                fname: document.getElementById('fname').value,
                lname: document.getElementById('lname').value
            };

            const newPassword = document.getElementById('password').value;
            if (newPassword.trim()) {
                updatedUser.password = newPassword;
            }

            const userIndex = users.findIndex(u => u.email === currentUser);
            users[userIndex] = updatedUser;
            
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('הפרטים עודכנו בהצלחה!');
        });
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
