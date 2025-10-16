document.addEventListener('DOMContentLoaded', function() {
    const fraudTypeSelect = document.getElementById('fraud-type');
    
    // --- লেবেল এলিমেন্টগুলি ---
    const labelName = document.getElementById('label-name');
    const labelNumber = document.getElementById('label-number');
    const labelLocation = document.getElementById('label-location');

    // --- ইনপুট ফিল্ড এলিমেন্টগুলি (placeholder পরিবর্তনের জন্য) ---
    const inputName = document.getElementById('fraud-name');
    const inputNumber = document.getElementById('fraud-number');
    const inputLocation = document.getElementById('fraud-location');

    // --- ডিফল্ট লেবেল টেক্সট ---
    const defaultLabels = {
    name: 'Fraudster Name',
    number: 'Fraudster Number',
   location: 'Fraud Location'
    };

    // --- ডিফল্ট placeholder টেক্সট ---
    const defaultPlaceholders = {
    name: 'প্রতারণাকারীর নাম লিখুন',
   number: 'প্রতারণাকারীর নাম্বার লিখুন',
    location: 'প্রতারণাকারীর ঠিকানা যদি থাকে '
    };

    /**
    * নির্বাচন অনুযায়ী লেবেল এবং placeholder পরিবর্তন করার ফাংশন
   * @param {string} type - নির্বাচিত জালিয়াতির প্রকার
   */
    function updateLabels(type) {
    let newNameLabel = defaultLabels.name;
   let newNumberLabel = defaultLabels.number;
    let newLocationLabel = defaultLabels.location;

    let newNamePlaceholder = defaultPlaceholders.name;
    let newNumberPlaceholder = defaultPlaceholders.number;
   let newLocationPlaceholder = defaultPlaceholders.location;

    // --- Fraud Type অনুযায়ী পরিবর্তন ---
   switch (type) {
   case 'Facebook Fraud':
   newNameLabel = 'Fraud Facebook ID Link';
   newNumberLabel = 'Fraud Facebook Name';
   newLocationLabel = 'Fraud Number';

   // 🟡 নিচে placeholder পরিবর্তন
   newNamePlaceholder = 'প্রতারণাকারীর Facebook প্রোফাইল লিংক দিন';
   newNumberPlaceholder = 'প্রতারণাকারীর Facebook নাম লিখুন';
    newLocationPlaceholder = 'যদি কোনো নাম্বার থাকে লিখুন';
    break;

   case 'Number Fraud':
   newNameLabel = 'Fraudster Number';
   newNumberLabel = 'Fraudster Name';
    newLocationLabel = 'Fraudster Location';

   // 🟡 placeholder পরিবর্তন
   newNamePlaceholder = 'প্রতারণাকারীর মোবাইল নাম্বার দিন';
   newNumberPlaceholder = 'প্রতারণাকারীর নাম লিখুন যদি থাকে';
    newLocationPlaceholder = 'প্রতারণাকারীর ঠিকানা যদি থাকে';
   break;

    case 'Percel Fraud':
    // ডিফল্ট রাখলে কিছু দরকার নেই
    break;

    case 'Whatsapp Fraud':
    newNameLabel = 'Fraudster Name';
   newNumberLabel = 'Fraudster Whatsapp Number';
   newLocationLabel = 'Fraudster Location';

    // 🟡 placeholder পরিবর্তন
   newNamePlaceholder = 'প্রতারণাকারীর নাম লিখুন যদি থাকে ';
    newNumberPlaceholder = 'প্রতারণাকারীর WhatsApp নাম্বার দিন';
   newLocationPlaceholder = 'প্রতারণাকারীর ঠিকানা যদি থাকে';
    break;

    case 'Instagram Fraud':
    newNameLabel = 'Fraudster Name';
    newNumberLabel = 'Fraud Instagram Profile Link';
    newLocationLabel = 'Fraudster Location';

    // 🟡 placeholder পরিবর্তন
   newNamePlaceholder = 'প্রতারণাকারীর নাম লিখুন যদি থাকে  ';
   newNumberPlaceholder = 'Instagram ID বা প্রোফাইল লিংক দিন';
   newLocationPlaceholder = 'প্রতারণাকারীর ঠিকানা যদি থাকে';
    break;

    case 'Others Fraud':
    // ডিফল্ট রাখলে placeholder একই থাকবে
    break;

   default:
   // কোনো প্রকার নির্বাচন না করলে ডিফল্ট থাকবে
    break;
    }

    // --- DOM এ লেবেল আপডেট করা ---
   labelName.textContent = newNameLabel;
    labelNumber.textContent = newNumberLabel;
    labelLocation.textContent = newLocationLabel;

   // --- 🟢 ইনপুট ফিল্ডে placeholder আপডেট করা ---
    inputName.placeholder = newNamePlaceholder;
    inputNumber.placeholder = newNumberPlaceholder;
    inputLocation.placeholder = newLocationPlaceholder;
    }

    // --- ড্রপডাউন পরিবর্তন হলে ফাংশনটি কল করা হবে ---
    fraudTypeSelect.addEventListener('change', function() {
    updateLabels(this.value);
    });

    // --- পেজ লোড হলে একবার ডিফল্ট সেট করা ---
    updateLabels(fraudTypeSelect.value);
});
