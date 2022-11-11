const accountsStorage = localStorage.getItem('accounts');
const accounts = accountsStorage ? JSON.parse(accountsStorage) : [];

const accountObject = { email: null, password: null, bookings: [] };
const accountStorage = localStorage.getItem('account');
let account = accountStorage ? JSON.parse(accountStorage) : accountObject;

// Login to an account
function accountLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if the account exists and passwords match
    const acc = accounts.find(a => a.email === email);
    if (!acc) return accountError('Account does not exist');
    if (acc.password !== password) return accountError('Incorrect password');
    else account = acc;
    console.info(`Logged in with email ${account.email}`);

    // Update the DOM
    updateAccount();

    // Navigate to the 'return_to' parameter if it exists
    navigateTo({ screen: resolveReturnTo() || 'home' });
}

// Logout of the account
function accountLogout() {
    account = {};
    updateAccount();
    navigateTo({ screen: 'home' });
}

// Update the login error
function accountError(message) {
    const error = document.getElementById('login-error');
    error.innerText = message;
    error.style.visibility = 'visible';
}

// Create a new account
function accountSignUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // If email is in use then ignore
    const exists = accounts.find(a => a.email === email);
    if (exists) return accountError('Email already in use');

    if (!email || !password) return accountError('Please fill in all fields');

    accounts.push({ email, password, bookings: [] });
    console.info(`Signed up with email ${email}`);

    // Once created, login to the account
    return accountLogin();
}

function updateAccount() {
    const header = document.getElementById('header-container');
    const button = header.children[0].children[1];

    ifElse(
        !!account.email,
        () => {
            button.innerText = 'Logout';
            button.setAttribute('onclick', 'accountLogout()');
        },
        () => {
            button.innerText = 'Login';
            button.setAttribute('onclick', 'navigateTo({ screen: \'login\' })');
        },
    )();

    // Update the local storage accounts array
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.setItem('account', JSON.stringify(account));
}

createComponent('Login', {
    script: function () { },
    view: importFile('pages/login/view.html'),
    style: importFile('pages/login/style.css'),
});
