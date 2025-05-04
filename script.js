// ========== Sidebar Toggle ==========
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// ========== Sticky Header ==========
let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.getElementById("header");
    if (navbar) {
        navbar.style.top = prevScrollPos > currentScrollPos ? "0" : "-60px";
        prevScrollPos = currentScrollPos;
    }
};

// ========== Bag Preview ==========
function showBoyBag() {
    const img = document.getElementById('bagImage');
    if (img) {
        img.src = 'bott';
        img.alt = 'Boy Bag';
    }
}

function showGirlBag() {
    const img = document.getElementById('bagImage');
    if (img) {
        img.src = 'girl-bag.jpg';
        img.alt = 'Girl Bag';
    }
}

// ========== Image Upload and Preview ==========
document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const form = document.getElementById('signup-form');
    
    if (fileInput && preview) {
        fileInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            alert('Image submitted successfully!');
        });
    }
});

// ========== Form Validation ==========
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let valid = true;
            
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            
            document.getElementById("nameError").innerText = name ? "" : "Name is required";
            document.getElementById("emailError").innerText = email.includes("@") ? "" : "Enter a valid email";
            document.getElementById("passwordError").innerText = password.length >= 6 ? "" : "Password must be at least 6 characters";
            document.getElementById("confirmPasswordError").innerText = confirmPassword === password ? "" : "Passwords do not match";
            
            if (!name || !email.includes("@") || password.length < 6 || confirmPassword !== password) {
                valid = false;
            }

            if (valid) {
                alert("Sign-up successful!");
            }
        });
    }
});

// ========== State-City Dropdown ==========

