    //========= State and City Data ==========

     const stateCityData = {
    
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajamahendravaram", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Eluru", "Vizianagaram", "Ongole", "Nandyal", "Machilipatnam", "Tenali", "Chittoor", "Hindupur", "Srikakulam", "Bhimavaram", "Tadepalligudem", "Guntakal", "Dharmavaram", "Gudivada", "Narasaraopet", "Kadiri", "Tadipatri", "Chilakaluripet", "Yemmiganur", "Madanapalle", "Proddatur", "Adoni", "Mangalagiri-Tadepalli", "Amaravati", "Palakonda", "Sullurpeta", "Nellimarla", "Gooty", "Kalyandurg", "Dowleswaram", "Hukumpeta", "Katheru"],
                
        "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Naharlagun", "Roing", "Tezu", "Along", "Daporijo", "Yingkiong", "Seppa", "Khonsa", "Changlang", "Namsai", "Dirang", "Anini", "Hawai", "Mechuka", "Lohit", "Pangin", "Koloriang", "Basar"],
            
        "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Nagaon", "Tinsukia", "Bongaigaon", "Goalpara", "Karimganj", "Sivasagar", "Lakhimpur", "Barpeta", "Dhubri", "Diphu", "Golaghat", "Hailakandi", "Morigaon", "North Lakhimpur", "Nalbari", "Hojai", "Baksa", "Udalguri", "Chirang", "Sonitpur", "Majuli", "Kokrajhar"],
            
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Ara", "Begusarai", "Katihar", "Munger", "Chhapra", "Hajipur", "Siwan", "Bettiah", "Saharsa", "Motihari", "Nawada", "Buxar", "Kishanganj", "Samastipur", "Sitamarhi", "Dehri", "Sasaram", "Jamalpur", "Jehanabad", "Lakhisarai", "Sheikhpura", "Nalanda", "Madhepura", "Araria", "Gopalganj", "Aurangabad", "Khagaria", "Vaishali", "Sheohar", "Arwal", "Banka", "Rohtas", "Kaimur"],
    
        "Chhattisgarh": ["Raipur", "Bhilai", "Durg", "Bilaspur", "Korba", "Raigarh", "Jagdalpur", "Ambikapur", "Rajnandgaon", "Dhamtari", "Kanker", "Mahasamund", "Janjgir-Champa", "Kawardha", "Surajpur", "Balrampur", "Sarangarh", "Bemetara", "Baloda Bazar", "Mungeli", "Gariaband", "Sukma", "Bijapur", "Narayanpur"],
            
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Nadiad", "Navsari", "Vapi", "Morbi", "Surendranagar", "Mehsana", "Bharuch", "Porbandar", "Gondal", "Veraval", "Godhra", "Palanpur", "Valsad", "Amreli", "Botad", "Dahod", "Mahesana", "Patan", "Modasa", "Himatnagar", "Dwarka", "Keshod"],
            
        "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Valpoi", "Canacona", "Quepem", "Sanguem", "Dabolim", "Aldona", "Calangute", "Cuncolim", "Chimbel", "Pernem", "Mandrem", "Siolim", "Assagao", "Verna", "Saligao", "Colva", "Betalbatim", "Cavelossim", "Navelim", "Benaulim", "Reis Magos", "Old Goa", "Tivim", "Dharbandora"],
                
        "Haryana": ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Rohtak", "Sonipat", "Panchkula", "Yamunanagar", "Bahadurgarh", "Rewari", "Sirsa", "Bhiwani", "Jind", "Kaithal", "Palwal", "Kurukshetra", "Fatehabad", "Mahendragarh", "Narnaul", "Charkhi Dadri", "Jhajjar", "Narwana", "Tosham", "Gohana", "Samalkha", "Hansi", "Kalanaur", "Ratia"],
                
        "Himachal Pradesh": ["Bilaspur","Chamba","Hamirpur","Kangra","Kinnaur","Kullu","Lahaul and Spiti","Mandi","Shimla","Sirmaur","Solan","Una"],
                
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Chirkunda", "Phusro", "Medininagar", "Chaibasa", "Sahibganj", "Godda", "Gumia", "Simdega", "Latehar", "Pakur", "Jhumri Telaiya", "Lohardaga", "Dumka", "Barhi", "Ghatshila", "Chatra", "Garhwa", "Koderma"],
                    
        "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Ballari", "Bidar", "Tumakuru", "Shivamogga", "Raichur", "Davangere", "Hassan", "Bagalkot", "Vijayapura", "Udupi", "Chikkamagaluru", "Kolar", "Mandya", "Chitradurga", "Ramanagara", "Yadgir", "Chikkaballapur", "Gadag", "Karwar", "Haveri", "Sirsi", "Hospet", "Madikeri"],
    
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Kannur", "Palakkad", "Kottayam", "Malappuram", "Pathanamthitta", "Idukki", "Wayanad", "Kasaragod", "Varkala", "Chengannur", "Perinthalmanna", "Ponnani", "Payyanur", "Tirur", "Neyyattinkara"],
                
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Akola", "Latur", "Nanded", "Sangli", "Jalgaon", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Satara", "Beed", "Yavatmal", "Wardha", "Panvel", "Bhiwandi", "Ratnagiri", "Gondia", "Osmanabad", "Nandurbar", "Hingoli", "Washim", "Gadchiroli"],
    
        "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul", "Senapati", "Kakching", "Tamenglong", "Jiribam", "Chandel", "Tengnoupal", "Kangpokpi", "Noney", "Pherzawl"],
            
        "Meghalaya": ["Shillong", "Tura", "Nongpoh", "Jowai", "Baghmara", "Williamnagar", "Resubelpara", "Nongstoin", "Mairang", "Mawkyrwat", "Ampati", "Khliehriat", "Sohra"],
            
        "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Saiha", "Mamit", "Lawngtlai", "Saitual", "Hnahthial", "Khawzawl"],
            
        "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Phek", "Longleng", "Kiphire", "Peren", "Noklak"],
                
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri", "Berhampur", "Balasore", "Baripada", "Jharsuguda", "Angul", "Bargarh", "Kendujhar", "Rayagada", "Jeypore", "Paralakhemundi", "Kendrapara", "Dhenkanal", "Phulbani", "Koraput", "Nayagarh"],
            
        "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Moga", "Pathankot", "Phagwara", "Abohar", "Firozpur", "Barnala", "Faridkot", "Kapurthala", "Sangrur", "Malerkotla", "Ropar", "Tarn Taran", "Muktsar"],
                
        "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Beawar", "Baran", "Bhiwadi", "Jaisalmer", "Hanumangarh", "Chittorgarh", "Tonk", "Sawai Madhopur", "Nagaur", "Dholpur", "Churu", "Jhunjhunu", "Bundi", "Dausa", "Karauli", "Jhalawar", "Sirohi", "Pratapgarh", "Rajsamand", "Barmer", "Banswara", "Dungarpur", "Kishangarh", "Makrana", "Sujangarh", "Hindaun", "Nokha", "Nathdwara", "Phalodi", "Didwana", "Losal", "Ratangarh", "Laxmangarh", "Merta City", "Sadulpur", "Gangapur City", "Pilani", "Sardarshahar", "Nasirabad", "Raisinghnagar", "Balotra", "Bayana", "Fatehpur", "Kekri", "Kapasan", "Malpura", "Nimbahera", "Rani", "Rawatbhata", "Shahpura", "Suratgarh", "Taranagar", "Vijainagar"],
                
        "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Jorethang", "Singtam", "Pakyong", "Ravangla", "Soreng", "Dentam", "Chungthang", "Yuksom", "Zuluk", "Lachung", "Lachen", "Rhenock"],
            
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur", "Dindigul", "Tiruppur", "Karur", "Nagapattinam", "Cuddalore", "Nagercoil", "Villupuram", "Kanchipuram", "Ariyalur", "Perambalur", "Namakkal", "Sivaganga", "Ramanathapuram", "Virudhunagar", "Tiruvannamalai", "Krishnagiri", "Dharmapuri", "Theni", "Nilgiris", "Pudukkottai"],
                        
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Siddipet", "Miryalaguda", "Jagtial", "Suryapet", "Mancherial", "Bhongir", "Medak", "Zaheerabad", "Vikarabad", "Kamareddy", "Bodhan"],
            
        "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Belonia", "Ambassa", "Khowai", "Sonamura", "Teliamura", "Bishalgarh", "Sabroom", "Jogendranagar"],
            
        "Uttar Pradesh": ["Agra","Aligarh","Allahabad","Ambedkar Nagar","Amethi","Amroha","Auraiya","Azamgarh","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bhadohi","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Faizabad","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kheri","Kushinagar","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Prayagraj","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Shahjahanpur","Shamli","Shravasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"],  
                    
        "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Roorkee", "Rishikesh", "Haldwani", "Kashipur", "Ramnagar", "Mussoorie", "Pithoragarh", "Bageshwar", "Almora", "Tehri", "Srinagar", "Chamoli", "Rudrapur", "Kotdwar", "Lansdowne"],
    
                
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling", "Bardhaman", "Malda", "Kharagpur", "Haldia", "Jalpaiguri", "Berhampore", "Cooch Behar", "Balurghat", "Krishnanagar", "Raiganj", "Serampore", "Bankura", "Purulia", "Santipur"],
                    
        // Union Territories
        
        "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Mayabunder", "Rangat", "Hut Bay", "Neil Island", "Havelock Island", "Car Nicobar", "Campbell Bay", "Great Nicobar", "Little Andaman"],
    
        "Chandigarh": ["Chandigarh", "Manimajra", "Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5","Sector 6", "Sector 7", "Sector 8", "Sector 9", "Sector 10", "Sector 11", "Sector 12","Sector 13", "Sector 14", "Sector 15", "Sector 16", "Sector 17", "Sector 18", "Sector 19","Sector 20", "Sector 21", "Sector 22", "Sector 23", "Sector 24", "Sector 25", "Sector 26","Sector 27", "Sector 28", "Sector 29", "Sector 30", "Sector 31", "Sector 32", "Sector 33","Sector 34", "Sector 35", "Sector 36", "Sector 37", "Sector 38", "Sector 39", "Sector 40","Sector 41", "Sector 42", "Sector 43", "Sector 44", "Sector 45", "Sector 46", "Sector 47","Sector 48", "Sector 49", "Sector 50", "Sector 51", "Sector 52", "Sector 53", "Sector 54","Daria", "Mauli Jagran", "Hallomajra", "Raipur Khurd", "Raipur Kalan", "Behlana", "Burail", "Kajheri", "Palsora", "Daddu Majra", "Dhanas", "Sarangpur", "Maloya", "Khuda Ali Sher", "Khuda Lahora", "Khuda Jassu", "Industrial Area Phase I", "Industrial Area Phase II", "IT Park", "PGIMER Area"],
        
        "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu", "Amli", "Samarvarni", "Marwad", "Naroli", "Kachigam", "Ghoghola", "Khilvani"],
    
        "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh", "Lajpat Nagar", "Chandni Chowk", "Connaught Place", "Vasant Kunj", "Mayur Vihar", "Janakpuri", "Pitampura", "Rajouri Garden", "Hauz Khas", "Okhla", "Kalkaji", "Preet Vihar", "Greater Kailash", "Narela", "Burari", "Shahdara"],
                        
        "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kupwara", "Pulwama", "Poonch", "Kathua", "Rajouri", "Bandipora", "Budgam", "Kulgam", "Shopian", "Ganderbal", "Reasi", "Doda", "Kishtwar", "Samba", "Ramban"],
                            
        "Ladakh": ["Leh", "Kargil", "Diskit", "Nubra", "Tangtse", "Nyoma", "Drass", "Padum", "Zanskar", "Skardu"],
                                
        "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Amini", "Kadmat", "Kalpeni", "Andrott", "Kiltan", "Chetlat", "Bitra"],
                                    
        "Puducherry": ["Puducherry","Oulgaret","Ariyankuppam","Manavely","Kurumbapet","Villianur","Bahour","Nettapakkam","Muthialpet","Solai Nagar","Vaithikuppam","V.O.C Nagar","Thiruvalluvar Nagar","Perumal Koil","Kurusukuppam","Raj Bhavan","Cathedral","Goubert Nagar","Elango Nagar","Pudupalayam","Pillaithottam","Sakthi Nagar","Anna Nagar","Nellithope"],
                                        
        "Karaikal": ["Karaikal", "Neravy", "Thirunallar", "Nedungadu", "Kottucherry", "Tirumalairayanpattinam"],
                                    
        "Mahe": ["Mahe", "Palloor", "Pandakkal", "Chalakkara"],
                                            
        "Yanam": ["Yanam", "Farampeta", "Kanakalapeta", "Mettacur", "Darialatippa","Agraharam"],
    
    };
    
    // ========== School House Data ==========
    
     const schoolHouseData = {
        "Archies Higher Secondary School": ["Himalaya", "Kanchujunga", "Shivalik", "Aravali"],
        "VSEC Shyam Nagar": ["Red", "Blue", "Green", "Yellow"],
        "Oxford Modal": ["Alpha", "Beta", "Gamma", "Delta"],
        "Sughar Singh Academy": ["North", "South", "East", "West"],
        "National Public School": ["Eagle", "Falcon", "Hawk", "Owl"],
        "GPS Mechanised": ["Ruby", "Sapphire", "Emerald", "Topaz"],
        "Kendra Vidyalaya": ["Lotus", "Rose", "Tulip", "Daisy"],
        "Army Public School": ["Courage", "Honor", "Valor", "Integrity"]
    };
    
    // ========== Other Data ==========
    // Bad words list

    const badWords = [
        "fuck", "shit", "bitch", "asshole", "bastard", "damn","madarchod", "bhenchod", "chutiya", "randi", "bsdk","bhosadike", "betichod", "chutiye","chuutiye", "maa ki chut","makichut", "nigger","pajeet","bhadwe","chinaal","chinaar","hijde","chakke","maadifuddi","maadifudi","fuddideya","fudideya","cunt","bitchassnigga","nigga","kuttiya","kutiya","randikebeej","chutmarike","randa","lund","lundkebaal","lodeke","lodeki","lawde","lode","chut","peniskehair","jhantu","jhaatkebaal","terimaadafudda","teribhendafudda","blyat","shithole","cykablyat","bhenkelund","behenkelaude","maakelaude","bhenkichut","behenkelaudi","maakelaudi","bhenkelund","behenkelawde","maakelawde","behenkelawdi","maakelawdi","dumbass","teri maa randi","teribhenchut","teribhenchod","teribhenchod","teribhenchode","teribhenchod","teribhenchode","teri bhen ka bhosda","teribhenkabhosda"
      ];


    // List of help messages, identity questions, order queries, casual greetings, joke queries, and greetings

    const helpMessages = ["help", "main menu", "menu", "help me", "help me out"];
   
    const identityQuestions = ["who are you", "who r u", "what is your name", "whats your name", "what's your name", "whatisyourname"];
   
    const orderQueries = ["order", "order status", "orderstatus", "order status?", "order status!", "orderenquiry", "orderdetails"];
   
    const casualGreetings = ["ayoo","yo", "yo bro", "yo bro!", "what's up cuh", "yo! what's up cuh", "yo! what's up cuh!", "yo! what's up cuh?", "what's up","yo whats up"];
   
    const jokeQueries = ["tell me a joke", "joke", "say joke", "joke batao", "dark joke","another one"];
   
    const greetings = {
      namaste: "नमस्ते मैं आपकी क्या मदद कर सकता हूँ",
      assalamualaikum: "वालेकुम अस्सलाम भाईजान मैं आपकी क्या मदद कर सकता हूँ?",
      satsriakal: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਵੀਰੇ, ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?हूँ",
      jaishreeram: "जयश्रीराम मैं आपकी क्या सहायता कर सकता हूँ",
      'jai shree ram': "जयश्रीराम मैं आपकी क्या सहायता कर सकता हूँ",
      ramram: "राम राम  मैं आपकी क्या सहायता कर सकता हूँ",
      'ram ram': "राम राम  मैं आपकी क्या सहायता कर सकता हूँ",
      radheyradhey: "राधे राधे भैय्या मैं आपकी क्या सहायता कर सकता हूँ",
      'radhey radhey': "राधे राधे भैय्या मैं आपकी क्या सहायता कर सकता हूँ",
      hello: "Hey bro what's up",
      hey: "Hey bro what's up"
    };
    
    export{ stateCityData, schoolHouseData, helpMessages, identityQuestions, orderQueries, casualGreetings, jokeQueries, greetings, badWords };
    
    