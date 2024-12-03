// Função para adicionar produtos ao carrinho
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verifica se o produto já existe no carrinho
    let item = cart.find(item => item.name === productName);
    
    if (item) {
        item.quantity += 1; // Aumenta a quantidade se o item já está no carrinho
    } else {
        // Adiciona o produto ao carrinho com quantidade inicial de 1
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Atualiza o contador do carrinho
    updateCartCount();
    
    alert('Produto adicionado ao carrinho!');
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = itemCount;
}

// Carregar o contador ao abrir qualquer página
document.addEventListener('DOMContentLoaded', updateCartCount);

// Função para carregar o carrinho na página do carrinho
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.querySelector('#cart-items tbody');
    cartTable.innerHTML = ""; // Limpa a tabela antes de carregar os itens
    let totalPrice = 0;

    cart.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>R$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>R$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartTable.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Função para finalizar a compra
function finalizePurchase() {
    alert('Compra finalizada!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

// Carrega o carrinho ao abrir a página carrinho.html
if (window.location.pathname.endsWith('carrinho.html')) {
    document.addEventListener('DOMContentLoaded', loadCart);
}
