const URL = window.location.href;
const splitURL = URL.split("/");
const id = splitURL.pop();

async function getDetail() {
  try {
    const req = await window.fetch(`/api/book/${id}`);
    const result = await req.json();

    renderData(result.result);
  } catch (error) {
    console.log(error);
  }
}

getDetail();

function renderData(data) {
  const title = document.getElementById("book-title");
  const price = document.getElementById("book-price");
  const img = document.getElementById("book-img");
  const author = document.getElementById("book-author");
  const release = document.getElementById("book-date");

  title.innerText = data.title;
  price.innerText = "$" + data.price;
  img.setAttribute("src", data.imageURL);
  img.setAttribute("alt", data.title);
  author.innerText = data.author;
  release.innerText = data.releaseDate;
}


const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", deleteBook);

async function deleteBook() {
  try {
    const req = await window.fetch(`/api/adm/book/delete/${id}`, {
      method: "POST"
    });
    const result = await req.json();

    if (result.status === 200) {
      window.location.href = "/admin/book/list";
    }
  } catch (error) {
    console.log(error);
  }
}

