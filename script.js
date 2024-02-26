const chatInput=document.getElementById('chat-input')
const sendBtn=document.getElementById('send-btn')
const chatContainer=document.querySelector('.chat-container')


let userText=null;
const API_KEY=""

const createElement=(html, className)=>{
    const chatDiv=document.createElement('div')
    chatDiv.classList.add('chat', className)
    chatDiv.innerHTML=html
    return chatDiv
}

const getChatResponse=()=>{
    const API_URL="https://api.openai.com/v1/completions";

    const requestOptions={
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null
        })
    }
}

const showTypingAnimation=()=>{
    const html=`<div class="chat-content">
                    <div class="chat-details">
                        <img src="goat.png" alt="user-icon">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                <span class="material-symbols-rounded"><i class="fa-regular fa-copy"></i></span>
                </div>`
    const outgoingChatDiv=createElement(html, 'incoming')
    chatContainer.appendChild(outgoingChatDiv)
    getChatResponse()
}

const handleOutgoingChat=()=>{
    userText=chatInput.value.trim()
    //console.log(userText);
    const html=`<div class="chat-content">
                    <div class="chat-details">
                        <img src="user_icon_149329.png" alt="user-icon">
                        <p>${userText}</p>
                    </div>
                </div>`
    const outgoingChatDiv=createElement(html, 'outgoing')
    chatContainer.appendChild(outgoingChatDiv)
    setTimeout(showTypingAnimation, 500)
}
sendBtn.addEventListener('click', handleOutgoingChat)