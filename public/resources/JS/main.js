(function ($) {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal",
  });

  $("#dismiss, .overlay").on("click", function () {
    $("#sidebar").removeClass("active");
    $(".overlay").removeClass("active");
  });

  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").addClass("active");
    $(".overlay").addClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
  });
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

  $(".product-slider").owlCarousel({
    loop: true,
    margin: 25,
    nav: true,
    items: 5,
    dots: true,
    navText: [
      '<i class="ti-angle-left"></i>',
      '<i class="ti-angle-right"></i>',
    ],
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
      },
    },
  });
})(jQuery);

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

const alerts = document.querySelectorAll(".alert");
setTimeout(() => {
  alerts.forEach((alert) => {
    alert.style.display = "none";
  });
}, 3000);

//Password Match
const pwdField = document.querySelector("#password");
if (pwdField) {
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
}
const confirmField = document.querySelector("#confirmPassword");
if (confirmField) {
  confirmField.addEventListener("focus", (e) => {
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
}

//Rating
const starOne = document.querySelector("#star-1");
const starTwo = document.querySelector("#star-2");
const starThree = document.querySelector("#star-3");
const starFour = document.querySelector("#star-4");
const starFive = document.querySelector("#star-5");

let ratingValue = 0;
if (starOne) {
  starOne.addEventListener("click", (e) => {
    e.preventDefault();
    ratingValue = 1;
    starOne.classList.remove("fa-star-o");
    starOne.classList.add("fa-star");
    starTwo.classList.add("fa-star-o");
    starTwo.classList.remove("fa-star");
    starThree.classList.add("fa-star-o");
    starThree.classList.remove("fa-star");
    starFour.classList.add("fa-star-o");
    starFour.classList.remove("fa-star");
    starFive.classList.add("fa-star-o");
    starFive.classList.remove("fa-star");
  });
}
if (starTwo) {
  starTwo.addEventListener("click", (e) => {
    e.preventDefault();
    ratingValue = 2;
    starOne.classList.remove("fa-star-o");
    starOne.classList.add("fa-star");
    starTwo.classList.remove("fa-star-o");
    starTwo.classList.add("fa-star");
    starThree.classList.add("fa-star-o");
    starThree.classList.remove("fa-star");
    starFour.classList.add("fa-star-o");
    starFour.classList.remove("fa-star");
    starFive.classList.add("fa-star-o");
    starFive.classList.remove("fa-star");
  });
}
if (starThree) {
  starThree.addEventListener("click", (e) => {
    e.preventDefault();
    ratingValue = 3;
    starOne.classList.remove("fa-star-o");
    starOne.classList.add("fa-star");
    starTwo.classList.remove("fa-star-o");
    starTwo.classList.add("fa-star");
    starThree.classList.remove("fa-star-o");
    starThree.classList.add("fa-star");
    starFour.classList.add("fa-star-o");
    starFour.classList.remove("fa-star");
    starFive.classList.add("fa-star-o");
    starFive.classList.remove("fa-star");
  });
}
if (starFour) {
  starFour.addEventListener("click", (e) => {
    e.preventDefault();
    ratingValue = 4;
    starOne.classList.remove("fa-star-o");
    starOne.classList.add("fa-star");
    starTwo.classList.remove("fa-star-o");
    starTwo.classList.add("fa-star");
    starThree.classList.remove("fa-star-o");
    starThree.classList.add("fa-star");
    starFour.classList.remove("fa-star-o");
    starFour.classList.add("fa-star");
    starFive.classList.add("fa-star-o");
    starFive.classList.remove("fa-star");
  });
}
if (starFive) {
  starFive.addEventListener("click", (e) => {
    e.preventDefault();
    ratingValue = 5;
    starOne.classList.remove("fa-star-o");
    starOne.classList.add("fa-star");
    starTwo.classList.remove("fa-star-o");
    starTwo.classList.add("fa-star");
    starThree.classList.remove("fa-star-o");
    starThree.classList.add("fa-star");
    starFour.classList.remove("fa-star-o");
    starFour.classList.add("fa-star");
    starFive.classList.remove("fa-star-o");
    starFive.classList.add("fa-star");
  });
}

const ratingForm = document.querySelector(".comment-form");
const reviewField = document.querySelector("#review");
const pdIdField = document.querySelector("#productId");
if (ratingForm) {
  ratingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const review = reviewField.value;
    const productId = pdIdField.value;
    try {
      const result = await axios.post(
        `http://localhost:3000/shop/products/detail/${productId}/review`,
        {
          productId,
          ratingValue,
          review,
        }
      );
      if (result.data.status === "success") {
        location.reload();
      }
    } catch (error) {
      throw error;
    }
  });
}

