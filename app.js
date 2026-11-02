const bookingDate = document.getElementById('bookingDate');
const bookingTime = document.getElementById('bookingTime');
const whatsappBtn = document.getElementById('whatsappBtn');
const guestName = document.getElementById('guestName');
const guestPhone = document.getElementById('guestPhone');
const guestEmail = document.getElementById('guestEmail');
const serviceType = document.getElementById('serviceType');
const guestMessage = document.getElementById('guestMessage');

if (bookingDate) {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setHours(0, 0, 0, 0);
  bookingDate.min = minDate.toISOString().split('T')[0];
}

function checkBookingState() {
  if (!whatsappBtn || !guestName || !guestPhone || !bookingDate || !bookingTime) return;

  const valid = guestName.value.trim() && guestPhone.value.trim() && bookingDate.value && bookingTime.value;
  whatsappBtn.disabled = !valid;
}

[guestName, guestPhone, bookingDate, bookingTime].forEach((field) => {
  if (!field) return;
  field.addEventListener('input', checkBookingState);
  field.addEventListener('change', checkBookingState);
});

if (whatsappBtn) {
  whatsappBtn.addEventListener('click', function () {
    if (!guestName || !guestPhone || !bookingDate || !bookingTime) return;

    if (!guestName.value.trim() || !guestPhone.value.trim() || !bookingDate.value || !bookingTime.value) {
      alert('Te rugăm să completezi numele, telefonul, data și ora!');
      return;
    }

    const name = guestName.value.trim();
    const phone = guestPhone.value.trim();
    const email = guestEmail && guestEmail.value.trim() ? `Email: ${guestEmail.value.trim()}\n` : '';
    const service = serviceType ? serviceType.value : 'Sesiune de ThetaHealing';
    const messageText = guestMessage && guestMessage.value.trim() ? guestMessage.value.trim() : 'Vreau să rezerv o sesiune.';

    const message = `Bună ziua! Mă numesc ${name}. Vreau să rezerv o ${service} la data de ${bookingDate.value} la ora ${bookingTime.value}. Telefon: ${phone}.\n${email}Mesaj: ${messageText}`;
    const url = `https://wa.me/40768368992?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}

