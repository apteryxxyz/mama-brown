// Default booking object
function createBookingObject() {
    const date = new Date();
    return {
        id: Date.now().toString(),
        date: getFullDate(date),
        time: (date.getHours() + 1) + ':00',
        name: '',
        phone: '',
        guests: '1',
    }
}

// Get full date with leading zeros
function getFullDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

// Update the booking error element
function bookingError(message) {
    const error = document.getElementById('booking-error');
    error.innerHTML = message;
    error.style.visibility = 'visible';
}

// Save the current booking
function saveBooking(id) {
    const oldBooking = account.bookings.find(b => b.id === id);
    const index = account.bookings.indexOf(oldBooking);

    const [name, phone, guests, date, time] = [
        document.getElementById('name').value,
        document.getElementById('phone').value,
        document.getElementById('guests').value,
        document.getElementById('date').value,
        document.getElementById('time').value,
    ];

    if (!name || !phone || !guests || !date || !time) {
        return bookingError('Please fill in all fields');
    }

    const booking = { id, name, phone, guests, date, time };

    if (index >= 0) account.bookings[index] = booking;
    else account.bookings.push(booking);
    updateAccount();
    updateBookingsList();
};

// Cancel a booking by its ID
function cancelBooking(id) {
    const booking = account.bookings.find(b => b.id === id);
    const index = account.bookings.indexOf(booking);
    if (index >= 0) account.bookings.splice(index, 1);
    updateAccount();
    updateBookingsList();
}

createComponent('Bookings', {
    script: function () {
        const [list, setBookingsList] = useElement(document.getElementById('bookings-list'),
            [], (e, h) => e.insertAdjacentHTML('beforeend', h));
        const initialListHTML = list.innerHTML;
        const [manage, setManage] = useElement(document.getElementById('booking-manage'));

        // Update the inner HTML of the bookings list element
        window.updateBookingsList = function () {
            list.style.display = '';
            manage.style.display = '';

            list.innerHTML = initialListHTML;
            setBookingsList(createBookingsListHTML(account.bookings));
        }

        // Update the inner HTML of the booking manage element
        window.manageBooking = function (id) {
            let booking = account.bookings.find(b => b.id === id);
            if (!booking) booking = createBookingObject();

            list.style.display = 'none';
            manage.style.display = 'flex';

            setManage(createBookingManageHTML(booking));
        }

        updateBookingsList();
    },
    view: importFile('pages/bookings/view.html'),
    style: importFile('pages/bookings/style.css'),
});

function createBookingsListHTML(bookings) {
    return bookings.map((b, i) => `
        <div key="${i}" class="bookings-item">
            <div class="bookings-item-content">
                <h3>Booking for ${b.date}</h3>
                <p>Name: ${b.name}</p>
                <p>Number: ${b.phone}</p>
                <p>Guests: ${b.guests}</p>
                <p>Time: ${b.time}</p>
                <p>Birthday: ${b.birthday ? 'Yes' : 'No'}</p>
                <p>Baby Seat: ${b.birthday ? 'Yes' : 'No'}</p>
            </div>

            <div class="bookings-item-actions">
                <a onclick="manageBooking('${b.id}')">Edit</a>
                <a onclick="cancelBooking('${b.id}')">Cancel</a>
            </div>
        </div>
    `).join('');
}

function createBookingManageHTML(booking) {
    return `
        <h3>Manage a Booking</h3>
        <div id="bookings-manage-actions">
            <div class="bookings-manage-action">
                <p>Name</p>
                <input type="text" id="name" value="${booking.name}">
            </div>

            <div class="bookings-manage-action">
                <p>Phone Number</p>
                <input type="tel" id="phone" value="${booking.phone}">
            </div>

            <div class="bookings-manage-action">
                <p>Number of Guests</p>
                <select id="guests">
                    <option value="${booking.guests}">${booking.guests}</option>
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            .map(i => `<option value="${i}">${i}</option>`).join('')}
                </select>
            </div>

            <div class="bookings-manage-action">
                <p>Date</p>
                <input type="date" id="date" value="${booking.date}">
            </div>

            <div class="bookings-manage-action">
                <p>Time</p>
                <select id="time">
                    <option value="${booking.time}">${booking.time}</option>
        ${[
            '9:00', '9:30', '10:00',
            '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00',
            '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00',
            '16:30', '17:00', '17:30',
            '18:00', '18:30', '19:00',
            '19:30', '20:00', '20:30',
            '21:00', '21:30', '22:00',
        ]
            .filter(t => t !== booking.time)
            .map(i => `<option value="${i}">${i}</option>`).join('')}
                </select>
            </div>
        </div>

        <p id="booking-error">No errors?</p>
        
        <a onclick="saveBooking('${booking.id}')">Save</a>
    `;
}