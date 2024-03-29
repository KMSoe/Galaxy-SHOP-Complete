const input = document.querySelectorAll(".input");

function focusElement() {
  const parent = this.parentNode;
  parent.classList.add("focus");
  const inputGroup = this.parentNode.parentNode;
  inputGroup.classList.remove("invalid");
}
function blurElement() {
  const parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
    const smallText = this.parentNode.parentNode.querySelector("small");
    smallText.classList.remove("misspassword");
  }
}

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("focus", focusElement);
  input[i].addEventListener("blur", blurElement);
}

const showBtns = document.querySelectorAll(".input-gp i.fa-eye");
for (let i = 0; i < showBtns.length; i++) {
  showBtns[i].addEventListener("click", (e) => {
    e.preventDefault();
    showBtns[i].classList.toggle("fa-eye");
    showBtns[i].classList.toggle("fa-eye-slash");
    const element = e.target.nextElementSibling;
    element.type = element.type === "password" ? "text" : "password";
  });
}

const searchIcon = document.querySelector(".search-icon");
const searchbox = document.querySelector(".searchbox");

function clickSearch() {
  const parent = this.parentNode;
  parent.classList.add("active");
  searchbox.focus();
}
function blurSearch() {
  const parent = this.parentNode;
  // if(this.value=''){
  parent.classList.remove("active");
  searchbox.value = "";
}
searchIcon.addEventListener("click", clickSearch);
searchbox.addEventListener("blur", blurSearch);

const alerts = document.querySelectorAll(".alert");
setTimeout(() => {
  alerts.forEach((alert) => {
    alert.style.display = "none";
  });
}, 3000);

//Password Match
const pwdField = document.querySelector("#password");

pwdField.addEventListener("focus", (e) => {
  e.preventDefault();
  const smallText = e.target.parentNode.parentNode.querySelector("small");
  smallText.classList.add("misspassword");
  document.addEventListener("keyup", () => {
    if (e.target.value.length >= 8) {
      smallText.classList.remove("misspassword");
      smallText.textContent = "Enough";
    } else {
      smallText.classList.add("misspassword");
      smallText.textContent = "Minimum 8 characters";
    }
  });
});
document.querySelector("#confirmPassword").addEventListener("focus", (e) => {
  e.preventDefault();
  const pwd = pwdField.value;
  const smallText = e.target.parentNode.parentNode.querySelector("small");
  smallText.classList.add("misspassword");
  document.addEventListener("keyup", () => {
    if (e.target.value == pwd) {
      smallText.classList.remove("misspassword");
      smallText.textContent = "Match";
    } else {
      smallText.classList.add("misspassword");
      smallText.textContent = "Password does't match";
    }
  });
});
