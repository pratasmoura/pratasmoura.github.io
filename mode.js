// Seleciona o botão de alternância e o corpo do documento
const themeToggleButton = document.getElementById('theme-toggle');
const bodyElement = document.body;

// Função para alternar entre os modos e os ícones
themeToggleButton.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    
    // Verifica o modo atual e troca o ícone
    if (bodyElement.classList.contains('dark-mode')) {
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Modo escuro, ícone de lua
    } else {
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Modo claro, ícone de sol
    }
});
// Função para ativar o zoom
function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);

    /* Cria a lente de zoom */
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    img.parentElement.insertBefore(lens, img);

    /* Calcula a proporção entre o tamanho da lente e a área de zoom */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

    /* Exibe a lente e o resultado ao passar o mouse */
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("touchmove", moveLens);

    lens.style.visibility = 'visible';  // Exibe a lente ao mover o mouse
    result.style.visibility = 'visible';  // Exibe a área de zoom ao mover o mouse

    function moveLens(e) {
        var pos, x, y;
        e.preventDefault();
        pos = getCursorPos(e);
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = (e || window.event);
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}




