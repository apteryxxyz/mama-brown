// Update the checkout error
function checkoutError(message) {
    const error = document.getElementById('checkout-error');
    error.innerText = message;
    error.style.visibility = 'visible';
}

createComponent('Checkout', {
    script: function (callback) {
        const checkoutContainer = document.getElementById('checkout-container');
        const deliveryArea = document.getElementById('checkout-delivery');
        let currentMethod = 'p';

        // Set the method of delivery
        window.setMethod = function (method) {
            currentMethod = method;
            if (method.startsWith('p')) deliveryArea.style.display = 'none';
            else deliveryArea.style.display = '';
        }

        // Place the order and update the checkout page
        window.placeOrder = function () {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const email = document.getElementById('email').value;

            if (!name || !phone || !email) {
                return checkoutError('Please fill in all fields');
            }

            if (currentMethod.startsWith('d') && !address) {
                return checkoutError('Please fill in all fields');
            }

            checkoutContainer.innerHTML = createCheckoutHTML();
        }

        if (typeof callback === 'function') callback();
    },
    style: importFile('pages/checkout/style.css'),
    view: importFile('pages/checkout/view.html'),
});

function createCheckoutHTML() {
    return `
        <h3>Success</h3>

        <p>
            Your order has been placed and will be ready within 30 minutes.<br/>
            <br/>
            Your order number is #12345.<br/>
            A receipt has been emailed to you.</br>
            <br/>
            Thanks for choosing Mama’s!
        </p>
    `;
}