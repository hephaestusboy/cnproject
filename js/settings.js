 
document.querySelectorAll('.settings-sidebar ul li').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.settings-sidebar ul li.active').classList.remove('active');
        item.classList.add('active');

        const sectionToShow = item.getAttribute('data-section');
        document.querySelectorAll('.settings-section').forEach(section => {
            if (section.id === sectionToShow) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});
