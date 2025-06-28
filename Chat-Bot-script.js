//==========Importing data sets==========

import { 
  badWords, 
  helpMessages, 
  identityQuestions, 
  orderQueries, 
  casualGreetings, 
  greetings, 
  jokeQueries, 
  bussinessQueries
  } from './data-sets.js';
 
  //========= DOMContentLoaded ==========
 
  document.addEventListener("DOMContentLoaded", function () {
    
    console.log("Script loaded and DOM fully parsed.");
  
    const sendBtn = document.getElementById("send-btn");
    const chatBox = document.querySelector(".chatbox");
    const textarea = document.querySelector(".chat-input textarea");
    
    const clean = str => str.replace(/[^a-z]/gi, '').toLowerCase(); //regulare expression
    
    // Function to fetch a joke from the API
    
    async function fetchJoke(isDark = false) {
      try {
        // Use the Dark joke API if `isDark` is true, otherwise fetch general jokes
        const apiUrl = isDark
        ? "https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
        : "https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.joke) {
          return data.joke; // Return the joke if available
        } else {
          return "Sorry, I couldn't fetch a joke at the moment. Please try again later.";
        }
      } catch (error) {
        console.error("Error fetching joke:", error);
        return "Oops! Something went wrong while fetching the joke.";
      }
    }
    
    // Function to check if the message contains bad words

    function containsBadWords(text) {
      return badWords.some(word => text.toLowerCase().includes(word));
    }
    
    // Function to append outgoing message to chatbox
  
    function appendOutgoingMessage(message) {
      const li = document.createElement("li");
      li.classList.add("chat-outgoing");
      
      const p = document.createElement("p");
      p.textContent = message;
      
      li.appendChild(p);
      chatBox.appendChild(li);
      scrollToBottom();
    }
    
    // Function to append incoming message to chatbox

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
    
    // Function to scroll to the bottom of the chatbox
    
    function scrollToBottom() {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    // Function to handle sending messages
    
    async function sendMessage() {
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
        
        // Joke queries
      } else if (jokeQueries.some(q => clean(q) === clean(lowerMessage))) {
        const isDark = lowerMessage.includes("dark joke");
        const joke = await fetchJoke(isDark);
        appendIncomingMessage(`😂 Here's a joke for you: ${joke}`);
        
        // Error or issue reports
      } else if (lowerMessage.includes("not working") || lowerMessage.includes("error")) {
        appendIncomingMessage("⚠️ If something is wrong, please fill out the feedback form. Our backend team will contact you soon.");
        ShowFeedbackOption();
      } else if(bussinessQueries.some(q => clean(q) === clean(lowerMessage))) {
        appendIncomingMessage("🔄 Click on the below button to proceed to the Bussiness page...");
        showBussinessEnquiryOptions();
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

    function showBussinessEnquiryOptions() {
      const bussinessQueriesHTML = `<div style="display: flex; flex-direction: column; gap: 8px;"><button onclick="handleBussiness()" style="padding: 8px 12px; border: none; background-color: #2730e3; color: #fff; border-radius: 5px;">Bussiness</button>
      </div>`;

      appendIncomingMessage(bussinessQueriesHTML);
    }
    
    window.handleCallStore = function () {
      appendIncomingMessage("📞 You can call the store at: <strong>+91-790500198</strong>");
    };
    
    window.handleNeedAgent = function () {
      appendIncomingMessage("🔄 Connecting you to an agent...");
    };
    
    window.handleFeedback = function () {
      appendIncomingMessage("🔄 Click on the below button to proceed to the Feedback page...");
      window.location.href = "Feedback.html";
    };
    
    window.handleOrderStatus = function () {
      appendIncomingMessage("🔄 Click on the below button to proceed to the Order Status page...");
      window.location.href = "order.html";
    };

    window.handleBussiness = function () {
      window.location.href = "Bussiness.html";
    }
    
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