// Banco de dados simulado
const db = {
    users: [
        { id: 1, name: "Usuário Teste", email: "teste@teste.com", password: "123456" }
    ],
    products: [
        {
            id: 1,
            title: "God of War Ragnarök",
            price: 299.90,
            description: "Kratos e Atreus embarcam em uma jornada mítica em busca de respostas e preparação para o Ragnarök.",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png"
        },
        {
            id: 2,
            title: "Horizon Forbidden West",
            price: 249.90,
            description: "Explore terras distantes, enfrente máquinas maiores e mais imponentes e descubra incríveis tribos.",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/HO8vkO9pfXhwbHi5WHECQJdN.png"
        },
        {
            id: 3,
            title: "Spider-Man 2",
            price: 349.90,
            description: "Peter Parker e Miles Morales enfrentam o maior desafio de suas vidas contra o Venom.",
            image: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3ac155247e21850c7d075d01ebf0f3f5dbf19ccd2a1.jpg"
        },
        {
            id: 4,
            title: "Final Fantasy XVI",
            price: 329.90,
            description: "Uma nova história de fantasia sombria no universo de Final Fantasy.",
            image: "https://cdn.awsli.com.br/2500x2500/0/810/produto/22108855768d09d7c04.jpg"
        },
        {
            id: 5,
            title: "Demon's Souls",
            price: 279.90,
            description: "O aclamado jogo de RPG de ação ganha vida com detalhes incríveis e desempenho impressionante.",
            image: "https://m.media-amazon.com/images/I/81f8vt8oJbL.__AC_SX300_SY300_QL70_ML2_.jpg"
        },
        {
            id: 6,
            title: "Ratchet & Clank: Rift Apart",
            price: 269.90,
            description: "Atravesse dimensões com Ratchet e Clank em sua mais nova aventura intergaláctica.",
            image: "https://i5.walmartimages.com/seo/Ratchet-Clank-Rift-Apart-PlayStation-5_c5b680bd-5223-4815-9902-ff1fb5ae1682.c5f859188162f66a01ad9e8dfd2dae4e.jpeg"
        }
    ],
    cart: []
};

// Estado da aplicação
let currentUser = null;
let isLoginMode = true;

// Elementos do DOM
const authSection = document.getElementById('authSection');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const authModal = document.getElementById('authModal');
const modalTitle = document.getElementById('modalTitle');
const closeModal = document.getElementById('closeModal');
const authForm = document.getElementById('authForm');
const nameGroup = document.getElementById('nameGroup');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitAuthBtn = document.getElementById('submitAuthBtn');
const toggleAuth = document.getElementById('toggleAuth');
const productsSection = document.getElementById('productsSection');
const cartSection = document.getElementById('cartSection');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const messageContainer = document.getElementById('messageContainer');

// Event Listeners
loginBtn.addEventListener('click', () => openAuthModal(true));
registerBtn.addEventListener('click', () => openAuthModal(false));
closeModal.addEventListener('click', closeAuthModal);
toggleAuth.addEventListener('click', toggleAuthMode);
authForm.addEventListener('submit', handleAuthSubmit);
checkoutBtn.addEventListener('click', checkout);

// Funções
function openAuthModal(isLogin) {
    isLoginMode = isLogin;
    modalTitle.textContent = isLogin ? 'Login' : 'Registrar';
    nameGroup.style.display = isLogin ? 'none' : 'block';
    submitAuthBtn.textContent = isLogin ? 'Entrar' : 'Registrar';
    toggleAuth.textContent = isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login';
    authModal.style.display = 'flex';
}

function closeAuthModal() {
    authModal.style.display = 'none';
    authForm.reset();
    document.querySelectorAll('.text-danger').forEach(el => el.style.display = 'none');
}

function toggleAuthMode(e) {
    e.preventDefault();
    openAuthModal(!isLoginMode);
}

function handleAuthSubmit(e) {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.text-danger').forEach(el => el.style.display = 'none');
    
    // Validação
    let isValid = true;
    
    if (!isLoginMode && !nameInput.value.trim()) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    
    if (!emailInput.value.trim()) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    if (!passwordInput.value.trim()) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Processar autenticação
    if (isLoginMode) {
        login();
    } else {
        register();
    }
}

function login() {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    const user = db.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        closeAuthModal();
        updateUI();
        showMessage('Login realizado com sucesso!', 'success');
    } else {
        showMessage('Email ou senha incorretos', 'danger');
    }
}

function register() {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Verificar se email já existe
    if (db.users.some(u => u.email === email)) {
        showMessage('Este email já está em uso', 'danger');
        return;
    }
    
    // Criar novo usuário
    const newUser = {
        id: db.users.length + 1,
        name,
        email,
        password
    };
    
    db.users.push(newUser);
    currentUser = newUser;
    closeAuthModal();
    updateUI();
    showMessage('Conta criada com sucesso!', 'success');
}

function logout() {
    currentUser = null;
    updateUI();
    showMessage('Você foi desconectado', 'success');
}

function updateUI() {
    if (currentUser) {
        authSection.innerHTML = `
            <div class="user-info">
                <div class="user-avatar">${currentUser.name.charAt(0)}</div>
                <span>${currentUser.name}</span>
                <button class="logout-btn" id="logoutBtn">Sair</button>
            </div>
        `;
        document.getElementById('logoutBtn').addEventListener('click', logout);
        cartSection.style.display = 'block';
    } else {
        authSection.innerHTML = `
            <button class="btn btn-outline" id="loginBtn">Login</button>
            <button class="btn btn-primary" id="registerBtn">Registrar</button>
        `;
        document.getElementById('loginBtn').addEventListener('click', () => openAuthModal(true));
        document.getElementById('registerBtn').addEventListener('click', () => openAuthModal(false));
        cartSection.style.display = 'none';
    }
    
    renderProducts();
    renderCart();
}

function renderProducts() {
    productsSection.innerHTML = '';
    
    db.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsSection.appendChild(productCard);
    });
    
    // Adicionar eventos aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(e) {
    if (!currentUser) {
        showMessage('Você precisa estar logado para adicionar itens ao carrinho', 'danger');
        openAuthModal(true);
        return;
    }
    
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = db.products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = db.cart.find(item => item.product.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        db.cart.push({
            product,
            quantity: 1
        });
    }
    
    renderCart();
    showMessage(`${product.title} foi adicionado ao carrinho`, 'success');
}

function removeFromCart(productId) {
    const itemIndex = db.cart.findIndex(item => item.product.id === productId);
    
    if (itemIndex !== -1) {
        db.cart.splice(itemIndex, 1);
        renderCart();
        showMessage('Item removido do carrinho', 'success');
    }
}

function renderCart() {
    cartItems.innerHTML = '';
    
    if (db.cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        return;
    }
    
    let total = 0;
    
    db.cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-image">
                <div>
                    <h4 class="cart-item-title">${item.product.title}</h4>
                    <p>Quantidade: ${item.quantity}</p>
                </div>
            </div>
            <div>
                <p class="cart-item-price">R$ ${itemTotal.toFixed(2)}</p>
                <button class="remove-item" data-id="${item.product.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    // Adicionar eventos aos botões de remover
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

function checkout() {
    if (db.cart.length === 0) {
        showMessage('Seu carrinho está vazio', 'danger');
        return;
    }
    
    // Simular processamento de compra
    showMessage('Compra realizada com sucesso! Obrigado por comprar conosco.', 'success');
    
    // Limpar carrinho
    db.cart = [];
    renderCart();
}

function showMessage(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    messageContainer.innerHTML = '';
    messageContainer.appendChild(alert);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Inicializar
updateUI();