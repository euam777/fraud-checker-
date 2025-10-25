
// মূল বাটন এবং মেনু এলিমেন্টগুলো সিলেক্ট করা
const mainButton = document.getElementById('main-attachment-button');
const attachmentMenu = document.getElementById('attachmentMenu');

// অটো-ক্লোজ টাইমার হ্যান্ডেল করার জন্য একটি ভেরিয়েবল সেট করা হলো
let autoCloseTimeout;

// 🟢 মেনু বন্ধ করার মূল ফাংশন
function closeMenu() {
    // যদি মেনুটি খোলা থাকে
    if (attachmentMenu.classList.contains('open')) {
        attachmentMenu.classList.remove('open');
    }
    // যদি কোনো অটো-ক্লোজ টাইমার চালু থাকে, সেটি বাতিল করা
    clearTimeout(autoCloseTimeout);
}

// 🟢 মেনু খোলার মূল ফাংশন
function openMenu() {
    attachmentMenu.classList.add('open');
    
    // কোনো পূর্ববর্তী টাইমার থাকলে তা বাতিল করা
    clearTimeout(autoCloseTimeout); 
    
    // অটোমেটিক ৬ সেকেন্ড পর বন্ধ করার টাইমার সেট করা
    autoCloseTimeout = setTimeout(() => {
        closeMenu();
    }, 6000); // ৬০০০ মিলিসেকেন্ড = ৬ সেকেন্ড
}

// মূল ফাংশনালিটি শুরু
if (mainButton && attachmentMenu) {
    
    // ১. বাটনে ক্লিক করলে মেনু টগল (Toggle) করা
    mainButton.addEventListener('click', function(event) {
        event.stopPropagation(); 
        
        if (attachmentMenu.classList.contains('open')) {
            closeMenu(); // যদি খোলা থাকে, বন্ধ করুন
        } else {
            openMenu(); // যদি বন্ধ থাকে, খুলুন
        }
    });

    // ২. মেনুর বাইরে ক্লিক করলে মেনু লুকিয়ে ফেলা
    document.addEventListener('click', function(event) {
        // যদি ক্লিক করা স্থানটি মূল বাটন বা মেনুর অংশ না হয়
        if (!attachmentMenu.contains(event.target) && !mainButton.contains(event.target)) {
            closeMenu();
        }
    });

    // ৩. 💡 নতুন ফাংশনালিটি: স্ক্রল করলে মেনু বন্ধ করা
    window.addEventListener('scroll', function() {
        closeMenu();
    });

    // ৪. ফুটারের বছরের জন্য স্ক্রিপ্ট (আগের মতো)
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
