const elementSelect = document.getElementById('select1');
const widthInput = document.getElementById('input2');
const heightInput = document.getElementById('input3');
const contentInput = document.getElementById('input4');
const bgColorInput = document.getElementById('input5');
const fontSizeInput = document.getElementById('input6');
const fontFamilyInput = document.getElementById('input7');
const container = document.querySelector('.container');
const addButton = document.getElementById('add');
const clearButton = document.getElementById('clear');

addButton.addEventListener('click', () => {
    const selectedElement = elementSelect.value;
    if (!selectedElement) {
        alert('אנא בחר אלמנט');
        return;
    }

    const newElement = document.createElement(selectedElement);
    
    newElement.style.margin = '10px';
    newElement.style.padding = '10px';
    newElement.style.border = '1px solid #ccc';
    newElement.style.borderRadius = '5px';
    newElement.style.maxWidth = '100%';
    newElement.style.boxSizing = 'border-box';
    newElement.style.color = '#000'; 

    if (widthInput.value) {
        newElement.style.width = widthInput.value + 'px';
    }

    if (heightInput.value) {
        newElement.style.height = heightInput.value + 'px';
    }

    if (contentInput.value) {
        switch (selectedElement) {
            case 'img':
                newElement.src = contentInput.value;
                newElement.alt = 'תמונה';
                newElement.style.objectFit = 'cover';
                break;
            case 'a':
                newElement.href = contentInput.value;
                newElement.textContent = 'קישור';
                newElement.style.textDecoration = 'none';
                newElement.style.color = '#0066cc';
                break;
            case 'ul':
                const items = contentInput.value.split(',');
                items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.trim();
                    newElement.appendChild(li);
                });
                break;
            default:
                newElement.textContent = contentInput.value;
        }
    }

    if (bgColorInput.value) {
        newElement.style.backgroundColor = bgColorInput.value;
    }

    if (fontSizeInput.value) {
        newElement.style.fontSize = fontSizeInput.value + 'px';
    }


    if (fontFamilyInput.value) {
        newElement.style.fontFamily = fontFamilyInput.value;
    }

    container.appendChild(newElement);

});

function resetFields() {
    elementSelect.selectedIndex = 0;
    widthInput.value = '';
    heightInput.value = '';
    contentInput.value = '';
    fontSizeInput.value = '';
    fontFamilyInput.selectedIndex = 0;
}

clearButton.addEventListener('click', () => {
    container.innerHTML = '';
});