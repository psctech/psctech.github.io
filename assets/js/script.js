document.addEventListener('DOMContentLoaded', function () {
    // Initialize ScrollSpy
    const elems = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(elems, {
        scrollOffset: 100, // Adjust offset to highlight sections earlier/later
    });

    const elemsFAB = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elemsFAB, {
        hoverEnabled: false, // Disable hover activation for better mobile experience
    });

    // Build TOC dynamically with icons and subheaders
    const toc = document.getElementById('toc');
    const sections = document.querySelectorAll('.scrollspy');
    const headers = document.querySelectorAll('h3'); // Get all <h3> elements

    let currentSubheader = null; // Track the most recent <h3> for grouping

    headers.forEach(header => {
        // Add <h3> as a subheader in the TOC
        currentSubheader = document.createElement('li');
        currentSubheader.classList.add('collection-header');
        currentSubheader.innerHTML = `<h6>${header.textContent}</h6>`;
        toc.appendChild(currentSubheader);

        // Find the next sibling sections until another <h3> or end of content
        let sibling = header.nextElementSibling;
        while (sibling && sibling.tagName !== 'H3') {
            if (sibling.classList.contains('scrollspy')) {
                const sectionId = sibling.id;
                const h4 = sibling.querySelector('h4'); // Get <h4> for section title
                const sectionIcon = sibling.getAttribute('data-icon'); // Get optional icon

                // Add <h4> as a clickable TOC item under the current subheader
                if (h4) {
                    const tocItem = document.createElement('li');
                    tocItem.classList.add('collection-item');
                    tocItem.innerHTML = `
                        <a href="#${sectionId}">
                            ${h4.textContent}
                            ${sectionIcon ? `<img src="${sectionIcon}" alt="${h4.textContent} Icon" class="toc-icon">` : ''}
                        </a>
                    `;
                    toc.appendChild(tocItem);

                    // Add icon to the main content's <h4>
                    if (sectionIcon) {
                        const iconImg = document.createElement('img');
                        iconImg.src = sectionIcon;
                        iconImg.alt = `${h4.textContent} Icon`;
                        iconImg.classList.add('inline-icon-header');
                        h4.prepend(iconImg);
                    }
                }
            }
            sibling = sibling.nextElementSibling;
        }
    });

    // Get all sections
    const sectionsArray = Array.from(document.querySelectorAll('.scrollspy'));
    const goToTop = document.getElementById('go-to-top');
    const goUp = document.getElementById('go-up');
    const goDown = document.getElementById('go-down');

    // Helper function to scroll to a section
    const scrollToSection = (section) => {
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    // Scroll to the top
    goToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    // Scroll to the previous section
    goUp.addEventListener('click', () => {
        const currentSection = sectionsArray.find((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });

        const currentIndex = sectionsArray.indexOf(currentSection);
        if (currentIndex > 0) {
            scrollToSection(sectionsArray[currentIndex - 1]);
        }
    });

    // Scroll to the next section
    goDown.addEventListener('click', () => {
        const currentSection = sectionsArray.find((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });

        const currentIndex = sectionsArray.indexOf(currentSection);
        if (currentIndex < sectionsArray.length - 1) {
            scrollToSection(sectionsArray[currentIndex + 1]);
        }
    });
});