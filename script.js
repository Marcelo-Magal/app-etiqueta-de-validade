// frontend/script.js

function getDataAtualFormatada() {
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, '0');
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 (janeiro) a 11 (dezembro), então adicionamos 1.
  const ano = dataAtual.getFullYear();

  return `${ano}-${mes}-${dia}`;
}


const condicaoSelect = document.getElementById('condicao');
const alimentoSelect = document.getElementById('alimento');
const dataInicialInput = document.getElementById('data-inicial');
const calcularButton = document.getElementById('calcular');
const resultadoDiv = document.getElementById('resultado');
const alimentoPersonalizadoInput = document.getElementById('alimento-personalizado');

dataInicialInput.value = getDataAtualFormatada();

if (!condicaoSelect || !alimentoSelect || !dataInicialInput || !calcularButton || !resultadoDiv || !alimentoPersonalizadoInput) {
  console.error("Um ou mais elementos não foram encontrados.");
}


const alimentosPorCondicao = {
  'Refrigerado': [
    'Alimentos enlatados',
    'Alimentos pós-cocção',
    'Carnes (bovina, suína, aves, etc.)',
    'Carnes e frios enlatados',
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
    'Sucos enlatados e engarrafados'

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

const calcularValidade = () => {
  let tempoMaximoArmazenamento = 0;
  const condicaoSelecionada = condicaoSelect.value;
  const alimentoSelecionado = alimentoSelect.value;

  // Definindo as regras de validade baseadas na condição e no alimento selecionados
  if (condicaoSelecionada === 'Refrigerado') {
    switch (alimentoSelecionado) {
      case 'Pescados e seus produtos manipulados crus':
        tempoMaximoArmazenamento = 1;
        break;
      case 'Carnes (bovina, suína, aves, etc.)':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Sobremesas, frios e laticínios manipulados':
        tempoMaximoArmazenamento = 1;
        break;
      case 'Salsichas e conservados':
        tempoMaximoArmazenamento = 7;
        break;
      case 'Folhosos e frutas sensíveis':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Outras frutas e legumes':
        tempoMaximoArmazenamento = 7;
        break;
      case 'Alimentos pós-cocção':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Pescados pós-cocção':
        tempoMaximoArmazenamento = 1;
        break;
      case 'Ovos':
        tempoMaximoArmazenamento = 14;
        break;
      case 'Manteiga':
        tempoMaximoArmazenamento = 14;
        break;
      case 'Creme de leite fresco':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Queijos duros':
        tempoMaximoArmazenamento = 21;
        break;
      case 'Queijos frescos ou macios':
        tempoMaximoArmazenamento = 7;
        break;
      case 'Maionese e misturas de maionese com outros alimentos':
        tempoMaximoArmazenamento = 1;
        break;
      case 'Alimentos enlatados':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Carnes e frios enlatados':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Sucos enlatados e engarrafados':
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
      case 'Alimentos enlatados':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Carnes e frios enlatados':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Farinhas':
        tempoMaximoArmazenamento = 30;
        break;
      case 'Sucos enlatados e engarrafados':
        tempoMaximoArmazenamento = 3;
        break;
      case 'Temperos em pó':
        tempoMaximoArmazenamento = 30;
        break;
      case 'Sal':
        tempoMaximoArmazenamento = 30;
        break;
      case 'Açúcar':
        tempoMaximoArmazenamento = 30;
        break;
      case 'Fermento químico em pó':
        tempoMaximoArmazenamento = 30;
        break;
      case 'Bicarbonato de sódio':
        tempoMaximoArmazenamento = 30;
        break;
      default:
        tempoMaximoArmazenamento = 0;
    }
  }
  return tempoMaximoArmazenamento;    
};

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
        <p>Armazenamento: <span class="highlight">${selectedCondition}</span></p>
        <p>Fabricação: <span class="highlight">${dataInicial.toLocaleDateString()}</span></p>
        <p>Validade: <span class="highlight">${dataValidade.toLocaleDateString()}</span></p>
    </div>
`;
};  

calcularButton.addEventListener('click', handleCalculate);