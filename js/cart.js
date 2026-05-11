// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('hershelf-cart')) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('hershelf-cart', JSON.stringify(cart));
}

// Add to cart
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  updateCartCount();
  showCartNotification(name);
}

// Update cart count in navbar
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }
}

// Show notification
function showCartNotification(name) {
  const notif = document.getElementById('cart-notif');
  if (notif) {
    notif.textContent = '✓ Added to cart';
    notif.style.display = 'block';
    setTimeout(() => {
      notif.style.display = 'none';
    }, 2000);
  }
}

// Order on WhatsApp
function orderOnWhatsApp() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  let message = 'Hello! I would like to pre-order:%0A%0A';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    message += `• ${item.name} x${item.qty} — EGP ${itemTotal}%0A`;
  });

  message += `%0A*Total: EGP ${total}*%0A%0APlease confirm my order!`;

  window.open(`https://wa.me/201559789954?text=${message}`, '_blank');

  // Clear cart after order
  cart = [];
  saveCart();
  updateCartCount();
}

// Run on every page
updateCartCount();