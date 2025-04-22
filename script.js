// Search Form Submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchQuery = event.target.querySelector('input[name="search"]').value;
    alert('Searching for: ' + searchQuery); // Replace with actual search logic
});

// Filter Buttons (Placeholder for functionality)
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('Filter applied: ' + this.textContent); // Replace with actual filter logic
    });
});

// Pagination Buttons (Placeholder for functionality)
document.querySelectorAll('.pagination-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('Navigating to page: ' + this.textContent); // Replace with actual pagination logic
    });
});