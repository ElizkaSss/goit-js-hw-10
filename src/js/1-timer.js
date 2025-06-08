import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,        
    time_24hr: true,         
    defaultDate: new Date(),  
    minuteIncrement: 1,       
    onClose(selectedDates) {
        const selected = selectedDates[0];
        console.log("Вибрана дата:", selected);

        if (selected <= new Date()) {
            startBtn.disabled = true;
            iziToast.error({
                message: "Please choose a date in the future",
                position: "topRight",
            });
            console.log("Помилка: вибрана попередня дата");
        } else {
            userSelectedDate = selected;
            startBtn.disabled = false;
            console.log("Кнопка активна");
        }
    },
};

flatpickr(input, options);

startBtn.addEventListener("click", () => {
    console.log("Таймер запущено");

    startBtn.disabled = true;
    input.disabled = true;

    timerId = setInterval(() => {
        const now = new Date();
        const ms = userSelectedDate - now;

        if (ms <= 0) {
            clearInterval(timerId);
            console.log("Таймер припинено");
            input.disabled = false;
            updateTimerDisplay(convertMs(0));
            return;
        }

        const time = convertMs(ms);
        console.log("Залишковий час:", time);

        updateTimerDisplay(time);
    }, 1000);
});

function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
    console.log(
       `Відображение: ${ days }д ${ hours }ч ${ minutes }м ${ seconds }`
    );
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}