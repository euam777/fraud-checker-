
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
//=========view all tools close========//


//======fb report form start=======//
// 🎯 সব প্রয়োজনীয় এলিমেন্ট সিলেক্ট করা হচ্ছে
const openForm = document.getElementById("openForm");
const panel = document.getElementById("reportPanel");
const needHelp = document.getElementById("needHelp");
const helpFields = document.getElementById("helpFields");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("reportForm");

// 🧩 রিপোর্ট ফর্ম ওপেন / ক্লোজ টগল
openForm.addEventListener("click", () => {
  panel.classList.toggle("active");
});

// 🧩 "আমাদের থেকে সহযোগিতা পেতে চান" চেকবক্সের কাজ
needHelp.addEventListener("change", (e) => {
  helpFields.style.display = e.target.checked ? "block" : "none";
});

// 🧩 ক্যান্সেল বাটন প্রেস করলে ফর্ম রিসেট হবে
cancelBtn.addEventListener("click", () => {
  form.reset();
  helpFields.style.display = "none";
  panel.classList.remove("active");
});

// 🧩 সাবমিট করলে নতুন "Welcome" পেজে রিডাইরেক্ট হবে
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // ✅ চাইলে এখানে ডাটা সার্ভারে পাঠানোর কোড রাখতে পারো
  // fetch('/submit', { method: 'POST', body: new FormData(form) });

  // ✅ এখন ইউজারকে welcome পেজে পাঠানো হবে
  window.location.href = "../report/submitreport.html";

  // ফর্ম রিসেট (ঐচ্ছিক)
  form.reset();
  helpFields.style.display = "none";
  panel.classList.remove("active");
});

//======fb report from close=======//

//========advantage box start=========//
function toggleDetails(element) {
  const isActive = element.classList.contains("active");

  document.querySelectorAll(".benefit.active").forEach(item => {
    if (item !== element) item.classList.remove("active");
  });

  element.classList.toggle("active", !isActive);
}

//========advantage box close=========//

//======bug-report-section start=======//

// যে উপাদানগুলিতে ক্লিক ইভেন্টগুলি যুক্ত করতে হবে সেগুলিকে নির্বাচন করুন
const openFormCard = document.getElementById('openFormCard');
const bugReportForm = document.getElementById('bugReportForm');
const cancelButton = document.getElementById('cancelButton');

// প্রাথমিক কার্ডে ক্লিক করলে ফর্মটি চালু করার ফাংশন
openFormCard.addEventListener('click', () => {
    // প্রাথমিক কার্ডটি লুকানো হবে
    openFormCard.classList.add('hidden');
    openFormCard.classList.remove('visible');
    
    // রিপোর্ট ফর্মটি দৃশ্যমান হবে
    bugReportForm.classList.add('visible');
    bugReportForm.classList.remove('hidden');
});

// Cancel বাটনে ক্লিক করলে ফর্মটি বন্ধ করার ফাংশন
cancelButton.addEventListener('click', () => {
    // রিপোর্ট ফর্মটি লুকানো হবে
    bugReportForm.classList.add('hidden');
    bugReportForm.classList.remove('visible');
    
    // প্রাথমিক কার্ডটি আবার দৃশ্যমান হবে
    openFormCard.classList.add('visible');
    openFormCard.classList.remove('hidden');
});
//======bug-report-section close=======//
