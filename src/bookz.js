/* jshint esversion: 6 */
let startIndex = 0;
const apiKey = "AIzaSyAWp0XyrtpVfw0HUbCQdr-Jzl-2yyqpHiI";

const booksStorage = JSON.parse(localStorage.getItem('cart')) ?? [];

export function fetchBooks(category) {
    const query = `subject:${encodeURIComponent(category)}`;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка связи');
            }
            return response.json();
        })
        .then(data => {
            const booksContainer = document.querySelector('.books');
            booksContainer.innerHTML = '';
            data.items.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');

                const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
                const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '';
                const title = book.volumeInfo.title;
                const ratingsCount = book.volumeInfo.ratingsCount ? `Ratings: ${book.volumeInfo.ratingsCount}` : '';
                                
                let description = book.volumeInfo.description ? book.volumeInfo.description : '';
                const maxLength = 3 * 60; 
                if (description.length > maxLength) {
                    description = description.substring(0, maxLength) + '...';
                }
                                
                const retailPrice = book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}` : '';


                           bookElement.innerHTML = `
                    <img src="${thumbnail}" alt="Thumbnail">
                    <div class="book-info">
                        <p class="authors">${authors}</p>
                        <h2 class="book-title">${title}</h2>
                        <p>${ratingsCount}</p>
                        <p class="authors">${description}</p>
                        <p class="price">${retailPrice}</p>
                       <button data-id="${book.id}" class='button btn-buy'>${booksStorage.includes(book.id) ? 'IN THE CART' : 'BUY NOW'}</button>
                    </div>
                `;
                booksContainer.appendChild(bookElement);
            });
            startIndex += 6; 
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
    }

document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cartCount');
    const booksStorage = JSON.parse(localStorage.getItem('cart')) ?? [];

    function updateCartCount() {
        cartCount.innerText = booksStorage.length;
        if (booksStorage.length > 0) {
            cartCount.style.display = 'block'; 
        } else {
            cartCount.style.display = 'none'; 
        }
    }
    updateCartCount();

    const categoryItems = document.querySelectorAll('.category');
    let initialCategory = '';
    categoryItems.forEach(item => {
        if (item.classList.contains('sidebar-active')) {
            initialCategory = item.textContent.trim();
        }

        item.addEventListener('click', () => {
            document.querySelector('.category.sidebar-active').classList.remove('sidebar-active');
            item.classList.add('sidebar-active');
            const category = item.textContent.trim();
            startIndex = 0; 
            fetchBooks(category);
        });
    });

    document.addEventListener('click', (event) => {
        if(event.target.classList.contains('btn-buy')){
            const id = event.target.getAttribute('data-id');
            const index = booksStorage.indexOf(id);
                     if (event.target.textContent === 'BUY NOW') {
                        event.target.textContent = 'IN THE CART';
                        event.target.classList.add('pushed-btn');
                        booksStorage.push(id);
                        localStorage.setItem('cart', JSON.stringify(booksStorage))
                }else { 
                    event.target.textContent = 'BUY NOW';
                    event.target.classList.remove('pushed-btn');
                    booksStorage.splice(booksStorage.indexOf(id), 1)
                    }
                localStorage.setItem('cart', JSON.stringify(booksStorage));
                updateCartCount();
        }
    })
        fetchBooks(initialCategory);
    });
    
   
    const loadMore = document.querySelector('.position'); 
    loadMore.addEventListener('click', () => {
        const activeCategory = document.querySelector('.category.sidebar-active').textContent.trim();
        fetchBooks(activeCategory); 
    });