const deleteReviewBtn = document.querySelector(".deleteReviewBtn");
if (deleteReviewBtn) {
  deleteReviewBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const userId = deleteReviewBtn.dataset.userid;
    const reviewId = deleteReviewBtn.dataset.reviewid;
    const productId = pdIdField.value;
    console.log(userId, reviewId);
    try {
      const result = await axios.post(
        `http://localhost:3000/shop/products/detail/${productId}/review/delete`,
        {
          userId,
          reviewId,
        }
      );
      console.log(result);
      if (result.data.status === "success") {
        location.reload();
      }
    } catch (error) {
      throw error;
    }
  });
}

//Live Search

function injectHTML() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<!-- search feature begins -->
  <div class="search-overlay">
    
    <div class="search-overlay-bottom">
      <div class="container container--narrow py-3">
        <div class="live-search-results">
  
        </div>
      </div>
    </div>
  </div>
   <!-- search feature end -->
  `
  );
}
injectHTML();
const searchIcon = document.querySelector(".search-icon");
const searchBox = document.querySelector(".searchbox");
const searchOverlay = document.querySelector(".search-overlay");
const searchResultsField = document.querySelector(".live-search-results");
async function insertPreviousSearch() {
  try {
    const response = await axios.get(`http://localhost:3000/search/previous`);
    if (response.data.status === "success") {
      const previousSearch = response.data.data.previousSearch;

      searchResultsField.innerHTML = `<div class="list-group shadow-sm">
        ${previousSearch
          .map((el) => {
            return `<a href="/shop/products/detail/${el.productId}" class="list-group-item list-group-item-action">
                  <img class="avatar-tiny" src="/${el.image}"> <strong>${el.name}</strong>
                  <span class="text-muted small">by ${el.seller}</span>
                </a>`;
          })
          .join("")}
      </div>`;
    }
    // clickSearchResult();
  } catch (error) {
    throw error;
  }
}
async function clickSearchResult() {
  const searchitemLinks = document.querySelectorAll(
    ".live-search-results .list-group a.list-group-item"
  );

  for (let i = 0; i < searchitemLinks.length; i++) {
    searchitemLinks[i].addEventListener("click", async (e) => {
      e.preventDefault();
      const link = searchitemLinks[i].getAttribute("href");
      const sellerId = Number(searchitemLinks[i].dataset.sellerid);
      const productId = link.split("/")[4];
      try {
        const responseSaveData = await axios.post(
          `http://localhost:3000/search`,
          {
            sellerId,
            searchedProductId: productId,
          }
        );
        if (responseSaveData.data.status === "success") {
          location.assign(link);
        }
      } catch (error) {
        throw error;
      }
    });
  }
}
async function clickSearch(e) {
  e.preventDefault();
  const parent = this.parentNode;
  parent.classList.add("active");
  searchOverlay.classList.add("search-overlay--visible");
  searchResultsField.classList.add("live-search-results--visible");
  searchBox.focus();
  insertPreviousSearch();
}
function blurSearch(e) {
  e.preventDefault();
  const parent = this.parentNode;
  parent.classList.remove("active");
  searchOverlay.classList.remove("search-overlay--visible");
  searchBox.value = "";
}
searchIcon.addEventListener("click", clickSearch);
searchBox.addEventListener("keyup", async (e) => {
  e.preventDefault();
  let searchItem = searchBox.value;
  try {
    if (searchBox.value !== "") {
      const response = await axios.get(
        `http://localhost:3000/search?search=${searchBox.value}`
      );
      if (response.data.status === "success") {
        const products = response.data.data.searchResults;

        if (products.length) {
          searchResultsField.innerHTML = `<div class="list-group shadow-sm">
        <div class="list-group-item active"><strong>Search Results</strong> (${
          products.length
        } items found)</div>
        ${products
          .map((el) => {
            return `<a href="/shop/products/detail/${el.id}" data-sellerId="${el.userId}" class="list-group-item list-group-item-action">
                  <img class="avatar-tiny" src="/${el.image}"> <strong>${el.name}</strong>
                  <span class="small">by <em><b>${el.username}</b></em> on 0/14/2019</span>
                </a>`;
          })
          .join("")}
      </div>`;
        } else {
          searchResultsField.innerHTML = `<p class='alert alert-danger text-center shadow-sm'>No Result</p>`;
        }
        clickSearchResult();
      }
    } else {
      insertPreviousSearch();
    }
  } catch (error) {
    throw error;
  }
});
searchBox.addEventListener("blur", blurSearch);
if (searchResultsField) {
  searchResultsField.addEventListener("blur", blurSearch);
}

