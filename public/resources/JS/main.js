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

//login
const input = document.querySelectorAll(".input");

function focusElement() {
  const parent = this.parentNode;
  parent.classList.add("focus");
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
},3000)