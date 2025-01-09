import flatpickr from "flatpickr";
import iziToast from "izitoast";

const picker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const timerDays = document.querySelector("[data-days]");
const timerHours = document.querySelector("[data-hours]");
const timerMinutes = document.querySelector("[data-minutes]");
const timerSeconds = document.querySelector("[data-seconds]");

let selectedDate;

const msgError = msg => {
  iziToast.error(
    {
      title: "Error",
      message: msg,
      position: "topRight"
    }
  );
};

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now())
    {
      selectedDate = selectedDates[0];
      startButton.removeAttribute("disabled");
    }
    else
    {
      msgError("Please choose a date in the future");
      startButton.setAttribute("disabled", "");
    }
  }
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
}

const handleStartButtonClick = event => {
  if (selectedDate !== undefined && selectedDate > Date.now()) {
    startButton.setAttribute("disabled", "");
    picker.setAttribute("disabled", "");
    const currentInterval = setInterval(() => {
      const diff = selectedDate - Date.now();
      if (diff >= 0) {
        const { days, hours, minutes, seconds } = convertMs(diff);
        timerDays.textContent = addLeadingZero(days);
        timerHours.textContent = addLeadingZero(hours);
        timerMinutes.textContent = addLeadingZero(minutes);
        timerSeconds.textContent = addLeadingZero(seconds);
      }
      else {
        picker.removeAttribute("disabled");
        clearInterval(currentInterval);
      }
    });
  }
};

startButton.addEventListener("click", handleStartButtonClick);

flatpickr(picker, options);