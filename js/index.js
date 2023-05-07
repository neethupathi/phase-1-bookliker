//document.addEventListener("DOMContentLoaded", function() {});
document.addEventListener("DOMContentLoaded", function() {});

function getBooks() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => renderBooks(books))
}

function renderBooks(books) {
    books.forEach (book => {
        const title = book.title
        const li = document.createElement('li')
        li.innerText = title
        document.querySelector('#list').appendChild(li)
        li.addEventListener('click', () => {
            getBookInfo(book)
        })
    })

}

function getBookInfo(book) {
    document.querySelector('div#show-panel').innerText = ''
    //book image
    const image = document.createElement('p')
    image.innerHTML = `<img src='${book.img_url}' alt='book image' height='200'/>`
    //title
    const titleElement = document.createElement('div')
    titleElement.innerHTML = `${book.title} <br> <br>`
    titleElement.className = 'boldText'
    //append image, title
    const bookInfoDiv = document.querySelector('div#show-panel')
    bookInfoDiv.append(image, titleElement)
    //subtitle
    if (book.subtitle) {
    const subtitleElement = document.createElement('div')
    subtitleElement.innerHTML = `${book.subtitle} <br> <br>`
    subtitleElement.className = 'boldText'
    bookInfoDiv.append(subtitleElement)
    }
    //author
    const authorElement = document.createElement('div')
    authorElement.innerHTML = `${book.author} <br> <br>`
    authorElement.className = 'boldText'
    //description
    const descriptionElement = document.createElement('div')
    descriptionElement.innerHTML = `${book.description} <br>`
    //append author and description
    bookInfoDiv.append(authorElement, descriptionElement)
    //append user likes
    const ul = document.createElement('ul')
    bookInfoDiv.appendChild(ul)
    book.users.forEach(user => {
        const userName = user.username
        const li = document.createElement('li')
        li.innerText = userName
        ul.appendChild(li)
    })
    const likeButton = document.createElement('button')
    likeButton.innerText = 'Like'
    bookInfoDiv.appendChild(likeButton)
    likeButton.addEventListener('click', () => {
        bookUserArr = [];
        book.users.forEach(user => {
            const userName = user.username
            const userID = user.id
            bookUserArr.push({id: userID, username: userName})

        })

        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "users": [
                    ...bookUserArr,
                    { "id": 1, "username": "pouros" }
                  ]
            })
        })
        .then(res => res.json())
        .then(bookData => {
            const addedUser = bookData.users.slice(-1)
            const li = document.createElement('li')
            li.innerText = addedUser[0].username
            ul.appendChild(li)
            if (likeButton.innerText === 'Like') {
                likeButton.innerText = 'Unlike'
            }
            else if (likeButton.innerText === 'Unlike') {
                likeButton.innerText = 'Like'
            }
        })
    })
}

getBooks();
