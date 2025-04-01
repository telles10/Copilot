// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: "Pizza Marguerita",
        preco: 45.90,
        categoria: "pizzas",
        imagem: "https://cdn.bolivia.com/gastronomia/2011/08/25/pizza-margarita-3684.jpg",
        descricao: "Manjericão, mussarela, tomate"
    },
    {
        id: 2,
        nome: "Pizza brasileira",
        preco: 49.90,
        categoria: "pizzas",
        imagem: "https://th.bing.com/th/id/R.dc162a7d747a276340b103138ff5de68?rik=kNp6H2gdiFJ9UA&pid=ImgRaw&r=0",
        descricao: "Atum, milho, calabresa, catupiry"
    },
    {
        id: 3,
        nome: "Pizza Portuguesa",
        preco: 47.90,
        categoria: "pizzas",
        imagem: "https://th.bing.com/th/id/OIP.EcAi9LnVlWF_Az3f5CfiIAHaEo?rs=1&pid=ImgDetMain",
        descricao: "Mussarela, presunto, ovos, cebola, ervilha"
    },

    {
        id: 10,
        nome: "Pizza quatro queijos",
        preco: 51.90,
        categoria: "pizzas",
        imagem: "https://th.bing.com/th/id/R.b28a3a8d1c302ad6a8fc7275e2e31a40?rik=EgmwoQaaynz77Q&pid=ImgRaw&r=0&sres=1&sresct=1",
        descricao: "Parmesão, Catupiry, Provolone, mussarela" 
    

    },

    {
        id: 7,
        nome: "Pizza de strogonoff",
        preco: 54.90,
        categoria: "pizzas",
        imagem: "https://th.bing.com/th/id/OIP.JbUeV186kB6zMBFxO--2kgHaE7?rs=1&pid=ImgDetMain",
        descricao: "Stroganoff de carne, mussarela, batata palha" 
    },

    {
        id: 8,
        nome: "Pizza de frango com catupiry",
        preco: 57.90,
        categoria: "pizzas",
        imagem: "https://www.cenariomt.com.br/wp-content/uploads/2024/05/Pizza-de-frango-com-catupiry.jpg",
        descricao: "Frango desfiado, catupiry, cebola" 




    },
    {
        id: 4,
        nome: "Fanta 2L",
        preco: 8.90,
        categoria: "bebidas",
        imagem: "https://th.bing.com/th/id/OIP.1aDyQDjgS0UTh9G1BF5s5QHaHa?rs=1&pid=ImgDetMain",
        descricao: "Refrigerante Fanta 2 litros"
    },
    {
        id: 5,
        nome: "Sprite 2L",
        preco: 7.90,
        categoria: "bebidas",
        imagem: "https://cdn.shopify.com/s/files/1/0372/6920/9219/products/SPRITE2L_800x.png?v=1622198416",
        descricao: "Refrigerante Sprite 2 litros"
    },
    {
        id: 6,
        nome: "Coca-Cola 2L",
        preco: 12.90,
        categoria: "bebidas",
        imagem: "https://farmafy.com.br/uploads/product/1/siaSNGoMtxz0aHcwiQEF3dyuLOnasJzE.jpeg",
        descricao: "Refrigerante Coca-Cola 2 litros"
    }
];

// Carrinho de compras
let carrinho = [];

