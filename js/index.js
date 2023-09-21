document.addEventListener("DOMContentLoaded", function() {

fetchData()

function renderBook(bookData) {
    //console.log(bookData)
    const bookList = document.querySelector('#list')
    const bookElement = document.createElement('li')
    bookElement.innerText = bookData.title
    bookList.append(bookElement)

    bookElement.addEventListener('click', (e) => renderBookDetail(bookData))

}

function renderBookDetail(bookData) {
    const detailList = document.querySelector('#show-panel')
    detailList.innerHTML = ""
    const bookDetailsElement = document.createElement('li')
    const usersArr = bookData.users.map(user => user.username)
    const userList = document.createElement('ul')
    userList.className = "user-list"
    const likeBtn = document.createElement('button')
    likeBtn.setAttribute("id", "like=btn")
    likeBtn.innerText = "Like"
   

    usersArr.forEach(user => {
        const userItem = document.createElement('li')
        userItem.innerText = user
        userList.append(userItem)
    })

     bookDetailsElement.innerHTML = `
        <img src="${bookData.img_url}">
        <h2>${bookData.title}</h2>
        <h2>${bookData.author}</h2>
        <p>${bookData.description}</p>
     `
     bookDetailsElement.append(userList)
     detailList.append(bookDetailsElement, likeBtn)

     likeBtn.addEventListener('click', (e) => {
        likeBook(bookData)
     })

}

function likeBook(bookData) {
    let bookId = bookData.id
    let userArr = [...bookData.users]
    userArr.push( {
        id: 1,
        username: "pouros"
    })
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            users: userArr
        })
    })
    .then(res => res.json())
    .then(user => {
        const newUser = user.users[user.users.length-1].username
        const newUserElement = document.createElement('li')
        newUserElement.textContent = newUser
        const userList = document.querySelector('.user-list')
        userList.append(newUserElement)

    })

}


function fetchData() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(bookData => bookData.forEach(renderBook))
}
});


/**
 * List Books Pseudo:
 * - when pages loads (after DOMContentLoaded listener) create a fetch function to fetch books
 * - when promise is fulfilled and data is converted into json, forEach data, do the renderBooks function
 * - renderBooks will create a new li for each book and add the li to the ul
 */
/**
 * List Books
When the page loads, get a list of books from http://localhost:3000/books and 
display their titles by creating a li for each book and adding each
 li to the ul#list element.

Show Details
When a user clicks the title of a book, display the book's thumbnail, 
description, and a list of users who have liked the book. This information should 
be displayed in the div#show-panel element.
 */