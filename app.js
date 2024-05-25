const iconsList = [
  "squarespace",
  "paypal",
  "figma",
  "stripe",
  "telegram",
  "salesforce",
  "soundcloud",
  "superpowers",
  "suse",
  "typo3",
  "weebly",
  "yammer",
  "vk",
  "vine",
  "twitch",
  "xing",
  "etsy",
  "tiktok",
  "google",
  "wordpress",
  "webflow",
  "linkedin",
];

const addMoreBtn = document.querySelector(".add-more-btn");
const modal = document.querySelector(".modal");
const checkmarkBoxes = document.querySelectorAll(".checkmark");
const appNameInput = document.querySelector("#appName");
const submitButton = document.querySelector(".submit");
const appsListEl = document.querySelector(".apps-list");
const closeModalBtn = document.querySelector(".close-modal");
const iconListEl = document.querySelector(".icon-list");
const resetButton = document.querySelector(".reset");

const formInfo = {
  appName: "",
  appIcon: "",
  color: "",
};

function randomColor() {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
}

function getRandColorsArray(num) {
  const colors = [];

  while (colors.length < num) {
    const color = randomColor();
    if (!colors.includes(color)) colors.push(color);
  }

  return colors;
}

function getRandIconsArray(num) {
  const icons = [];

  while (icons.length < num) {
    const index = Math.floor(Math.random() * iconsList.length);
    const icon = iconsList[index];

    if (!icons.includes(icon)) icons.push(icon);
  }

  return icons;
}

function populateIconsFormList(num) {
  iconListEl.innerHTML = "";

  const newIcons = getRandIconsArray(num);

  newIcons.forEach((icon) => {
    const li = document.createElement("li");
    li.dataset.icon = icon;
    const i = document.createElement("i");
    i.classList.add("fa-brands", `fa-${icon}`);
    li.append(i);
    iconListEl.appendChild(li);
  });

  handleIconClick();
}

function populateColorsFormList(num) {
  const newColors = getRandColorsArray(num);

  checkmarkBoxes.forEach((box, index) => {
    const label = box.closest("label");
    label.dataset.color = newColors[index];
    box.style.backgroundColor = newColors[index];
  });

  handleCheckBoxes();
}

function handleCheckBoxes() {
  checkmarkBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      const label = e.target.closest("label");
      formInfo.color = label.dataset.color;
      label.dataset.checked = true;

      // making others not clickable
      checkmarkBoxes.forEach((box) => {
        const newLabel = box.closest("label");
        if (!newLabel.dataset.checked) newLabel.classList.add("unselected");
      });
    });
  });
}

function handleIconClick() {
  iconListEl.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    li.dataset.checked = true;
    formInfo.appIcon = li.dataset.icon;

    // making other icons unselectable once clicked
    document.querySelectorAll(".icon-list li").forEach((item) => {
      if (!item.dataset.checked) item.classList.add("unselected");
    });
  });
}

function handleFormSubmit() {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    formInfo.appName = appNameInput.value;
    // destructuring values
    const { appName, appIcon, color } = formInfo;

    // checking name length of app name
    if (appName.length < 2) {
      alert("Name needs to be at least 2 characters");
      return;
    }

    // if all inputs needed are filled
    if (appIcon && appName && color) {
      // create and add new app item to the list
      const li = document.createElement("li");
      li.classList.add("app-item");
      li.innerHTML = `              
                <i class="fa-brands fa-${appIcon}" style="color: ${color}" ></i>
                <div>
                    <p>${appName}</p>
                    <button class="hide">x Delete</button>
                </div>
            
            `;

      appsListEl.appendChild(li);
      modal.classList.add("hide");
    }
  });
}

appsListEl.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("app-item")) {
    const li = e.target.closest("li");
    const p = e.target.querySelector("p");
    const deleteBtn = e.target.querySelector("button");
    p.classList.add("hide");
    deleteBtn.classList.remove("hide");

    li.addEventListener("mouseleave", (e) => {
      p.classList.remove("hide");
      deleteBtn.classList.add("hide");
    });

    deleteBtn.addEventListener("click", (e) => li.remove());
  }
});

function resetValues() {
  resetButton.addEventListener("click", (e) => {
    e.preventDefault();

    formInfo.color = "";
    formInfo.appIcon = "";
    formInfo.appName = "";

    appNameInput.value = "";

    document
      .querySelectorAll(".icon-list li")
      .forEach((item) => item.classList.remove("unselected"));

    document
      .querySelectorAll(".icon-colors .container")
      .forEach((item) => item.classList.remove("unselected"));

    document.querySelector(`[data-checked="true"]`).dataset.checked = false;
  });
}

addMoreBtn.addEventListener("click", () => {
  modal.classList.remove("hide");

  populateIconsFormList(6);

  populateColorsFormList(6);

  handleFormSubmit();

  resetValues();
});

closeModalBtn.addEventListener("click", (e) => {
  modal.classList.add("hide");
});

(function () {
  const currentAppItemsIcons = document.querySelectorAll(".app-item i");
  const iconColors = getRandColorsArray(6);

  currentAppItemsIcons.forEach((icon, index) => {
    icon.style.color = iconColors[index];
  });
})();
