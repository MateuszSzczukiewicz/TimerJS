const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")

const editButton = document.getElementById("editButton")
const playButton = document.getElementById("playButton")
const reloadButton = document.getElementById("reloadButton")

const playIcon = document.getElementById("playIcon")
const editIcon = document.getElementById("editIcon")

const minValue = 0;
const maxValue = 59;
const maxHoursValue = 99;

let intervalId;

let isWorking = false;
let isEditMode = true;

const startTimer = () => {
   intervalId = setInterval(() => {
        let secondsValue = seconds.value;
        let minutesValue = minutes.value;
        let hoursValue = hours.value;
        let value = Number(hours.value) + Number(minutes.value) + Number(seconds.value)

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
            clearInterval(intervalId)
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

const toggleEditMode = () => {
    isEditMode = !isEditMode;

    if (isEditMode) {
        isWorking = false;
        clearInterval(intervalId);
        hours.disabled = false;
        minutes.disabled = false;
        seconds.disabled = false;
        hours.style.border = '1px solid white'
        minutes.style.border = '1px solid white'
        seconds.style.border = '1px solid white'
        playIcon.src = 'assets/icons/playIcon.svg';
        editIcon.src = 'assets/icons/checkIcon.svg';
        playIcon.style.filter = 'brightness(1) invert(0.5)'
        playButton.disabled = true;
        playButton.style.cursor = 'context-menu';
    } else {
        changeValue()
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;
        hours.style.border = 'none'
        minutes.style.border = 'none'
        seconds.style.border = 'none'
        editIcon.src = 'assets/icons/editIcon.svg';
        playIcon.style.filter = 'brightness(0) invert(1)'
        playButton.disabled = false;
        playButton.style.cursor = 'pointer';
    }
};

const changeValue = () => {
    if (seconds.value > maxValue) {
        const restOfSecondsValue = seconds.value - (maxValue + 1);
        seconds.value = restOfSecondsValue;
        minutes.value = Number(minutes.value) + 1;

    }
    if (minutes.value > maxValue) {
        const restOfMinutesValue = minutes.value - (maxValue + 1);
        minutes.value = restOfMinutesValue;
        hours.value = Number(hours.value) + 1;
    }
    if (hours.value > maxValue) {
        hours.value = maxHoursValue;
        seconds.value = maxValue;
        minutes.value = maxValue;
    }
};

playButton.addEventListener("click", toggleTimer)
editButton.addEventListener("click", toggleEditMode)