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

var swiper = new Swiper(".testimonial-swiper", {
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
      slidesPerView: 2,
    },
    1600: {
      slidesPerView: 2,
    },
  },
});

new Swiper(".swiper-avatar", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
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

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains("submit-btn")) {
    chackForm();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;

  if (target.classList.contains("fild-phone")) {
    const phoneDone = patterns.phonePattern.test(target.value.trim());

    if (!phoneDone) {
      target.style.border = "1px solid red";
      target.nextElementSibling.textContent = "Не вірно вказаний номер";
    } else {
      target.style.border = "1px solid #ccc";
      target.nextElementSibling.textContent = "";
    }
  } else if (target.classList.contains("fild-mail")) {
    const mailDone = patterns.mailPattern.test(target.value.trim());

    if (!mailDone) {
      target.style.border = "1px solid red";
      target.nextElementSibling.textContent = "Емейл має мати *@mail.**";
    } else {
      target.style.border = "1px solid #ccc";
      target.nextElementSibling.textContent = "";
    }
  } else if (target.classList.contains("fild-name")) {
    const nameDone = target.value.length > 1;

    if (!nameDone) {
      target.style.border = "1px solid red";
      target.nextElementSibling.textContent =
        "Ім'я має бути довшим ніж 1 символ";
    } else {
      target.style.border = "1px solid #ccc";
      target.nextElementSibling.textContent = "";
    }
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
  }, 3000);
}

/* ======= translating page ========== */
const enText = `I am a Front-End Developer with extensive experience in creating dynamic and interactive web applications. I possess deep expertise in React and modern web development technologies. I am passionate about building products that make a positive impact on people's lives. My goal is to continuously enhance my skills by exploring new tools and methodologies, staying ahead in the ever-evolving tech landscape.

I am a responsible and detail-oriented professional. In my previous career as a design engineer, I developed strong skills in teamwork and process organization. In my free time, I enjoy learning new technologies, staying active through sports, and fishing. I am known for my good sense of humor, and I strive to be not just a great colleague but also a reliable friend in life.`;

const uaText = `Я Front-End розробник із досвідом роботи у створенні динамічних та
інтерактивних веб-додатків. Маю глибокі знання в React і сучасних
технологіях веб-розробки. Мене надихає можливість створювати
продукти, які покращують життя людей. Завжди прагну вивчати нові
інструменти та підходи, щоб залишатися на передовій технологій.
Відповідальний, уважний до деталей. В "минулому житті" працював
інженером-конструктором, тому маю гарні навички працювати в
команді та в організації процесів. У вільний час вивчаю нові
технології, займаюсь спортом і цікавлюсь рибалкою. Маю гарне
почуття гумору, можу стати не лише колегою, а й хорошим другом по
життю.`;

const trText = document.querySelector(".about-text");
let lg = true;

document.querySelector(".lg").addEventListener("click", (e) => translatingText(e));

const translatingText = (e) => {
  const target = e.target;
  if (lg) {
    trText.textContent = enText;
    target.classList.remove('en')
    target.classList.add('ua')
  } else {
    trText.textContent = uaText;
    target.classList.remove('ua')
    target.classList.add('en')
  }
  lg = !lg;
}
