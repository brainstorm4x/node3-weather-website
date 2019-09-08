console.log("Client side JavaScript file is loaded!")



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'
// messageTwo.textContent = "From JavaScript 2"



weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const location = search.value
        messageOne.textContent = ''
        messageTwo.textContent = '';    
        messageOne.textContent = 'Loading...'
        fetch('http://localhost:3001/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Forecast: ' + data.forecast;
            }
        })
    })
})