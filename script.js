const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '6adfe9f28ca140e9af68d3bf8b88d594',
        src: joke,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text to speech
        tellMe(joke);
        // disable button
        toggleButton();
    } catch (error) {
        // catch errors
        console.log('whoops', error)
    }
}

// event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)