document.addEventListener("DOMContentLoaded", function () {
    const stateCityData = {
    
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", 
            "Rajamahendravaram", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Eluru", "Vizianagaram", "Ongole", "Nandyal", "Machilipatnam", "Tenali", "Chittoor", "Hindupur", "Srikakulam", "Bhimavaram", "Tadepalligudem", "Guntakal", "Dharmavaram", "Gudivada", "Narasaraopet", "Kadiri", "Tadipatri", "Chilakaluripet", "Yemmiganur", "Madanapalle", "Proddatur", "Adoni", "Mangalagiri-Tadepalli", "Amaravati", "Palakonda", "Sullurpeta", "Nellimarla", "Gooty", "Kalyandurg", "Dowleswaram", "Hukumpeta", "Katheru"],
            
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", 
            "Naharlagun", "Roing", "Tezu", "Along", "Daporijo", "Yingkiong", "Seppa", "Khonsa", "Changlang", "Namsai", "Dirang", "Anini", "Hawai", "Mechuka", "Lohit", "Pangin", "Koloriang", "Basar"],
        
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Nagaon", 
                "Tinsukia", "Bongaigaon", "Goalpara", "Karimganj", "Sivasagar", "Lakhimpur", "Barpeta", "Dhubri", "Diphu", "Golaghat", "Hailakandi", "Morigaon", "North Lakhimpur", "Nalbari", "Hojai", "Baksa", "Udalguri", "Chirang", "Sonitpur", "Majuli", "Kokrajhar"],
        
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", 
                    "Ara", "Begusarai", "Katihar", "Munger", "Chhapra", "Hajipur", "Siwan", "Bettiah", "Saharsa", "Motihari", "Nawada", "Buxar", "Kishanganj", "Samastipur", "Sitamarhi", "Dehri", "Sasaram", "Jamalpur", "Jehanabad", "Lakhisarai", "Sheikhpura", "Nalanda", "Madhepura", "Araria", "Gopalganj", "Aurangabad", "Khagaria", "Vaishali", "Sheohar", "Arwal", "Banka", "Rohtas", "Kaimur"],

    "Chhattisgarh": ["Raipur", "Bhilai", "Durg", "Bilaspur", "Korba", "Raigarh", 
            "Jagdalpur", "Ambikapur", "Rajnandgaon", "Dhamtari", "Kanker", "Mahasamund", "Janjgir-Champa", "Kawardha", "Surajpur", "Balrampur", "Sarangarh", "Bemetara", "Baloda Bazar", "Mungeli", "Gariaband", "Sukma", "Bijapur", "Narayanpur"],
        
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", 
                "Gandhinagar", "Junagadh", "Anand", "Nadiad", "Navsari", "Vapi", "Morbi", "Surendranagar", "Mehsana", "Bharuch", "Porbandar", "Gondal", "Veraval", "Godhra", "Palanpur", "Valsad", "Amreli", "Botad", "Dahod", "Mahesana", "Patan", "Modasa", "Himatnagar", "Dwarka", "Keshod"],
        
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", 
            "Curchorem", "Sanquelim", "Valpoi", "Canacona", "Quepem", "Sanguem", "Dabolim", "Aldona", "Calangute", "Cuncolim", "Chimbel", "Pernem", "Mandrem", "Siolim", "Assagao", "Verna", "Saligao", "Colva", "Betalbatim", "Cavelossim", "Navelim", "Benaulim", "Reis Magos", "Old Goa", "Tivim", "Dharbandora"],
            
    "Haryana": ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", 
            "Rohtak", "Sonipat", "Panchkula", "Yamunanagar", "Bahadurgarh", "Rewari", "Sirsa", "Bhiwani", "Jind", "Kaithal", "Palwal", "Kurukshetra", "Fatehabad", "Mahendragarh", "Narnaul", "Charkhi Dadri", "Jhajjar", "Narwana", "Tosham", "Gohana", "Samalkha", "Hansi", "Kalanaur", "Ratia"],
            
    "Himachal Pradesh": ["Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul and Spiti","Mandi",
        "Shimla","Sirmaur","Solan","Una"],
            
            
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", 
                "Hazaribagh", "Giridih", "Ramgarh", "Chirkunda", "Phusro", "Medininagar", "Chaibasa", "Sahibganj", "Godda", "Gumia", "Simdega", "Latehar", "Pakur", "Jhumri Telaiya", "Lohardaga", "Dumka", "Barhi", "Ghatshila", "Chatra", "Garhwa", "Koderma"],
                
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Dharwad", "Mangaluru", 
            "Belagavi", "Kalaburagi", "Ballari", "Bidar", "Tumakuru", "Shivamogga", "Raichur", "Davangere", "Hassan", "Bagalkot", "Vijayapura", "Udupi", "Chikkamagaluru", "Kolar", "Mandya", "Chitradurga", "Ramanagara", "Yadgir", "Chikkaballapur", "Gadag", "Karwar", "Haveri", "Sirsi", "Hospet", "Madikeri"],

    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", 
            "Alappuzha", "Kannur", "Palakkad", "Kottayam", "Malappuram", "Pathanamthitta", "Idukki", "Wayanad", "Kasaragod", "Varkala", "Chengannur", "Perinthalmanna", "Ponnani", "Payyanur", "Tirur", "Neyyattinkara"],
            
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", 
            "Solapur", "Amravati", "Kolhapur", "Akola", "Latur", "Nanded", "Sangli", "Jalgaon", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Satara", "Beed", "Yavatmal", "Wardha", "Panvel", "Bhiwandi", "Ratnagiri", "Gondia", "Osmanabad", "Nandurbar", "Hingoli", "Washim", "Gadchiroli"],

    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul", 
            "Senapati", "Kakching", "Tamenglong", "Jiribam", "Chandel", "Tengnoupal", "Kangpokpi", "Noney", "Pherzawl"],
        
    "Meghalaya": ["Shillong", "Tura", "Nongpoh", "Jowai", "Baghmara", "Williamnagar", 
            "Resubelpara", "Nongstoin", "Mairang", "Mawkyrwat", "Ampati", "Khliehriat", "Sohra"],
        
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Saiha", 
            "Mamit", "Lawngtlai", "Saitual", "Hnahthial", "Khawzawl"],
        
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", 
            "Mon", "Phek", "Longleng", "Kiphire", "Peren", "Noklak"],
            
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri", "Berhampur", 
                "Balasore", "Baripada", "Jharsuguda", "Angul", "Bargarh", "Kendujhar", "Rayagada", "Jeypore", "Paralakhemundi", "Kendrapara", "Dhenkanal", "Phulbani", "Koraput", "Nayagarh"],
        
    "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali", 
            "Hoshiarpur", "Moga", "Pathankot", "Phagwara", "Abohar", "Firozpur", "Barnala", "Faridkot", "Kapurthala", "Sangrur", "Malerkotla", "Ropar", "Tarn Taran", "Muktsar"],
            
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", 
            "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Beawar", "Baran", "Bhiwadi", "Jaisalmer", "Hanumangarh", "Chittorgarh", "Tonk", "Sawai Madhopur", "Nagaur", "Dholpur", "Churu", "Jhunjhunu", "Bundi", "Dausa", "Karauli", "Jhalawar", "Sirohi", "Pratapgarh", "Rajsamand", "Barmer", "Banswara", "Dungarpur", "Kishangarh", "Makrana", "Sujangarh", "Hindaun", "Nokha", "Nathdwara", "Phalodi", "Didwana", "Losal", "Ratangarh", "Laxmangarh", "Merta City", "Sadulpur", "Gangapur City", "Pilani", "Sardarshahar", "Nasirabad", "Raisinghnagar", "Balotra", "Bayana", "Fatehpur", "Kekri", "Kapasan", "Malpura", "Nimbahera", "Rani", "Rawatbhata", "Shahpura", "Suratgarh", "Taranagar", "Vijainagar"],
            
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Jorethang", 
                "Singtam", "Pakyong", "Ravangla", "Soreng", "Dentam", "Chungthang", "Yuksom", "Zuluk", "Lachung", "Lachen", "Rhenock"],
        
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", 
                    "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur", "Dindigul", "Tiruppur", "Karur", "Nagapattinam", "Cuddalore", "Nagercoil", "Villupuram", "Kanchipuram", "Ariyalur", "Perambalur", "Namakkal", "Sivaganga", "Ramanathapuram", "Virudhunagar", "Tiruvannamalai", "Krishnagiri", "Dharmapuri", "Theni", "Nilgiris", "Pudukkottai"],
                    
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", 
            "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Siddipet", "Miryalaguda", "Jagtial", "Suryapet", "Mancherial", "Bhongir", "Medak", "Zaheerabad", "Vikarabad", "Kamareddy", "Bodhan"],
        
    "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Belonia", 
            "Ambassa", "Khowai", "Sonamura", "Teliamura", "Bishalgarh", "Sabroom", "Jogendranagar"],
        
    "Uttar Pradesh": ["Agra","Aligarh","Allahabad","Ambedkar Nagar","Amethi","Amroha",
                "Auraiya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Faizabad","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kheri","Kushinagar","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Prayagraj","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"],  
                
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Roorkee", "Rishikesh", 
            "Haldwani", "Kashipur", "Ramnagar", "Mussoorie", "Pithoragarh", "Bageshwar", "Almora", "Tehri", "Srinagar", "Chamoli", "Rudrapur", "Kotdwar", "Lansdowne"],

            
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri",           
                "Darjeeling", "Bardhaman", "Malda", "Kharagpur", "Haldia", "Jalpaiguri", "Berhampore", "Cooch Behar", "Balurghat", "Krishnanagar", "Raiganj", "Serampore", "Bankura", "Purulia", "Santipur"],
                
                // Union Territories
    "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Mayabunder", "Rangat", 
                    "Hut Bay", "Neil Island", "Havelock Island", "Car Nicobar", "Campbell Bay", "Great Nicobar", "Little Andaman"],

    "Chandigarh": ["Chandigarh", "Manimajra", "Sector 17", "Sector 22", "Sector 43", 
            "Daria", "Industrial Area Phase I", "Industrial Area Phase II"],
            
    "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu", "Amli", 
                "Samarvarni", "Marwad", "Naroli", "Kachigam", "Ghoghola", "Khilvani"],

    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh", "Lajpat Nagar", 
                    "Chandni Chowk", "Connaught Place", "Vasant Kunj", "Mayur Vihar", "Janakpuri", "Pitampura", "Rajouri Garden", "Hauz Khas", "Okhla", "Kalkaji", "Preet Vihar", "Greater Kailash", "Narela", "Burari", "Shahdara"],
                    
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", 
                        "Kupwara", "Pulwama", "Poonch", "Kathua", "Rajouri", "Bandipora", "Budgam", "Kulgam", "Shopian", "Ganderbal", "Reasi", "Doda", "Kishtwar", "Samba", "Ramban"],
                        
    "Ladakh": ["Leh", "Kargil", "Diskit", "Nubra", "Tangtse", "Nyoma", "Drass", 
                            "Padum", "Zanskar", "Skardu"],
                            
    "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Amini", "Kadmat", "Kalpeni", 
                                "Andrott", "Kiltan", "Chetlat", "Bitra"],
                                
    "Puducherry": ["Puducherry","Oulgaret","Ariyankuppam","Manavely","Kurumbapet",
                                    "Villianur","Bahour","Nettapakkam","Muthialpet","Solai Nagar","Vaithikuppam","V.O.C Nagar","Thiruvalluvar Nagar","Perumal Koil","Kurusukuppam","Raj Bhavan","Cathedral","Goubert Nagar","Elango Nagar","Pudupalayam","Pillaithottam","Sakthi Nagar","Anna Nagar","Nellithope"],
                                    
    "Karaikal": ["Karaikal", "Neravy", "Thirunallar", "Nedungadu", "Kottucherry", 
                                        "Tirumalairayanpattinam"],
                                
    "Mahe": ["Mahe", "Palloor", "Pandakkal", "Chalakkara"],
                                        
    "Yanam": ["Yanam", "Farampeta", "Kanakalapeta", "Mettacur", "Darialatippa","Agraharam"],

};
                                        
                                        
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");

    if (stateSelect && citySelect) {
        Object.keys(stateCityData).forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });

        stateSelect.addEventListener("change", function () {
            citySelect.innerHTML = '<option value="">Select City</option>';
            const selectedState = stateSelect.value;

            if (selectedState in stateCityData) {
                stateCityData[selectedState].forEach(city => {
                    const option = document.createElement("option");
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }
        });
    }
});