class Chat {
  constructor() {
    this.chatWrapper = document.querySelector(".chat-wrapper");
    this.showChatBoxBtn = document.querySelector(".showChatBox");
    this.injectHTML();
    this.senderId = Number(this.showChatBoxBtn.dataset.senderid);
    this.receiverId = Number(document.URL.split('/')[4]);
    this.closeChatBtn = document.querySelector(".chat-title-bar-close");
    this.chatField = document.querySelector("#chatField");
    this.chatForm = document.querySelector("#chatForm");
    this.chatLog = document.querySelector(".chat-log");
    this.events();
  }
  events() {
    this.chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessageToServer();
    });
    this.showChatBoxBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.chatWrapper.classList.add("chat--visible");
      this.openConnection();
    });
    this.closeChatBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.chatWrapper.classList.remove("chat--visible");
    });
  }
  openConnection(){
    this.socket = io.connect("http://localhost:3000");
    this.socket.on("chatMessageFromServer", (data) => {
      this.chatLog.insertAdjacentHTML('beforeend',`<!-- template for messages from others -->
      <div class="chat-other">
      <a href="#"><img class="avatar-tiny" src="/resources/img/undraw_profile_pic_ic5t.svg"></a>
      <div class="chat-message">
          <div class="chat-message-inner">
              ${data.message}
          </div>
      </div>
      </div>
      <!-- end template-->`)
    });
  }
  sendMessageToServer(){
    this.socket.emit('chatMessageFromBrowser', { senderId: this.senderId, receiverId: this.receiverId, message: this.chatField.value });
    this.chatLog.insertAdjacentHTML('beforeend',`<!-- template for your own message -->
      <div class="chat-self">
      <div class="chat-message">
          <div class="chat-message-inner">
              ${this.chatField.value}
          </div>
      </div>
      <img class="chat-avatar avatar-tiny" src="/resources/img/undraw_profile_pic_ic5t.svg">
      </div>` )
    this.chatField.value = '';
    this.chatField.focus();
  }
  injectHTML() {
    this.chatWrapper.innerHTML = `<div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i
    class="fa fa-times-circle"></i></span></div>
<div id="chat" class="chat-log">


<div class="chat-self">
<div class="chat-message">
    <div class="chat-message-inner">
        Hello, how are you?
    </div>
</div>
<img class="chat-avatar avatar-tiny" src="/resources/img/undraw_profile_pic_ic5t.svg">
</div>
<!-- end template-->

<!-- template for messages from others -->
<div class="chat-other">
<a href="#"><img class="avatar-tiny" src="/resources/img/undraw_profile_pic_ic5t.svg"></a>
<div class="chat-message">
    <div class="chat-message-inner">
        <a href="#"><strong>barksalot:</strong></a>
        I am doing well. How about you?
    </div>
</div>
</div>
<!-- end template-->
<div class="chat-self">
<div class="chat-message">
    <div class="chat-message-inner">
        Hello, how are you?
    </div>
</div>
<img class="chat-avatar avatar-tiny" src="/resources/img/undraw_profile_pic_ic5t.svg">
</div>

</div>

<form id="chatForm" class="chat-form border-top">
<input type="hidden" id="senderId" value="${this.senderId}">
<input type="hidden" id="receiverId" value="${this.receiverId}">
<input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
</form>`;
  }
}
if (document.querySelector(".chat-wrapper")) {
  new Chat();
}
