const feedbackForm = document.querySelector(".feedback-form");
let formData = {
    email: "",
    message: ""
};



const formDataKey = "feedback-form-state";
const load = (key) => {
    try {
        const localFormData = localStorage.getItem(key);
        if (localFormData !== null)
        {
            formData = JSON.parse(localFormData);
            Object.keys(formData).forEach(k => {
                feedbackForm.elements[k].value = formData[k];
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};

load(formDataKey);

const save = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (err) {
        console.log(err);
    }
};

const formInputHandler = (event) => {
    Object.keys(formData).forEach(k => {
        formData[k] = event.currentTarget.elements[k].value.trim();
    });
    save(formDataKey, formData);
};

const formSubmitHandler = (event) => {
    event.preventDefault();
    const { email, message } = formData;
    if (email == "" || message == "")
    {
        alert("Fill please all fields");
        return;
    }
    console.log(formData);
    localStorage.removeItem(formDataKey);
    formData = {
        email: "",
        message: ""
    };
    feedbackForm.reset();
};

feedbackForm.addEventListener("input", formInputHandler);
feedbackForm.addEventListener("submit", formSubmitHandler);