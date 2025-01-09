import iziToast from "izitoast";

const form = document.querySelector(".form");

const msgError = msg => {
  iziToast.error(
    {
      message: msg,
      position: "topRight"
    }
  );
};

const msgSuccess = msg => {
  iziToast.success(
    {
      message: msg,
      position: "topRight"
    }
  );
};

const generatePromise = (state, timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state == "fulfilled") {
                resolve(timeout);
            }
            else {
                reject(timeout);
            }
        }, timeout);
    });
};

const handleFormSubmit = event => {
    event.preventDefault();
    if (form.delay.value > 0) {
        const generatedPromise = generatePromise(form.state.value, form.delay.value);
        generatedPromise
            .then(timeout => {
                msgSuccess(`Fulfilled promise in ${timeout}ms`);
            })
            .catch(timeout => {
                msgError(`Rejected promise in ${timeout}ms`);
            });
    }
    else {
        msgError("Delay value must be greater than zero!");
    }
};

form.addEventListener("submit", handleFormSubmit);