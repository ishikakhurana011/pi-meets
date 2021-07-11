var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

function record() {
    var recognition = new SpeechRecognition();
    recognition.lang = "en-GB";

    recognition.onresult = function(event) {
        document.getElementById('take-input').value = event.results[0][0].transcript;
    }
    recognition.start();

}