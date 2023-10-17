// frontend/script.js

// Função para obter a data atual formatada
function getDataAtualFormatada() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
  
    return `${ano}-${mes}-${dia}`;
  }
  
  // Seleção dos elementos do DOM
  const condicaoSelect = document.getElementById('condicao');
  const alimentoSelect = document.getElementById('alimento');
  const dataInicialInput = document.getElementById('data-inicial');
  const calcularButton = document.getElementById('calcular');
  const resultadoDiv = document.getElementById('resultado');
  const alimentoPersonalizadoInput = document.getElementById('alimento-personalizado');
  
  // Definindo a data inicial como a data atual
  dataInicialInput.value = getDataAtualFormatada();
  
  // Verificação da existência dos elementos
  if (!condicaoSelect || !alimentoSelect || !dataInicialInput || !calcularButton || !resultadoDiv || !alimentoPersonalizadoInput) {
    console.error("Um ou mais elementos não foram encontrados.");
  }
  
  // Dicionário de alimentos por condição
  const alimentosPorCondicao = {
    'Refrigerado': [
        'Alimentos enlatados (Após Abertura da Embalagem)',
        'Alimentos pós-cocção',
        'Carnes (bovina, suína, aves, etc.)',
        'Carnes e frios enlatados (Após Abertura da Embalagem)',
        'Creme de leite fresco',
        'Folhosos e frutas sensíveis',
        'Maionese e misturas de maionese com outros alimentos',
        'Manteiga',
        'Ovos',
        'Outras frutas e legumes',
        'Pescados e seus produtos manipulados crus',
        'Pescados pós-cocção',
        'Queijos duros',
        'Queijos frescos ou macios',
        'Salsichas e conservados',
        'Sobremesas, frios e laticínios manipulados',
        'Sucos enlatados e engarrafados (Após Abertura da Embalagem)'
    ],
    'Congelado -10°C a -18°C': [
      'Alimentos enlatados (Após Abertura da Embalagem)',
      'Alimentos pós-cocção',
      'Carnes (bovina, suína, aves, etc.)',
      'Carnes e frios enlatados (Após Abertura da Embalagem)',
      'Creme de leite fresco',
      'frutas sensíveis',
      'Manteiga',
      'Ovos',
      'Outras frutas e legumes',
      'Pescados e seus produtos manipulados crus',
      'Pescados pós-cocção',
      'Queijos duros',
      'Queijos frescos ou macios',
      'Salsichas e conservados',
      'Sobremesas, frios e laticínios manipulados',
      'Sucos enlatados e engarrafados (Após Abertura da Embalagem)'
  ],
    'Congelado Temperatura menor que -18°C': [
      'Alimentos enlatados (Após Abertura da Embalagem)',
      'Alimentos pós-cocção',
      'Carnes (bovina, suína, aves, etc.)',
      'Carnes e frios enlatados (Após Abertura da Embalagem)',
      'Creme de leite fresco',
      'frutas sensíveis',
      'Manteiga',
      'Ovos',
      'Outras frutas e legumes',
      'Pescados e seus produtos manipulados crus',
      'Pescados pós-cocção',
      'Queijos duros',
      'Queijos frescos ou macios',
      'Salsichas e conservados',
      'Sobremesas, frios e laticínios manipulados',
      'Sucos enlatados e engarrafados (Após Abertura da Embalagem)'
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
  
  // Evento para atualizar as opções de alimentos com base na condição selecionada
  condicaoSelect.addEventListener('change', () => {
    const condicaoSelecionada = condicaoSelect.value;
    const alimentos = alimentosPorCondicao[condicaoSelecionada];
  
    alimentoSelect.innerHTML = '';
  
    alimentos.sort();
  
    alimentos.forEach(alimento => {
        const option = document.createElement('option');
        option.value = alimento;
        option.textContent = alimento;
        alimentoSelect.appendChild(option);
    });
  });
  
  // Inicialização das opções de alimentos com base na condição inicial selecionada
  condicaoSelect.dispatchEvent(new Event('change'));
  
  // Função para calcular a validade com base na condição e alimento selecionados
  const calcularValidade = () => {
    let tempoMaximoArmazenamento = 0;
    const condicaoSelecionada = condicaoSelect.value;
    const alimentoSelecionado = alimentoSelect.value;
  
    if (condicaoSelecionada === 'Refrigerado') {
        switch (alimentoSelecionado) {
          case 'Alimentos enlatados (Após Abertura da Embalagem)':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Alimentos pós-cocção':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Carnes (bovina, suína, aves, etc.)':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Carnes e frios enlatados (Após Abertura da Embalagem)':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Creme de leite fresco':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Folhosos e frutas sensíveis':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Maionese e misturas de maionese com outros alimentos':
              tempoMaximoArmazenamento = 1;
              break;
          case 'Manteiga':
              tempoMaximoArmazenamento = 14;
              break;
          case 'Outras frutas e legumes':
              tempoMaximoArmazenamento = 7;
              break;
          case 'Ovos':
              tempoMaximoArmazenamento = 14;
              break;
          case 'Pescados e seus produtos manipulados crus':
              tempoMaximoArmazenamento = 1;
              break;
          case 'Pescados pós-cocção':
              tempoMaximoArmazenamento = 1;
              break;
          case 'Queijos duros':
              tempoMaximoArmazenamento = 21;
              break;
          case 'Queijos frescos ou macios':
              tempoMaximoArmazenamento = 7;
              break;
          case 'Salsichas e conservados':
              tempoMaximoArmazenamento = 7;
              break;
          case 'Sobremesas, frios e laticínios manipulados':
              tempoMaximoArmazenamento = 1;
              break;
          case 'Sucos enlatados e engarrafados (Após Abertura da Embalagem)':
              tempoMaximoArmazenamento = 3;
              break;
          default:
              tempoMaximoArmazenamento = 0;
        }
    } else if (condicaoSelecionada === 'Congelado -10°C a -18°C') {
        tempoMaximoArmazenamento = 30;
    } else if (condicaoSelecionada === 'Congelado Temperatura menor que -18°C') {
        tempoMaximoArmazenamento = 90;
    } else if (condicaoSelecionada === 'Seco (Após Abertura da Embalagem)') {
        switch (alimentoSelecionado) {
          case 'Açúcar':
              tempoMaximoArmazenamento = 30;
              break;
          case 'Alimentos enlatados':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Bicarbonato de sódio':
              tempoMaximoArmazenamento = 30;
              break;
          case 'Carnes e frios enlatados':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Farinhas':
              tempoMaximoArmazenamento = 30;
              break;
          case 'Fermento químico em pó':
              tempoMaximoArmazenamento = 30;
              break;
          case 'Sal':
              tempoMaximoArmazenamento = 30;
              break;
          case 'Sucos enlatados e engarrafados':
              tempoMaximoArmazenamento = 3;
              break;
          case 'Temperos em pó':
              tempoMaximoArmazenamento = 30;
              break;
        }
    }
    return tempoMaximoArmazenamento;
  };
  
  // Função para lidar com o cálculo da validade e exibir o resultad
  const handleCalculate = () => {
    const selectedFood = alimentoSelect.value;
    let selectedCondition = condicaoSelect.value;
  
    if (!dataInicialInput.value) {
        alert('Erro: Por favor, selecione a data de fabricação antes de imprimir a etiqueta.');
        return;
    }
  
    if (!selectedFood || selectedFood === 'Selecione um produto') {
        alert('Erro: Por favor, selecione um produto antes de imprimir a etiqueta.');
        return;
    }
  
    const calculatedExpiryDate = calcularValidade();
    if (calculatedExpiryDate === 0) {
        alert('Erro: Regras de validade não definidas para o produto e condição selecionados.');
        return;
    }
  
    let newConditionForDisplay = selectedCondition; // Inicialize a nova variável com o valor atual
  
    if (selectedCondition === 'Seco (Após Abertura da Embalagem)' &&
        (selectedFood === 'Alimentos enlatados' ||
            selectedFood === 'Carnes e frios enlatados' ||
            selectedFood === 'Sucos enlatados e engarrafados')) {
        newConditionForDisplay = 'Refrigerado (Após a abertura da embalagem)';
    }
  
    if (selectedCondition === 'Refrigerado' &&
        (selectedFood === 'Alimentos enlatados' ||
            selectedFood === 'Carnes e frios enlatados' ||
            selectedFood === 'Sucos enlatados e engarrafados')) {
        newConditionForDisplay = 'Refrigerado (Após a abertura da embalagem)';
    }
  
  
    const dataInicial = new Date(dataInicialInput.value + "T00:00");
    const dataValidade = new Date(dataInicial);
    dataValidade.setDate(dataValidade.getDate() + calculatedExpiryDate);
  
    resultadoDiv.innerHTML = `
        <div class="etiqueta">
            <p>Produto: <span class="highlight">${selectedFood}</span></p>
            <p>Armazenamento: <span class="highlight">${newConditionForDisplay}</span></p>
            <p>Fabricação: <span class="highlight">${dataInicial.toLocaleDateString()}</span></p>
            <p>Validade: <span class="highlight">${dataValidade.toLocaleDateString()}</span></p>
        </div>
    `;
  };
  
  // Evento para o botão de calcular
  calcularButton.addEventListener('click', handleCalculate);
  