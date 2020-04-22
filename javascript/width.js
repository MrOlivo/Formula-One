function addActiveClass() {
    console.log('Works?');

    const items = document.getElementsByClassName('item');

    for (const item of items) {
        item.addEventListener('click', () => {
            if (item.getAttribute('class').includes('active')) {
                item.classList.remove('active');
                console.log('Removed');
            } else {
                item.classList.add('active');
                console.log('Added');
            }
        });
    }
}