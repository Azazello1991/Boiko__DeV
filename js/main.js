const iconBoxes = document.querySelectorAll(".icon-box");
const iconBoxContainers = document.querySelectorAll(".icon-container");
const closeBtns = document.querySelectorAll(".close-btn");
const maximizeBtns = document.querySelectorAll(".maximize-btn");
const body = document.querySelector("body");

iconBoxes.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
    body.classList.add("prevent-background-scroll");
  });
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.closest(".popup");
    modal.style.display = "none";
    body.classList.remove("prevent-background-scroll");
    iconBoxContainers.forEach((container) => {
      container.style.display = "flex";
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup")) {
    e.target.style.display = "none";
    body.classList.remove("prevent-background-scroll");
  }
});

maximizeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let modal = btn.closest(".popup");
    let container = modal.querySelector(".popup-container");
    let body = modal.querySelector(".popup-body");

    if (modal.classList.contains("maximized")) {
      container.style.width = "min(900px, 90%)";
      container.style.top = "45%";
      body.style.height = "80vh";
    } else {
      container.style.width = "100%";
      container.style.top = "50%";
      body.style.height = "90vh";
    }

    modal.classList.toggle("maximized");
    body.classList.toggle("prevent-scroll");
  });
});

var swiper = new Swiper(".swiper", {
  preventClicks: true,
  noSwiping: true,
  freeMode: false,
  spaceBetween: 10,
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  mousewheel: {
    invert: false,
    thresholdDelta: 50,
    sensitivity: 1,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    680: {
      slidesPerView: 2,
    },
    1100: {
      slidesPerView: 3,
    },
    1600: {
      slidesPerView: 4,
    },
  },
});

/*================ fetch chat_bot  ==============*/
// Патерни для фільтрації
const patterns = {
  mailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  phonePattern: /^0\d{9}$/,
};

const token = "7586806904:AAFyMGyaaHPq7y5EnzwUWw4izl2c7fpq4sg";
const chatId = "5123298318";
const submitBtn = document.querySelector(".submit-btn");
const message = document.getElementById("subject");
const mail = document.getElementById("mail");
const phone = document.getElementById("phone");
const name = document.getElementById("name");
const accentColor = "#ff6838";
let phoneDone = false;
let mailDone = false;
let nameDone = false;

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("submit-btn")) {
    chackForm();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;

  if (target.classList.contains("fild-phone")) {
    phoneDone = patterns.phonePattern.test(target.value.trim());

    if (!phoneDone) {
      target.style.border = "1px solid red";
      target.nextElementSibling.textContent = "Не вірно вказаний номер";
    } else {
      target.style.border = `1px solid ${accentColor}`;
      target.nextElementSibling.textContent = "";
    }
  } else if (target.classList.contains("fild-mail")) {
    mailDone = patterns.mailPattern.test(target.value.trim());

    if (!mailDone) {
      target.style.border = "1px solid red";
      target.nextElementSibling.textContent = "Емейл має мати *@mail.**";
    } else {
      target.style.border = `1px solid ${accentColor}`;
      target.nextElementSibling.textContent = "";
    }
  } else if (target.classList.contains("fild-name")) {
    nameDone = target.value.length > 1;

    if (!nameDone) {
      target.style.border = "1px solid red";
      target.nextElementSibling.textContent =
        "Ім'я має бути довшим ніж 1 символ";
    } else {
      target.style.border = `1px solid ${accentColor}`;
      target.nextElementSibling.textContent = "";
    }
  } else if (target.classList.contains("subject")) {
    if (target.value && target.value.length >= 1) {
      target.style.border = `1px solid ${accentColor}`;
    } else {
      target.style.border = "1px solid #cccccc";
    }
  }

  console.log(phoneDone, mailDone, nameDone)

  if (phoneDone && mailDone && nameDone) {
    submitBtn.style.borderColor = accentColor;
  }
});

function chackForm() {
  const phoneDone = patterns.phonePattern.test(phone.value.trim());
  const mailDone = patterns.mailPattern.test(mail.value.trim());
  const nameDone = name.value.length > 1;

  if (phoneDone && mailDone && nameDone) {
    sendMessage(phone, mail, name);
    showMessage();
    document.querySelector(".form").reset();
  }
}

function sendMessage(phone, mail, name) {
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `Message: ${message ? message.value : ""}\nEmail: ${
        mail.value
      }\nPhone: ${phone.value}\nName: ${name.value}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Сообщение отправлено:", data);
    })
    .catch((error) => {
      console.error("Ошибка отправки:", error);
    });
}

function showMessage() {
  const messageBlock = document.querySelector(".messag-banner");

  messageBlock.classList.remove("hidden");
  setTimeout(() => {
    messageBlock.classList.add("hidden");
    location.reload()
  }, 4000);
}
