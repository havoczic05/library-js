document.addEventListener("DOMContentLoaded", () => {
  const myLibrary = [];

  function Book(title, author, pages, read) {
    this.title = title || "Unknown Title";
    this.author = author || "Unknown Author";
    this.pages = typeof pages === 'number' && pages > 0 ? pages : 0;
    this.read = read === "Read" || read === "Not read" ? read : "Not read";
  }

  function addBookToLibrary(title, author, pages, read) {
    try {
      const book = new Book(title, author, parseInt(pages, 10), read);
      if (!book.title || !book.author || typeof book.pages !== 'number' || !book.read) {
      }
      myLibrary.push(book);
    } catch (error) {
      console.error("Failed to add book to library:", error.message);
    }
  }

  function displayAllLibraryBooks() {
    const booksContainer = document.querySelector(".books");
    if (!booksContainer) {
      console.error("No element with class 'books' found");
      return;
    }
    booksContainer.innerHTML = ""; // Clear existing books

    myLibrary.forEach((book, index) => {
      try {
        booksContainer.insertAdjacentHTML("beforeend", `<div class="card" data-index=${index}>
            <div class="img">
              <div class="save" data-index=${index}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            <div class="text">
              <p class="h3">${book.title}</p>
              <p class="p">${book.author} - ${book.pages} pages</p>
              <div class="icon-box ${book.read === "Read" ? "read-book" : "unread-book"}">
                <p class="span">${book.read === "Read" ? "Read Book" : "Unread Book"}</p>
              </div>
            </div>
          </div>`);
      } catch (error) {
        console.error(`Error displaying book ${index}:`, error);
      }
    });

    const closeCardBtns = document.querySelectorAll(".save");
    closeCardBtns.forEach((closeBtn, index) => {
      closeBtn.addEventListener("click", () => {
        removeBook(index);
        displayAllLibraryBooks();
      });
    });
  }

  function removeBook(index) {
    if (index > -1 && index < myLibrary.length) {
      myLibrary.splice(index, 1);
      console.log(myLibrary);
    }
  }

  const modalBtn = document.querySelector("#modal-btn");
  const modal = document.querySelector("dialog");
  const closeBtn = document.querySelector(".close-btn-container");

  modalBtn.addEventListener("click", () => {
    modal.showModal();
  });

  closeBtn.addEventListener("click", () => {
    modal.close();
  });

  const submitBtn = document.querySelector("#submit");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    addBookToLibrary(title, author, pages, read);
    displayAllLibraryBooks();
    modal.close();
  });

  // Initial display
  addBookToLibrary("The Alchemist", "Paulo Coelho", 163, "Read");
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, "Not read");
  addBookToLibrary("1984", "George Orwell", 328, "Not read");
  addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "Not read");
  addBookToLibrary("Pride and Prejudice", "Jane Austen", 320, "Not read");
  addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 192, "Not read");
  addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1216, "Not read");
  addBookToLibrary("The Hunger Games", "Suzanne Collins", 360, "Not read");
  displayAllLibraryBooks();
});
