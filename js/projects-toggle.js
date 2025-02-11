document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-projects');
    const htmlCssProjects1 = document.getElementById('work-demo-box');
    const htmlCssProjects2 = document.getElementById('work-demo-box-2');
    const jsProjects1 = document.getElementById('js-work-demo-box');
    const jsProjects2 = document.getElementById('js-work-demo-box-2');

    // Initially hide JS projects
    jsProjects1.classList.add('hidden');
    jsProjects2.classList.add('hidden');

    toggleButton.addEventListener('click', () => {
        const isShowingHtmlCssProjects = !htmlCssProjects1.classList.contains('hidden');
        
        if (isShowingHtmlCssProjects) {
            // Switch to JS projects
            htmlCssProjects1.classList.add('hidden');
            htmlCssProjects2.classList.add('hidden');
            jsProjects1.classList.remove('hidden');
            jsProjects2.classList.remove('hidden');
            toggleButton.textContent = 'הצג פרוייקטים ב-HTML/CSS';
        } else {
            // Switch to HTML/CSS projects
            jsProjects1.classList.add('hidden');
            jsProjects2.classList.add('hidden');
            htmlCssProjects1.classList.remove('hidden');
            htmlCssProjects2.classList.remove('hidden');
            toggleButton.textContent = 'הצג פרוייקטים ב-JS';
        }
    });
});
