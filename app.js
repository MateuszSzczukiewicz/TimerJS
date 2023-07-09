class Timer {
    constructor(hours, minutes, seconds, editButton, playButton, reloadButton, clockButton, alarmSound, playIcon, editIcon, reloadIcon, clockIcon) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.editButton = editButton;
        this.playButton = playButton;
        this.reloadButton = reloadButton;
        this.clockButton = clockButton;
        this.alarmSound = alarmSound;
        this.playIcon = playIcon;
        this.editIcon = editIcon;
        this.reloadIcon = reloadIcon;
        this.clockIcon = clockIcon;

        this.minValue = 0;
        this.maxValue = 59;
        this.maxHoursValue = 99;

        this.savedHours = this.minValue;
        this.savedMinutes = this.minValue;
        this.savedSeconds = this.minValue;

        this.intervalId = null;
        this.isWorking = false;
        this.isEditMode = true;

        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.addZero = this.addZero.bind(this);
        this.formatNumber = this.formatNumber.bind(this);
        this.saveTime = this.saveTime.bind(this);
        this.reloadTimer = this.reloadTimer.bind(this);
        this.alarmOn = this.alarmOn.bind(this);
        this.alarmOff = this.alarmOff.bind(this);

        this.editButton.addEventListener("click", this.toggleEditMode);
        this.playButton.addEventListener("click", this.toggleTimer);
        this.reloadButton.addEventListener("click", this.reloadTimer);
        this.clockButton.addEventListener("click", this.alarmOff);
    }

    startTimer() {
        this.intervalId = setInterval(() => {
            let secondsValue = Number(this.seconds.value);
            let minutesValue = Number(this.minutes.value);
            let hoursValue = Number(this.hours.value);

            if (secondsValue > this.minValue) {
                secondsValue--;
            } else {
                secondsValue = this.maxValue;
                if (minutesValue > this.minValue) {
                    minutesValue--;
                } else {
                    if (hoursValue > this.minValue) {
                        hoursValue--;
                        minutesValue = this.maxValue;
                    } else {
                        hoursValue = this.minValue;
                        minutesValue = this.minValue;
                        secondsValue = this.minValue;
                    }
                }
            }
            this.seconds.value = this.formatNumber(secondsValue);
            this.minutes.value = this.formatNumber(minutesValue);
            this.hours.value = this.formatNumber(hoursValue);

            this.alarmOn();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.intervalId);
    }

    toggleTimer() {
        if (!this.isWorking) {
            this.startTimer();
            this.isWorking = true;
            this.playIcon.src = "assets/icons/pauseIcon.svg";
        } else {
            this.stopTimer();
            this.isWorking = false;
            this.playIcon.src = "assets/icons/playIcon.svg";
        }
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;

        if (this.isEditMode) {
            this.isWorking = false;
            this.stopTimer();
            this.hours.disabled = false;
            this.minutes.disabled = false;
            this.seconds.disabled = false;
            this.hours.style.border = "1px solid white";
            this.minutes.style.border = "1px solid white";
            this.seconds.style.border = "1px solid white";
            this.playIcon.src = "assets/icons/playIcon.svg";
            this.editIcon.src = "assets/icons/checkIcon.svg";
            this.playIcon.style.filter = "brightness(1) invert(0.5)";
            this.playButton.disabled = true;
            this.playButton.style.cursor = "context-menu";
        } else {
            this.changeValue();
            this.hours.disabled = true;
            this.minutes.disabled = true;
            this.seconds.disabled = true;
            this.hours.style.border = "none";
            this.minutes.style.border = "none";
            this.seconds.style.border = "none";
            this.editIcon.src = "assets/icons/editIcon.svg";
            this.playIcon.style.filter = "brightness(0) invert(1)";
            this.playButton.disabled = false;
            this.playButton.style.cursor = "pointer";
            this.playButton.style.pointerEvents = "document";

            this.saveTime();
        }
    }

    changeValue() {
        let secondsValue = Number(this.seconds.value);
        let minutesValue = Number(this.minutes.value);
        let hoursValue = Number(this.hours.value);

        if (secondsValue > this.maxValue) {
            const overflowSeconds = Math.floor(secondsValue / (this.maxValue + 1));
            secondsValue %= this.maxValue + 1;
            minutesValue += overflowSeconds;

            if (secondsValue > this.maxValue) {
                secondsValue = this.maxValue;
            }
        }

        if (minutesValue > this.maxValue) {
            const overflowMinutes = Math.floor(minutesValue / (this.maxValue + 1));
            minutesValue %= this.maxValue + 1;
            hoursValue += overflowMinutes;

            if (minutesValue > this.maxValue) {
                minutesValue = this.maxValue;
                secondsValue = this.maxValue;
            }
        }

        if (hoursValue > this.maxHoursValue) {
            hoursValue = this.maxHoursValue;
            minutesValue = this.maxValue;
            secondsValue = this.maxValue;
        }

        this.seconds.value = this.formatNumber(secondsValue);
        this.minutes.value = this.formatNumber(minutesValue);
        this.hours.value = this.formatNumber(hoursValue);
    }

    addZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    formatNumber(value) {
        return this.addZero(value);
    }

    saveTime() {
        this.savedHours = Number(this.hours.value);
        this.savedMinutes = Number(this.minutes.value);
        this.savedSeconds = Number(this.seconds.value);
    }

    reloadTimer() {
        this.seconds.value = this.formatNumber(this.savedSeconds);
        this.minutes.value = this.formatNumber(this.savedMinutes);
        this.hours.value = this.formatNumber(this.savedHours);
    }

    alarmOn() {
        const value =
            Number(this.hours.value) + Number(this.minutes.value) + Number(this.seconds.value);

        if (value === 0) {
            this.clockIcon.style.display = "block";
            this.alarmSound.play();
            this.playIcon.style.filter = "brightness(1) invert(0.5)";
            this.playButton.disabled = true;
            this.editIcon.style.filter = "brightness(1) invert(0.5)";
            this.editButton.disabled = true;
            this.reloadIcon.style.filter = "brightness(1) invert(0.5)";
            this.reloadButton.disabled = true;
        }
    }

    alarmOff() {
        this.stopTimer();
        this.clockIcon.style.display = "none";
        this.alarmSound.pause();
        this.alarmSound.currentTime = 0;

        this.isWorking = false;
        this.isEditMode = true;

        this.hours.disabled = false;
        this.minutes.disabled = false;
        this.seconds.disabled = false;
        this.hours.style.border = "1px solid white";
        this.minutes.style.border = "1px solid white";
        this.seconds.style.border = "1px solid white";
        this.playIcon.src = "assets/icons/playIcon.svg";
        this.editIcon.src = "assets/icons/checkIcon.svg";
        this.playIcon.style.filter = "brightness(1) invert(0.5)";
        this.editIcon.style.filter = "brightness(0) invert(1)";
        this.reloadIcon.style.filter = "brightness(0) invert(1)";
        this.playButton.disabled = false;
        this.playButton.style.cursor = "pointer";
        this.editButton.disabled = false;
        this.editButton.style.cursor = "pointer";
        this.reloadButton.disabled = false;
        this.reloadButton.style.cursor = "pointer";
      }
    }

    const timer = new Timer(
      hours,
      minutes,
      seconds,
      editButton,
      playButton,
      reloadButton,
      clockButton,
      alarmSound,
      playIcon,
      editIcon,
      reloadIcon,
      clockIcon
    );
