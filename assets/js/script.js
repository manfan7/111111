/*меню*/
jQuery(document).ready(function ($) {
  /*мобильное	меню*/
  $(".mobil-menu .parent>a").each(function (i, elem) {
    $(this)
      .clone()
      .wrap('<li class="two-parent"></li>')
      .parent()
      .prependTo($(this).next());
  });

  /*	let parentItem = $('.mobil-menu .parent').index();
	console.log (parentItem);
	$('.mobil-menu .parent>a').clone().wrap('<li class="two-parent"></li>').parent().prependTo($('.mobil-menu .parent>a').next());		*/
  $(".mobil-menu .dl-submenu li.two-parent").prepend(
    '<a href="#" class="dl-back"><img src="./assets/img/icons/icon_back.png" alt=""></a> <a href="#" class="closeMenu"><img src="./assets/img/icons/icon_cross.png" alt=""></a>'
  );

  $(".mobil-menu .two-parent a.closeMenu").click(function () {
    $(".mobile_menu").removeClass("open");
    $("header").removeClass("open");
  });

  $(".mobil-menu").dlmenu();
  tabs();
  //угол меню
});
document.addEventListener("click", (event) => {
  let mobileMenu = document.querySelector(".mobile_menu");
  let header = document.querySelector("header");
  if (
    !event.target.classList.contains("mobil-menu") &&
    mobileMenu.classList.contains("open") &&
    !event.target.classList.contains("burger")
  ) {
    mobileMenu.classList.remove("open");
    header.classList.remove("open");
  }
});
const tabs = () => {
  function bindTabs(
    titleClass,
    contentClass,
    activeClass,
    startTitleClass,
    startContentClass
  ) {
    const title = document.querySelectorAll(titleClass);
    const content = document.querySelectorAll(contentClass);
    const startTitle = document.querySelector(startTitleClass);
    const startContent = document.querySelector(startContentClass);

    // Обработчик кликов на табах
    title.forEach((item) =>
      item.addEventListener("click", () => {
        if (item.classList.contains(activeClass)) {
          return;
        }

        title.forEach((element) => {
          element.classList.remove(activeClass);
        });

        item.classList.add(activeClass);

        content.forEach((element) => {
          element.classList.remove(activeClass);
        });

        const activeContent = document.querySelector("#" + item.dataset.tab);
        activeContent.classList.add(activeClass);
      })
    );

    // При первой загрузке страницы, активны эти табы
    startTitle.classList.add(activeClass);
    startContent.classList.add(activeClass);
  }

  // Табы со знаменитостями
  bindTabs(
    ".whyus__item-content--left",
    ".tab-content",
    "active",
    '[data-tab="tab-1"]',
    "#tab-1"
  );
  bindTabs(
    ".mobi",
    ".tab-content-mobi",
    "active1",
    '[data-tab="tab-10"]',
    "#tab-10"
  );
};

let acc = document.getElementsByClassName("toggleControl");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("activetoggle");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
let sh = document.querySelectorAll(".showMesasage");
sh.forEach((item) =>
  item.addEventListener("click", function () {
    item.classList.add("hide");
    item.nextElementSibling.classList.remove("hide");
  })
);
let but = document.querySelectorAll(".Modalopen");
const closebtn = document.querySelectorAll(".closebtn");
let modal = document.querySelector(".modal-backdrop");
let form = document.querySelector(".helpme");
let thanksForm = document.querySelector(".thanks");
let req = document.querySelectorAll("._req");
but.forEach((item) =>
  item.addEventListener("click", function () {
    modal.classList.remove("hide");
    document.body.classList.add("disabled-scroll");
    req.forEach((item) => (item.value = ""));
  })
);
closebtn.forEach((item) =>
  item.addEventListener("click", () => {
    modal.classList.add("hide");
    thanksForm.classList.add("hide");
    thanksForm.classList.remove("animated");
    document.body.classList.remove("disabled-scroll");
  })
);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hide");
    document.body.classList.remove("disabled-scroll");
  }
});
form.addEventListener("submit", formsend);
async function formsend(e) {
  e.preventDefault();

  let error = formValidate(form);
  //let formData = new FormData(form);
  if (error === 0) {
    modal.classList.add("hide");
    setTimeout(() => {
      thanksForm.classList.add("animated");
    }, 200);

    /*let response = await fetch("/", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      thanksForm.classList.add("animated");
    }*/
  }
}
function formValidate(e) {
  let error = 0;
  let req = document.querySelectorAll("._req");
  //req.forEach((item) => item.classList.remove("wrong"));
  for (let i = 0; i < req.length; i++) {
    if (
      req[i].getAttribute("type") === "checkbox" &&
      req[i].checked === false
    ) {
      req[i].classList.add("wrong");
      error++;
    }
  }

  return error;
}
