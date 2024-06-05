// js botão barra lateral
document.getElementById('toggleMenu').addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.style.display === 'block') {
      sidebar.style.display = 'none';
  } else {
      sidebar.style.display = 'block';
  }
});

// js carousel
$(document).ready(function () {
  let currentIndex = 0;
  const items = $(".carousel-item");
  const itemAmt = items.length;
  const displayAmt = 3; // Quantidade de imagens exibidas

  function cycleItems() {
    items.hide();
    for (let i = currentIndex; i < currentIndex + displayAmt; i++) {
      const itemIndex = i % itemAmt;
      $(".carousel-item").eq(itemIndex).css("display", "block");
    }
  }

  $(".next").click(function () {
    currentIndex += displayAmt;
    cycleItems();
  });

  $(".prev").click(function () {
    currentIndex -= displayAmt;
    if (currentIndex < 0) {
      currentIndex = itemAmt - displayAmt;
    }
    cycleItems();
  });

  cycleItems();
});