// ========== Search Expansion ==========
document.addEventListener('DOMContentLoaded', function () {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    if (searchContainer && searchInput && searchButton) {
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        document.body.appendChild(overlay);

        function toggleSearch() {
            searchContainer.classList.toggle('expanded');
            overlay.classList.toggle('active');
            if (searchContainer.classList.contains('expanded')) {
                searchInput.focus();
            }
        }

        searchInput.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!searchContainer.classList.contains('expanded')) {
                toggleSearch();
            }
        });

        searchButton.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleSearch();
        });

        overlay.addEventListener('click', function () {
            if (searchContainer.classList.contains('expanded')) {
                toggleSearch();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchContainer.classList.contains('expanded')) {
                toggleSearch();
            }
        });
        
        searchContainer.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
});

// ========== Uniform section display based on gender and uniform selection ==========

const genderSelect = document.getElementById('gender-select');
const uniformSelect = document.getElementById('uniform-select');

const summerSection = document.getElementById('summer-uniform');
const winterSection = document.getElementById('winter-uniform');

const summerTitle = document.getElementById('summer-title');
const winterTitle = document.getElementById('winter-title');

const addToCartContainer = document.getElementById('add-to-cart-container');
const addToCartButton = document.getElementById('add-to-cart-btn');

const quantityInputs = document.querySelectorAll('input[type="number"]');
const resetButton = document.getElementById('reset-btn');

