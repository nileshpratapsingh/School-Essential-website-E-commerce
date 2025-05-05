document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded and DOM fully parsed.");
    const sendBtn = document.getElementById("send-btn");
    const chatBox = document.querySelector(".chatbox");
    const textarea = document.querySelector(".chat-input textarea");

    const badWords = [
      "fuck", "shit", "bitch", "asshole", "bastard", "damn",
      "madarchod", "bhenchod", "chutiya", "randi", "bsdk",
      "bhosadike", "betichod", "chutiye", "maa ki chut", 
      "makichut", "nigger","pajeet","bhadwe","chinaal","chinaar","hijde","chakke","maadifuddi","maadifudi","fuddideya","fudideya","cunt","bitchassnigga","nigga","kuttiya","kutiya","randikebeej","chutmarike","randa","lund","lundkebaal","lodeke","lodeki","lawde","lode","chut","peniskehair","jhantu","jhaatkebaal","terimaadafudda","teribhendafudda","blyat","shithole","cykablyat","bhenkelund","behenkelaude","maakelaude","bhenkichut","behenkelaudi","maakelaudi","bhenkelund","behenkelawde","maakelawde","behenkelawdi","maakelawdi","dumbass"
    ];
    
    const clean = str => str.replace(/[^a-z]/gi, '').toLowerCase();

    const helpMessages = ["help", "main menu", "menu", "help me", "help me out"];
    const identityQuestions = ["who are you", "who r u", "what is your name", "whats your name", "what's your name", "whatisyourname"];
    const orderQueries = ["order", "order status", "orderstatus", "order status?", "order status!", "orderenquiry", "orderdetails"];
    const casualGreetings = ["ayoo","yo", "yo bro", "yo bro!", "what's up cuh", "yo! what's up cuh", "yo! what's up cuh!", "yo! what's up cuh?", "what's up","yo whats up"];
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

    function containsBadWords(text) {
      return badWords.some(word => text.toLowerCase().includes(word));
    }
  
    function appendOutgoingMessage(message) {
      const li = document.createElement("li");
      li.classList.add("chat-outgoing");
  
      const p = document.createElement("p");
      p.textContent = message;
  
      li.appendChild(p);
      chatBox.appendChild(li);
      scrollToBottom();
    }
  
    function appendIncomingMessage(message) {
      const li = document.createElement("li");
      li.classList.add("chat-incoming");
  
      const span = document.createElement("span");
      span.className = "material-symbols-outlined";
      span.textContent = "smart_toy";
  
      const p = document.createElement("p");
      p.innerHTML = message;
  
      li.appendChild(span);
      li.appendChild(p);
      chatBox.appendChild(li);
      scrollToBottom();
    }
  
    function scrollToBottom() {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    function sendMessage() {
      const message = textarea.value.trim();
      if (message === "") return;
  
      appendOutgoingMessage(message);
      textarea.value = "";
  
      const lowerMessage = message.toLowerCase();
  
      if (containsBadWords(lowerMessage)) {
        appendIncomingMessage("⚠️ Teri Maa Chod dalunga Betichod\nTameez me bol kar\nRandi ke");
        return;
      }
  
      if (helpMessages.includes(lowerMessage)) {
        showHelpOptions();
      
      // Identity queries
      } else if (identityQuestions.some(q => clean(q) === clean(lowerMessage))) {
        appendIncomingMessage("🤖 I am Namrata virtual assistant. How may I help you today?");
      
      // Order status
      } else if (orderQueries.some(q => clean(q) === clean(lowerMessage))) {
        appendIncomingMessage("📦 Your order is on the way! You can track it <a href='order.html'>here</a>.");
        ShowOrderOption();
      
      // Casual greetings
      } else if (casualGreetings.some(q => clean(q) === clean(lowerMessage))) {
        appendIncomingMessage("😎 Yo! What's up cuh, You Good ?");
      
      // Regional greetings
      } else if (greetings[lowerMessage]) {
        appendIncomingMessage(greetings[lowerMessage]);
      
      // Error or issue reports
      } else if (lowerMessage.includes("not working") || lowerMessage.includes("error")) {
        appendIncomingMessage("⚠️ If something is wrong, please fill out the feedback form. Our backend team will contact you soon.");
        ShowFeedbackOption();
      } else {
        setTimeout(() => {
          appendIncomingMessage("🤖 Pardon.");
        }, 1000);
      }
    }
  
    function showHelpOptions() {
      const optionsHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button onclick="handleCallStore()" style="padding: 8px 12px; border: none; background-color: #2730e3; color: #fff; border-radius: 5px;">Call Store</button>
          <button onclick="handleNeedAgent()" style="padding: 8px 12px; border: none; background-color: #2730e3; color: #fff; border-radius: 5px;">Need Agent</button>
          <button onclick="handleFeedback()" style="padding: 8px 12px; border: none; background-color: #2730e3; color: #fff; border-radius: 5px;">Feedback</button>
          <button onclick="handleOrderStatus()" style="padding: 8px 12px; border: none; background-color: #2730e3; color: #fff; border-radius: 5px;">Order Status</button>
        </div>
      `;
      appendIncomingMessage("🤖 Here are some options for you:");
      appendIncomingMessage(optionsHTML);
    }

    function ShowOrderOption() {
        const orderOptionHTML =`<div style="display: flex; flex-direction: column; gap: 8px;"><button onclick="handleOrderStatus()" style="padding: 8px 12px; border: none; background-color: #2730e3; color: #fff; border-radius: 5px;">Order Status</button>
        </div>`;

        appendIncomingMessage(orderOptionHTML);
    }

    function ShowFeedbackOption() {
        const feedbackOptionHTML =`<div style="display: flex; flex-direction: column; gap: 8px;"><button onclick="handleFeedback()" style="padding: 8px 12px; border: none; background-color: #2730e3; color: #fff; border-radius: 5px;">Feedback</button>
        </div>`;

        appendIncomingMessage(feedbackOptionHTML);
    }
  
    window.handleCallStore = function () {
      appendIncomingMessage("📞 You can call the store at: <strong>+91-790500198</strong>");
    };
  
    window.handleNeedAgent = function () {
      appendIncomingMessage("🔄 Connecting you to an agent...");
    };
  
    window.handleFeedback = function () {
      window.location.href = "Feedback.html";
    };

    window.handleOrderStatus = function () {
        window.location.href = "order.html";
    };
  
    if (sendBtn && chatBox && textarea) {
        sendBtn.addEventListener("click", sendMessage);
  
        textarea.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});