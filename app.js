const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")

const playButton = document.getElementById("playButton")

const minValue = 0;
const maxValue = 59;

const timer = () => {
    setInterval(() => {
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
                    secondsValue = minValue;
                }
            }
        }
        seconds.value = secondsValue;
        minutes.value = minutesValue
        hours.value = hoursValue
        console.log(value);
    }, 1000)
}

playButton.addEventListener('click', timer)
