// js para botão do menu lateral
document.getElementById('toggleMenu').addEventListener('click', function() {
  // Seleciona o elemento da barra lateral pelo id 'sidebar'
  const sidebar = document.getElementById('sidebar');
  // Verifica se a barra lateral está visível
  if (sidebar.style.display === 'block') {
      // Se estiver visível, oculta a barra lateral
      sidebar.style.display = 'none';
  } else {
      // Se estiver oculta, mostra a barra lateral
      sidebar.style.display = 'block';
  }
});

// js para controle do carrossel de imagens
$(document).ready(function () {
  // Inicializa o índice atual do carrossel e define os elementos do carrossel
  let currentIndex = 0;
  const items = $(".carousel-item");
  const itemAmt = items.length;
  const displayAmt = 3; // Quantidade de imagens exibidas ao mesmo tempo

  // Função para atualizar os itens visíveis no carrossel
  function cycleItems() {
    // Oculta todos os itens
    items.hide();
    // Mostra os itens baseados no índice atual e na quantidade de itens exibidos
    for (let i = currentIndex; i < currentIndex + displayAmt; i++) {
      const itemIndex = i % itemAmt;
      $(".carousel-item").eq(itemIndex).css("display", "block");
    }
  }

  // Evento de clique para o botão "Próximo"
  $(".next").click(function () {
    // Atualiza o índice atual para o próximo conjunto de itens
    currentIndex += displayAmt;
    cycleItems();
  });

  // Evento de clique para o botão "Anterior"
  $(".prev").click(function () {
    // Atualiza o índice atual para o conjunto anterior de itens
    currentIndex -= displayAmt;
    if (currentIndex < 0) {
      currentIndex = itemAmt - displayAmt;
    }
    cycleItems();
  });

  // Inicializa o carrossel mostrando os itens iniciais
  cycleItems();
});
