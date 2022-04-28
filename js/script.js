let $ = document;
const modalShow = $.getElementById("show-modal");
const modal = $.getElementById("modal");
const closeModal = $.getElementById("close-modal");
const websiteNameEl = $.getElementById("website-name");
const websiteUrlEl = $.getElementById("website-url");
const btnSave = $.querySelector("button");
const bookmarksContainer = $.getElementById("bookmarks-container");

let bookmarks = [];

const showModal = () => {
  modal.classList.add("show-modal");
};

const modalClose = () => {
  modal.classList.remove("show-modal");
};

const buildBookmark = () => {
  bookmarksContainer.innerHTML = "";

  bookmarks.forEach((bookmarks) => {
    const name = bookmarks.name;
    const url = bookmarks.url;

    // item
    const item = document.createElement("div");
    item.classList.add("item");

    // closeIcon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.addEventListener("click", () => {
      deleteBookmark(url);
    });

    // link & favIcon container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");

    // link
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.textContent = name;

    // favIcon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      "https://s2/googleusercontent.com/s2/favicons?domain=" + "https://" + url
    );
    favicon.setAttribute("alt", name);

    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
};

const fetchBookmarks = () => {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmark();
};

const storeBookmarks = (event) => {
  event.preventDefault();
  let nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;

  if (!inputValidation(nameValue, urlValue)) {
    return false;
  }
  const bookmarkObj = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmarkObj);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  buildBookmark();

  websiteNameEl.value = "";
  websiteUrlEl.value = "";
  modalClose();
};

const inputValidation = (name, url) => {
  if (name === "" || url === "") {
    alert("نام یا آدرس را باید وارد کنید");
    return false;
  } else if (name.length > 15 || url.length > 25) {
    alert("مقادیر وارد شده بیش حد مجاز هستند");
    return false;
  }
  return true;
};

const deleteBookmark = (inputUrl) => {
  let deleteBokmarkConfirm = confirm("یرای حذف بوکمارک مطمئن هستید ؟   ");
  if (deleteBokmarkConfirm) {
    bookmarks.forEach((bookmark, index) => {
      if (bookmark.url == inputUrl) {
        bookmarks.splice(index, 1);
      }
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
  }
};

modalShow.addEventListener("click", showModal);
closeModal.addEventListener("click", modalClose);
btnSave.addEventListener("click", storeBookmarks);

fetchBookmarks();
