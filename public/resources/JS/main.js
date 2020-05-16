(function ($) {
  $(".hero-items").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    items: 1,
    dots: false,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    navText: [
      '<i class="ti-angle-left"></i>',
      '<i class="ti-angle-right"></i>',
    ],
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
  });
})(jQuery);

document.querySelector('#menu-toggle').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#wrapper').classList.toggle('toggled');
});

// const fields=document.querySelector('.edit-post-section').querySelectorAll('.input')
// fields.forEach(el => {
//   el.focus();
// });
//login
const input = document.querySelectorAll(".input");

function focusElement() {
  const parent = this.parentNode;
  parent.classList.add("focus");
  const inputGroup = this.parentNode.parentNode;
  inputGroup.classList.remove('invalid');
}
function blurElement() {
  const parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("focus", focusElement);
  input[i].addEventListener("blur", blurElement);
}

const showBtns = document.querySelectorAll(".input-gp i.fa-eye");
for (let i=0;i < showBtns.length;i++) {
        showBtns[i].addEventListener("click", (e) => {
          e.preventDefault();
          showBtns[i].classList.toggle('fa-eye');
          showBtns[i].classList.toggle('fa-eye-slash');
          const element = e.target.nextElementSibling;
          element.type = element.type === "password" ? "text" : "password";
        });
}

        const searchIcon=document.querySelector('.search-icon');
        const searchbox=document.querySelector('.searchbox');
        
        function clickSearch(){
            const parent=this.parentNode;
            parent.classList.add('active');
            searchbox.focus();
        }
        function blurSearch(){
            const parent=this.parentNode;
            // if(this.value=''){
                parent.classList.remove('active');
                searchbox.value='';
            
        }
        searchIcon.addEventListener('click', clickSearch);
        searchbox.addEventListener('blur', blurSearch);

  const alerts=document.querySelectorAll('.alert');
setTimeout(()=>{
  alerts.forEach(alert=>{
    alert.style.display='none';
  })
},3000);

//Password Match
const pwdField = document.querySelector('#password');
const submitBtn = document.querySelector('input[type="submit"]'); 

pwdField.addEventListener('focus',(e)=>{
  e.preventDefault();
  const smallText = e.target.parentNode.parentNode.querySelector('small');
  smallText.style.color = "#555";
  smallText.style.color = "red";
  document.addEventListener('keyup',()=>{
    if(e.target.value.length < 8){
      smallText.style.color = "red";
      smallText.textContent = "Minimum 8 characters";
    }else{
      smallText.style.color = "#333";
      smallText.textContent = "Strong";
    }
  });
})
document.querySelector('#confirmPassword').addEventListener('focus',(e)=>{
  e.preventDefault();
  const pwd = pwdField.value;
  const smallText = e.target.parentNode.parentNode.querySelector('small');
  smallText.style.color = "red";
  document.addEventListener('keyup',()=>{
    if(e.target.value !== pwd){
      smallText.style.color = "red";
    }else{
      smallText.style.color = "#333";
      smallText.textContent = "Match";
    }
  });
})