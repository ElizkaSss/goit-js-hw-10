import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", event => {
    event.preventDefault();

    const delay = Number(form.elements.delay.value); 
    const state = form.elements.state.value; 

    console.log(`Створюємо проміс на ${delay}мс зі статусом: ${state}`);

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
        .then(delay => {

            iziToast.success({
                message: `✅ Fulfilled promise in ${ delay }ms`,
                position: "topRight",
      });
    console.log(`✅ Fulfilled promise in ${delay}ms`);
})
    .catch(delay => {
        
        iziToast.error({
            message: `❌ Rejected promise in ${ delay }ms`,
            position: "topRight",
      });
console.log(`❌ Rejected promise in ${delay}ms`);
    });
});