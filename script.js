// frontend/script.js
const condicaoSelect = document.getElementById('condicao');
const alimentoSelect = document.getElementById('alimento');
const dataInicialInput = document.getElementById('data-inicial');
const calcularButton = document.getElementById('calcular');
const resultadoDiv = document.getElementById('resultado');

const alimentosPorCondicao = {
  'Refrigerado': [
    'Pescados e seus produtos manipulados crus',
    'Carnes (bovina, suína, aves, etc.)',
    'Sobremesas, frios e laticínios manipulados',
    'Salsichas e conservados',
    'Folhosos e frutas sensíveis',
    'Outras frutas e legumes',
    'Alimentos pós-cocção',
    'Pescados pós-cocção',
    'Ovos',
    'Manteiga',
    'Creme de leite fresco',
    'Queijos duros',
    'Queijos frescos ou macios',
    'Maionese e misturas de maionese com outros alimentos'
  ],
  'Congelado -10°C a -18°C': [
    'Todos os alimentos'
  ],
  'Congelado Temperatura menor que -18°C': [
    'Todos os alimentos'
  ],
  'Seco (Após Abertura da Embalagem)': [
    'Alimentos enlatados',
    'Carnes e frios enlatados',
    'Farinhas',
    'Sucos enlatados e engarrafados',
    'Temperos em pó',
    'Sal',
    'Açúcar',
    'Fermento químico em pó',
    'Bicarbonato de sódio'
  ]
};

condicaoSelect.addEventListener('change', () => {
  const condicaoSelecionada = condicaoSelect.value;
  const alimentos = alimentosPorCondicao[condicaoSelecionada];

  // Limpar as opções de alimentos existentes
  alimentoSelect.innerHTML = '';

  // Mostrar o campo de entrada personalizado para alimentos congelados e esconder o select de alimentos
  const alimentoPersonalizadoInput = document.getElementById('alimento-personalizado');
  if (condicaoSelecionada.includes('Congelado')) {
    alimentoSelect.style.display = 'none';
    alimentoPersonalizadoInput.style.display = 'block';
  } else {
    alimentoSelect.style.display = 'block';
    alimentoPersonalizadoInput.style.display = 'none';
  }

  // Ordenar os alimentos em ordem alfabética
  alimentos.sort();

  // Adicionar os alimentos ordenados como opções para o select de alimentos
  alimentos.forEach(alimento => {
    const option = document.createElement('option');
    option.value = alimento;
    option.textContent = alimento;
    alimentoSelect.appendChild(option);
  });
});

// Inicializar as opções de alimentos com base na condição inicial selecionada
condicaoSelect.dispatchEvent(new Event('change'));

calcularButton.addEventListener('click', () => {
  const condicaoSelecionada = condicaoSelect.value;
  const alimentoPersonalizadoInput = document.getElementById('alimento-personalizado');
  const alimentoSelecionado = alimentoPersonalizadoInput.style.display === 'block' ? alimentoPersonalizadoInput.value : alimentoSelect.value;
  
  let tempoMaximoArmazenamento = 0;

  // Definindo as regras de validade baseadas na condição e no alimento selecionados
  if (condicaoSelecionada === 'Refrigerado') {
    if (alimentoSelecionado === 'Pescados e seus produtos manipulados crus') {
      tempoMaximoArmazenamento = 1;
    } else if (alimentoSelecionado === 'Carnes (bovina, suína, aves, etc.)') {
      tempoMaximoArmazenamento = 3;
    } else if (alimentoSelecionado === 'Sobremesas, frios e laticínios manipulados') {
      tempoMaximoArmazenamento = 1;
    } else if (alimentoSelecionado === 'Salsichas e conservados') {
      tempoMaximoArmazenamento = 7;
    } else if (alimentoSelecionado === 'Folhosos e frutas sensíveis') {
      tempoMaximoArmazenamento = 3;
    } else if (alimentoSelecionado === 'Outras frutas e legumes') {
      tempoMaximoArmazenamento = 7;
    } else if (alimentoSelecionado === 'Alimentos pós-cocção') {
      tempoMaximoArmazenamento = 3;
    } else if (alimentoSelecionado === 'Pescados pós-cocção') {
      tempoMaximoArmazenamento = 1;
    } else if (alimentoSelecionado === 'Ovos') {
      tempoMaximoArmazenamento = 14;
    } else if (alimentoSelecionado === 'Manteiga') {
      tempoMaximoArmazenamento = 14;
    } else if (alimentoSelecionado === 'Creme de leite fresco') {
      tempoMaximoArmazenamento = 3;
    } else if (alimentoSelecionado === 'Queijos duros') {
      tempoMaximoArmazenamento = 21;
    } else if (alimentoSelecionado === 'Queijos frescos ou macios') {
      tempoMaximoArmazenamento = 7;
    } else if (alimentoSelecionado === 'Maionese e misturas de maionese com outros alimentos') {
      tempoMaximoArmazenamento = 1;
    }
  } else if (condicaoSelecionada === 'Congelado -10°C a -18°C') {
    tempoMaximoArmazenamento = 30;
  } else if (condicaoSelecionada === 'Congelado Temperatura menor que -18°C') {
    tempoMaximoArmazenamento = 90;
  } else if (condicaoSelecionada === 'Seco (Após Abertura da Embalagem)') {
    if (alimentoSelecionado === 'Alimentos enlatados') {
      tempoMaximoArmazenamento = 3;
    } else if (alimentoSelecionado === 'Carnes e frios enlatados') {
      tempoMaximoArmazenamento = 3;
    } else if (alimentoSelecionado === 'Farinhas') {
      tempoMaximoArmazenamento = 30;
    } else if (alimentoSelecionado === 'Sucos enlatados e engarrafados') {
      tempoMaximoArmazenamento = 3;
    } else if (alimentoSelecionado === 'Temperos em pó') {
      tempoMaximoArmazenamento = 30;
    } else if (alimentoSelecionado === 'Sal') {
      tempoMaximoArmazenamento = 30;
    } else if (alimentoSelecionado === 'Açúcar') {
      tempoMaximoArmazenamento = 30;
    } else if (alimentoSelecionado === 'Fermento químico em pó') {
      tempoMaximoArmazenamento = 30;
    } else if (alimentoSelecionado === 'Bicarbonato de sódio') {
      tempoMaximoArmazenamento = 30;
    }
  }

  if (tempoMaximoArmazenamento === 0) {
    resultadoDiv.textContent = 'Regras de validade não definidas para o alimento e condição selecionados.';
  } else {
    const dataInicial = new Date(dataInicialInput.value + "T00:00");
    const dataValidade = new Date(dataInicial);
    dataValidade.setDate(dataValidade.getDate() + tempoMaximoArmazenamento);
  
    resultadoDiv.innerHTML = `
      <div class="etiqueta">
        <p>Produto: ${alimentoSelecionado}</p>
        <p>${condicaoSelecionada}</p>
        <p>Fabricação: ${dataInicial.toLocaleDateString()}</p>
        <p>Validade: ${dataValidade.toLocaleDateString()}</p>
      </div>
    `;
  }
});