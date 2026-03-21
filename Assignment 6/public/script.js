const API_BASE = '/api';

function showToast(message, type = 'info') {
  const toastEl = document.getElementById('toast');
  toastEl.textContent = message;
  toastEl.className = `toast show ${type}`;
  setTimeout(() => {
    toastEl.className = 'toast';
  }, 2200);
}

async function fetchItems() {
  const res = await fetch(`${API_BASE}/items`);
  return res.json();
}

async function fetchBookings() {
  const res = await fetch(`${API_BASE}/bookings`);
  return res.json();
}

async function renderItems() {
  const items = await fetchItems();
  const container = document.getElementById('items');
  container.innerHTML = '';

  if (!items.length) {
    container.innerHTML = '<p>No items yet.</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <div class="meta">
        <span class="badge">${item.category}</span>
        <span class="badge ${item.condition.toLowerCase()}">${item.condition}</span>
        <strong>&#8377;${item.price.toFixed(2)}</strong>
        <span>${item.location || 'Unknown location'}</span>
      </div>
      <p>${item.description || 'No description provided.'}</p>
      <p><strong>Seller:</strong> ${item.sellerName}</p>
      <button data-id="${item._id}">Book an Appointment</button>
      <div class="booking-form" id="booking-${item._id}" style="display:none;">
        <input data-field="customerName" placeholder="Your Name" required />
        <input data-field="customerEmail" placeholder="Your Email" />
        <input data-field="customerPhone" placeholder="Your Phone" />
        <input type="datetime-local" data-field="appointmentDate" required />
        <input data-field="notes" placeholder="Notes" />
        <button class="submit-booking" data-id="${item._id}">Submit Booking</button>
      </div>
    `;
    container.appendChild(card);

    card.querySelector('button').addEventListener('click', () => {
      const form = document.getElementById(`booking-${item._id}`);
      form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    card.querySelector('.submit-booking').addEventListener('click', async () => {
      const form = document.getElementById(`booking-${item._id}`);
      const data = {};
      form.querySelectorAll('input').forEach(inp => {
        const name = inp.getAttribute('data-field');
        data[name] = inp.value;
      });

      if (!data.customerName || !data.appointmentDate) {
        showToast('Please enter name and appointment date.', 'error');
        return;
      }

      const response = await fetch(`${API_BASE}/items/${item._id}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        showToast('Booking created successfully!','success');
        form.style.display = 'none';
        renderBookings();
      } else {
        const err = await response.json();
        showToast(err.error || 'Unable to create booking', 'error');
      }
    });
  });
}

async function renderBookings() {
  const bookings = await fetchBookings();
  const container = document.getElementById('bookings');
  container.innerHTML = '';

  if (!bookings.length) {
    container.innerHTML = '<p>No bookings yet.</p>';
    return;
  }

  bookings.forEach(b => {
    const card = document.createElement('div');
    card.className = 'booking-card';
    card.innerHTML = `
      <h4>${b.customerName} (${b.customerEmail || 'No email'})</h4>
      <p>Item: ${b.item?.title || 'deleted item'} ($${b.item?.price || '0'})</p>
      <p>Appointment: ${new Date(b.appointmentDate).toLocaleString()}</p>
      <p>${b.notes || ''}</p>
    `;
    container.appendChild(card);
  });
}

const itemForm = document.getElementById('itemForm');
itemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(itemForm);
  const payload = {
    title: formData.get('title'),
    category: formData.get('category'),
    condition: formData.get('condition'),
    price: Number(formData.get('price')),
    sellerName: formData.get('sellerName'),
    location: formData.get('location'),
    description: formData.get('description')
  };

  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    itemForm.reset();
    showToast('Item added successfully!','success');
    await renderItems();
  } else {
    const err = await res.json();
    showToast(err.error || 'Unable to add item','error');
  }
});

(async () => {
  await renderItems();
  await renderBookings();
})();
