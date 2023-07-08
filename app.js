const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")

const editButton = document.getElementById("editButton")
const playButton = document.getElementById("playButton")
const reloadButton = document.getElementById("reloadButton")

const playIcon = document.getElementById("playIcon")

const minValue = 0;
const maxValue = 59;
const maxHoursValue = 99;

let intervalId;

let isWorking = false;

const startTimer = () => {
   intervalId = setInterval(() => {
        let secondsValue = seconds.value;
        let minutesValue = minutes.value;
        let hoursValue = hours.value;
        let value = Number(hours.value) + Number(minutes.value) + Number(seconds.value)
        console.log(value);

        if (secondsValue > minValue) {
            secondsValue--;
        } else {
            secondsValue = maxValue;
            if (minutesValue > minValue) {
                minutesValue = minutes.value - 1;
            } else {
                if (hoursValue > minValue) {
                    hoursValue = hours.value - 1;
                    minutesValue = maxValue;
                } else {
                    hoursValue = minValue;
                    minutesValue = minValue;
                    secondsValue = minValue;
                }
            }
        }
        seconds.value = secondsValue;
        minutes.value = minutesValue
        hours.value = hoursValue
        if (value === 0) {
            console.log("Bzzzz!!!!!!!!")
        }
    }, 1000)
}

const stopTimer = () => {
    clearInterval(intervalId)
}

const toggleTimer = () => {
    if (!isWorking) {
        startTimer()
        isWorking = true;
        playIcon.src = 'assets/icons/pauseIcon.svg';
    } else {
        clearInterval(intervalId);
        isWorking = false;
        playIcon.src = 'assets/icons/playIcon.svg';
    }
}

playButton.addEventListener("click", toggleTimer)