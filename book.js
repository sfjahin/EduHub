const books = []; // In-memory book storage (placeholder for no backend)

// List Book Form Submission
document.getElementById('listBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const book = {
        title: formData.get('title'),
        author: formData.get('author'),
        price: parseFloat(formData.get('price')),
        condition: formData.get('condition'),
        description: formData.get('description') || 'No description provided.',
    };
    books.push(book);
    alert(`Book listed: ${book.title} by ${book.author} for $${book.price}`);
    event.target.reset();
    renderBooks();
});

// Render Books in Grid
function renderBooks(filterCondition = '', maxPrice = Infinity) {
    const bookGrid = document.getElementById('bookGrid');
    bookGrid.innerHTML = '';
    const filteredBooks = books.filter(book => 
        (filterCondition === '' || book.condition === filterCondition) &&
        book.price <= maxPrice
    );
    filteredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'bg-white p-4 rounded-lg shadow-md';
        bookCard.innerHTML = `
            <h3 class="text-xl font-semibold text-tertiary">${book.title}</h3>
            <p class="text-gray-600">by ${book.author}</p>
            <p class="text-primary font-bold">$${book.price.toFixed(2)}</p>
            <p class="text-gray-600">Condition: ${book.condition}</p>
            <p class="text-gray-600">${book.description}</p>
            <button class="buy-btn mt-2 w-full bg-primary text-white p-2 rounded-md hover:bg-opacity-90">Buy Now</button>
        `;
        bookCard.querySelector('.buy-btn').addEventListener('click', () => {
            alert(`Purchased ${book.title} for $${book.price.toFixed(2)}`);
        });
        bookGrid.appendChild(bookCard);
    });
}

// Apply Filters
document.getElementById('applyFilters').addEventListener('click', function() {
    const condition = document.getElementById('conditionFilter').value;
    const maxPrice = parseFloat(document.getElementById('maxPriceFilter').value) || Infinity;
    renderBooks(condition, maxPrice);
    alert(`Filters applied: Condition=${condition || 'All'}, Max Price=$${maxPrice === Infinity ? 'Any' : maxPrice}`);
});

// Initial Render
renderBooks();