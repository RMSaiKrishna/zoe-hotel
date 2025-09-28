// Zoe Hotel - Main JavaScript File

// Variables
let deferredPrompt;
const installButton = document.getElementById('installButton');

// Hide the install button by default
if (installButton) {
  installButton.style.display = 'none';
}

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show the install button
  if (installButton) {
    installButton.style.display = 'flex';
    
    // Add click event to the install button
    installButton.addEventListener('click', () => {
      // Hide the install button
      installButton.style.display = 'none';
      
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clear the deferredPrompt variable
        deferredPrompt = null;
      });
    });
  }
});

// Listen for the appinstalled event
window.addEventListener('appinstalled', (e) => {
  console.log('App was installed successfully');
  
  // Hide the install button after installation
  if (installButton) {
    installButton.style.display = 'none';
  }
});

// Menu item order functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get all order buttons
  const orderButtons = document.querySelectorAll('.menu-item .btn');
  
  // Add click event to each order button
  orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const menuItem = e.target.closest('.menu-item');
      const itemName = menuItem.querySelector('h3').textContent;
      const itemPrice = menuItem.querySelector('.price').textContent;
      
      // Show a simple alert for now (in a real app, this would add to cart)
      alert(`Added ${itemName} (${itemPrice}) to your order!`);
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Adjust for header height
        behavior: 'smooth'
      });
    }
  });
});