// Função para renderizar produtos
function renderizarProdutos(categoria = 'todos') {
    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = '';

    const produtosFiltrados = categoria === 'todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === categoria);

    produtosFiltrados.forEach(produto => {
        produtosContainer.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-img-wrapper ${produto.categoria === 'bebidas' ? 'bebida-wrapper' : ''}">
                        <img src="${produto.imagem}" 
                             class="card-img-top ${produto.categoria === 'bebidas' ? 'bebida-img' : ''}" 
                             alt="${produto.nome}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">${produto.descricao}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="h5 mb-0">R$ ${produto.preco.toFixed(2)}</span>
                            <button class="btn btn-danger" onclick="adicionarAoCarrinho(${produto.id})">
                                <i class="fas fa-cart-plus"></i> Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// Funções do carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemNoCarrinho = carrinho.find(item => item.id === id);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    const badgeElement = document.querySelector('.badge');

    carrinhoContainer.innerHTML = '';
    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

        carrinhoContainer.innerHTML += `
            <div class="cart-item mb-3">
                <div class="d-flex align-items-center">
                    <img src="${item.imagem}" class="cart-item-image rounded me-3" alt="${item.nome}" style="width: 60px; height: 60px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.nome}</h6>
                        <div class="d-flex align-items-center mt-2">
                            <button class="btn btn-sm btn-outline-secondary" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                            <span class="mx-2">${item.quantidade}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="ms-auto text-end">
                        <span class="d-block">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                        <button class="btn btn-sm btn-danger mt-2" onclick="removerDoCarrinho(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = '<p class="text-center text-muted">Seu carrinho está vazio</p>';
    }

    totalElement.textContent = total.toFixed(2);
    badgeElement.textContent = quantidadeTotal || '';
}

function alterarQuantidade(id, delta) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        item.quantidade += delta;
        if (item.quantidade <= 0) {
            removerDoCarrinho(id);
        } else {
            atualizarCarrinho();
        }
    }
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}

// Adicione esta função para validar o formulário
function validateForm() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const pagamento = document.getElementById('pagamento').value;
    const troco = document.getElementById('troco');
    const submitButton = document.getElementById('submitButton');

    // Verifica se todos os campos obrigatórios estão preenchidos
    const isValid = nome && telefone && rua && numero && bairro && pagamento;
    
    // Validação adicional para pagamento em dinheiro
    const isDinheiroValid = pagamento === 'dinheiro' ? troco.value && Number(troco.value) > 0 : true;

    // Habilita/desabilita o botão de envio
    submitButton.disabled = !(isValid && isDinheiroValid);
}

// Add these new functions
function saveCustomerData(formData) {
    localStorage.setItem('customerData', JSON.stringify(formData));
}

function loadCustomerData() {
    const savedData = localStorage.getItem('customerData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('nome').value = formData.nome || '';
        document.getElementById('telefone').value = formData.telefone || '';
        document.getElementById('rua').value = formData.rua || '';
        document.getElementById('numero').value = formData.numero || '';
        document.getElementById('complemento').value = formData.complemento || '';
        document.getElementById('bairro').value = formData.bairro || '';
        document.getElementById('referencia').value = formData.referencia || '';
        
        // Validate form after loading data
        validateForm();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza todos os produtos inicialmente
    renderizarProdutos();

    // Adiciona event listeners para os botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active ao botão clicado
            button.classList.add('active');
            // Renderiza os produtos filtrados
            renderizarProdutos(button.getAttribute('data-filter'));
        });
    });

    // Listener para formulário de contato
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        e.target.reset();
    });

    // Atualizar o event listener do botão "Finalizar Pedido"
    document.querySelector('.offcanvas-body .btn-warning').addEventListener('click', () => {
        if (carrinho.length > 0) {
            const modal = new bootstrap.Modal(document.getElementById('checkoutModal'));
            modal.show();
            loadCustomerData(); // Load saved data when modal opens
        } else {
            alert('Adicione itens ao carrinho primeiro!');
        }
    });

    // Adiciona validação para todos os campos do formulário
    const formFields = ['nome', 'telefone', 'rua', 'numero', 'bairro', 'pagamento', 'troco'];
    formFields.forEach(field => {
        document.getElementById(field)?.addEventListener('input', validateForm);
    });

    // Atualiza validação quando a forma de pagamento muda
    document.getElementById('pagamento')?.addEventListener('change', (e) => {
        const trocoGroup = document.getElementById('troco-group');
        const trocoInput = document.getElementById('troco');

        if (e.target.value === 'dinheiro') {
            trocoGroup.classList.remove('d-none');
            trocoInput.required = true;
        } else {
            trocoGroup.classList.add('d-none');
            trocoInput.required = false;
            trocoInput.value = '';
        }
        validateForm();
    });

    // Processar o formulário de checkout
    document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!e.target.checkValidity()) {
            e.stopPropagation();
            return;
        }

        // Coletar dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            rua: document.getElementById('rua').value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            bairro: document.getElementById('bairro').value,
            referencia: document.getElementById('referencia').value,
            pagamento: document.getElementById('pagamento').value,
            troco: document.getElementById('troco').value
        };

        // Save customer data to localStorage
        saveCustomerData(formData);

        // Preparar mensagem para WhatsApp
        let mensagem = `🍕 *Novo Pedido - YakiPizza* 🍕\n\n`;
        mensagem += `*Cliente:* ${formData.nome}\n`;
        mensagem += `*Telefone:* ${formData.telefone}\n\n`;
        mensagem += `*Endereço de Entrega:*\n`;
        mensagem += `${formData.rua}, ${formData.numero}\n`;
        mensagem += formData.complemento ? `Complemento: ${formData.complemento}\n` : '';
        mensagem += `Bairro: ${formData.bairro}\n`;
        mensagem += formData.referencia ? `Referência: ${formData.referencia}\n\n` : '\n';
        mensagem += `*Pedido:*\n`;
        
        // Adicionar itens do carrinho
        carrinho.forEach(item => {
            mensagem += `▫️ ${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
        });

        mensagem += `\n*Total: R$ ${document.getElementById('cart-total').textContent}*\n\n`;
        mensagem += `*Forma de Pagamento:* ${formData.pagamento.toUpperCase()}`;
        if (formData.pagamento === 'dinheiro' && formData.troco) {
            mensagem += `\nTroco para: R$ ${formData.troco}`;
        }

        // Codificar mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Número do WhatsApp da pizzaria atualizado
        const numeroWhatsApp = '5514996245757'; // Formatado para padrão internacional
        
        // Criar link do WhatsApp e redirecionar
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
        window.open(linkWhatsApp, '_blank');

        // Limpar carrinho e fechar modal
        carrinho = [];
        atualizarCarrinho();
        bootstrap.Modal.getInstance(document.getElementById('checkoutModal')).hide();
    });
});