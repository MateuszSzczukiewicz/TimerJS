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

let savedHours = minValue;
let savedMinutes = minValue;
let savedSeconds = minValue;

let intervalId;

let isWorking = false;
let isEditMode = true;

const startTimer = () => {
   intervalId = setInterval(() => {
        let secondsValue = Number(seconds.value);
        let minutesValue = Number(minutes.value);
        let hoursValue = Number(hours.value);

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
        seconds.value = formatNumber(secondsValue);
        minutes.value = formatNumber(minutesValue);
        hours.value = formatNumber(hoursValue);

        const value = hours.value + minutes.value + seconds.value

        if (value === 0) {
            stopTimer();
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

        saveTime()
    }
};

const changeValue = () => {
    let secondsValue = Number(seconds.value);
    let minutesValue = Number(minutes.value);
    let hoursValue = Number(hours.value);

    if (secondsValue > maxValue) {
        const overflowSeconds = Math.floor(secondsValue / (maxValue + 1));
        secondsValue %= (maxValue + 1);
        minutesValue += overflowSeconds;

        if (secondsValue > maxValue) {
            secondsValue = maxValue;
        }
    }

    if (minutesValue > maxValue) {
        const overflowMinutes = Math.floor(minutesValue / (maxValue + 1));
        secondsValue %= (maxValue + 1);
        hoursValue += overflowMinutes;

        if (minutesValue > maxValue) {
            minutesValue = maxValue;
            secondsValue = maxValue;
        }
    }

    if (hoursValue > maxHoursValue) {
        hoursValue = maxHoursValue;
        minutesValue = maxValue;
        secondsValue = maxValue;
    }

    seconds.value = formatNumber(secondsValue);
    minutes.value = formatNumber(minutesValue);
    hours.value = formatNumber(hoursValue);
};

const addZero = (value) => {
    return value < 10 ? `0${value}` : value;
}

const formatNumber = (value) => {
    return addZero(value)
}

const saveTime = () => {
    savedHours = Number(hours.value);
    savedMinutes = Number(minutes.value);
    savedSeconds = Number(seconds.value);
}

const reloadTimer = () => {
    seconds.value = formatNumber(savedSeconds)
    minutes.value = formatNumber(savedMinutes)
    hours.value = formatNumber(savedHours)
}

editButton.addEventListener("click", toggleEditMode)
playButton.addEventListener("click", toggleTimer)
reloadButton.addEventListener("click", reloadTimer)
