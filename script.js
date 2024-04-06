const url = `https://www.googleapis.com/books/v1/volumes?key=AIzaSyB9NVTzZnSFXpsGFaEb1qJ5Bql7HSzHy80&maxResults=40&q='`;

onLoad();
function onLoad() {
    fetchApi('Programming')
}

async function fetchApi(query) {
    BookList = []


    try {
        let response = await fetch(url + query)
        let result = await response.json();
        

        for (let i = 0; i < result.items.length; i++) {
            let title = result.items[i].volumeInfo.title;
            let authors = result.items[0].volumeInfo.authors || ["Unknown Author"];
            let author = authors[0]; // 
            let coverImage;
            if (result.items[i].volumeInfo.imageLinks && result.items[i].volumeInfo.imageLinks.thumbnail) {
                coverImage = result.items[i].volumeInfo.imageLinks.thumbnail;
            } else {
                coverImage = 'Unknown Image Link';
            }
            let industryIdentifier = result.items[i].volumeInfo.industryIdentifiers;
            let isbn = industryIdentifier ? industryIdentifier[0].identifier : "Unknown Identifier";

            if (result.items[i].volumeInfo.readingModes.image) {
                BookList.push({ title, author, coverImage, isbn })
            }
        }
        displayBooks(BookList)
    } catch (error) {
        console.error(error);
    }
}


function displayBooks(BookList) {
    console.log(BookList)
    let displayElement = document.querySelector('.books')
    displayElement.innerHTML = ""
    let innerHtml = ""
    for (let i = 0; i < BookList.length; i++) {
        innerHtml += ` <div class="col mx-auto">
        <div class="card m-3 border-white">
            <img src=${BookList[i].coverImage} class="card-img-top" alt="Book Image">
            <div class="card-body">
                <h5 class="card-title title">${BookList[i].title}</h5>
                <div class="author">By: ${BookList[i].author}</div>
                <div class="isbn">ISBN: ${BookList[i].isbn}</div>
                <button onclick="goToBookPage('${BookList[i].isbn}')" class="btn purple read-btn">Read Book</button>
            </div>
        </div>
    </div>`
    }
    displayElement.innerHTML = innerHtml

}

google.books.load({ 'language': 'en' })



function goToBookPage(isbn) {

    let newWindow = window.open('ReadBook.html?isbn=' + isbn, '_blank');
}



function onSearch() {

    let input = document.querySelector('.input-bar')
    let query = input.value
    if (query) {
        fetchApi(query)
    }
    input.value = ""
}