// Function to show/hide summer/winter uniform
function updateUniformDisplay() {
  const gender = genderSelect.value;
  const uniform = uniformSelect.value;

  summerSection.style.display = 'none';
  winterSection.style.display = 'none';

  if (gender && uniform === 'Summer') {
    summerSection.style.display = 'block';
    summerTitle.textContent = `${gender} Summer Uniform`;
  } else if (gender && uniform === 'Winter') {
    winterSection.style.display = 'block';
    winterTitle.textContent = `${gender} Winter Uniform`;
  }

  // Also reset the Add to Cart visibility when uniform type changes
  checkQuantities();
}

//=======Reset Button==========

if (resetButton && quantityInputs.length > 0) {
    resetButton.addEventListener('click', () => {
        quantityInputs.forEach(input => {
            input.value = ''; // Reset all number inputs to empty
        });
        if (addToCartContainer) {
            addToCartContainer.style.display = 'none'; // Hide the Add to Cart container
        }
    });
}
genderSelect.addEventListener('change', updateUniformDisplay);
uniformSelect.addEventListener('change', updateUniformDisplay);

// --- Add to Cart Button Logic ---

function checkQuantities() {
    let hasQuantity = false;
    if (quantityInputs.length > 0) {
        quantityInputs.forEach(input => {
            if (parseInt(input.value) > 0) {
                hasQuantity = true;
            }
        });
    }
    if (addToCartContainer) {
        addToCartContainer.style.display = hasQuantity ? 'block' : 'none';
    }
}

// Attach listener to all number inputs
quantityInputs.forEach(input => {
  input.addEventListener('input', checkQuantities);
});

// Optional: Handle Add to Cart click
addToCartButton.addEventListener('click', () => {
  alert('Items added to cart!');
  // Add your logic here to process cart data
});
