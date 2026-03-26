// API Base URL
const API_URL = 'http://localhost:3000/api';

// Load packages on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPackages();
    setupContactForm();

    const loadContactMessagesBtn = document.getElementById('loadContactMessagesBtn');
    if (loadContactMessagesBtn) {
        loadContactMessagesBtn.addEventListener('click', loadContactMessages);
    }
});

// Load contact messages from API
async function loadContactMessages() {
    try {
        const response = await fetch(`${API_URL}/contact`);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            displayContactMessages(result.data);
        } else {
            document.getElementById('contactMessagesTableContainer').innerHTML = '<p>No contact messages received yet.</p>';
        }
    } catch (error) {
        console.error('Error loading contact messages:', error);
        document.getElementById('contactMessagesTableContainer').innerHTML = '<p>Error loading messages. Make sure server is running.</p>';
    }
}

// Display contact messages in table
function displayContactMessages(messages) {
    const container = document.getElementById('contactMessagesTableContainer');
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'contact-messages-table';

    const header = document.createElement('thead');
    header.innerHTML = `
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Sent At</th>
        </tr>
    `;
    table.appendChild(header);

    const body = document.createElement('tbody');
    messages.forEach((msg, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${msg.name || ''}</td>
            <td>${msg.email || ''}</td>
            <td>${msg.subject || ''}</td>
            <td>${msg.message || ''}</td>
            <td>${new Date(msg.createdAt).toLocaleString()}</td>
        `;
        body.appendChild(row);
    });

    table.appendChild(body);
    container.appendChild(table);
}

// Load bookings from API
async function loadBookings() {
    try {
        const response = await fetch(`${API_URL}/bookings`);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            displayBookings(result.data);
        } else {
            document.getElementById('bookingsTableContainer').innerHTML = '<p>No bookings received yet.</p>';
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
        document.getElementById('bookingsTableContainer').innerHTML = '<p>Error loading bookings. Make sure server is running.</p>';
    }
}

// Display bookings in table
function displayBookings(bookings) {
    const container = document.getElementById('bookingsTableContainer');
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'bookings-table';

    const header = document.createElement('thead');
    header.innerHTML = `
        <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Package</th>
            <th>People</th>
            <th>Departure Date</th>
            <th>Total Price</th>
            <th>Booked At</th>
        </tr>
    `;
    table.appendChild(header);

    const body = document.createElement('tbody');
    bookings.forEach((booking, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${booking.customerName || ''}</td>
            <td>${booking.email || ''}</td>
            <td>${booking.phone || ''}</td>
            <td>${booking.packageId ? booking.packageId.name : 'N/A'}</td>
            <td>${booking.numberOfPeople || ''}</td>
            <td>${booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : ''}</td>
            <td>₹${booking.totalPrice || ''}</td>
            <td>${new Date(booking.createdAt).toLocaleString()}</td>
        `;
        body.appendChild(row);
    });

    table.appendChild(body);
    container.appendChild(table);
}

// Load Packages from API
async function loadPackages() {
    try {
        const response = await fetch(`${API_URL}/packages`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            displayPackages(result.data);
        } else {
            document.getElementById('packagesContainer').innerHTML = 
                '<p style="text-align: center; grid-column: 1/-1;">No packages available. Please add packages in MongoDB.</p>';
        }
    } catch (error) {
        console.error('Error loading packages:', error);
        document.getElementById('packagesContainer').innerHTML = 
            '<p style="text-align: center; grid-column: 1/-1;">Error loading packages. Make sure the server is running.</p>';
    }
}

// Display Packages
function displayPackages(packages) {
    const container = document.getElementById('packagesContainer');
    container.innerHTML = '';
    
    packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'package-card';
        card.innerHTML = `
            <div class="package-header">
                <h3>${pkg.name}</h3>
                <p>${pkg.destination}</p>
            </div>
            <div class="package-body">
                <div class="package-detail">
                    <strong>Duration:</strong> ${pkg.duration} days
                </div>
                <div class="package-detail">
                    <strong>Description:</strong> ${pkg.description || 'Amazing experience awaits!'}
                </div>
                <div class="package-activities">
                    <strong>Activities:</strong><br>
                    ${pkg.activities.map(activity => `<span class="activity-badge">${activity}</span>`).join('')}
                </div>
                <div class="package-price">₹${pkg.price} per person</div>
                <button class="btn-book" onclick="bookPackage('${pkg._id}', '${pkg.name}', ${pkg.price})">
                    Book Now
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Book Package
function bookPackage(packageId, packageName, price) {
    const customerName = prompt('Enter your name:');
    if (!customerName) return;
    
    const email = prompt('Enter your email:');
    if (!email) return;
    
    const phone = prompt('Enter your phone number:');
    if (!phone) return;
    
    const numberOfPeople = prompt('Number of travelers:');
    if (!numberOfPeople || isNaN(numberOfPeople)) return;
    
    const departureDate = prompt('Departure date (YYYY-MM-DD):');
    if (!departureDate) return;
    
    // Send booking to API
    submitBooking({
        customerName,
        email,
        phone,
        packageId,
        numberOfPeople: parseInt(numberOfPeople),
        departureDate
    });
}

// Submit Booking
async function submitBooking(bookingData) {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(`✓ Booking Successful!\n\nBooking ID: ${result.data._id}\nTotal Price: ₹${result.data.totalPrice}\n\nWe will contact you soon at ${bookingData.email}`);
        } else {
            alert(`✗ Booking failed: ${result.message || result.error}`);
        }
    } catch (error) {
        console.error('Error submitting booking:', error);
        alert('Error submitting booking. Please try again.');
    }
}

// Setup Contact Form
function setupContactForm() {
    document.getElementById('contactForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const contactData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });
            
            const result = await response.json();
            const messageDiv = document.getElementById('contactMessage');
            
            if (result.success) {
                messageDiv.className = 'success';
                messageDiv.textContent = '✓ ' + result.message;
                document.getElementById('contactForm').reset();
            } else {
                messageDiv.className = 'error';
                messageDiv.textContent = '✗ ' + (result.message || result.error);
            }
            
            setTimeout(() => {
                messageDiv.textContent = '';
                messageDiv.className = '';
            }, 5000);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            const messageDiv = document.getElementById('contactMessage');
            messageDiv.className = 'error';
            messageDiv.textContent = '✗ Error sending message. Please try again.';
        }
    });
}
