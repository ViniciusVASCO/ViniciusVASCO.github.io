// script.js - versão melhorada

// Dados do intérprete (simulando um banco de dados)
const interpretes = [
    {
      id: 1,
      nome: "Maria Souza",
      niveis: ["básico", "intermediário"],
      periodos: ["manhã", "tarde"],
      tipoEnsino: ["online", "gravado"],
      diasDisponiveis: ["segunda", "quarta", "sexta"],
      modalidade: ["individual", "grupo"]
    },
    // Adicione mais intérpretes conforme necessário
  ];
  
  // Carrega os dados do intérprete selecionado (simulação)
  function carregarInterprete(id) {
    const interprete = interpretes.find(i => i.id === id) || interpretes[0];
    
    document.getElementById('nome-int').textContent = interprete.nome;
    document.getElementById('nivel-int').textContent = interprete.niveis.join(", ");
    document.getElementById('periodos-int').textContent = interprete.periodos.join(", ");
    document.getElementById('ensino-int').textContent = interprete.tipoEnsino.join(", ");
    document.getElementById('datas-int').textContent = interprete.diasDisponiveis.join(", ");
  }
  
  // Seleção de formato de aula
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById("opt-online")) {
      document.getElementById("opt-online").addEventListener("click", function() {
        document.getElementById("formato").value = "online";
        selecionarFormato("opt-online");
      });
      
      document.getElementById("opt-videos").addEventListener("click", function() {
        document.getElementById("formato").value = "gravado";
        selecionarFormato("opt-videos");
      });
    }
  
    // Validação do formulário de agendamento
    if (document.getElementById('agendamento-form')) {
      document.getElementById('agendamento-form').addEventListener('submit', validarAgendamento);
    }
  });
  
  function selecionarFormato(id) {
    document.querySelectorAll('.options-agenda .opt').forEach(opt => {
      opt.classList.remove("selected");
    });
    document.getElementById(id).classList.add("selected");
  }
  
  function validarAgendamento(event) {
    event.preventDefault();
    
    const form = event.target;
    const dataSelecionada = form.data.value;
    const formatoSelecionado = form.formato.value;
    const nivelSelecionado = form.nivel.value;
    const periodoSelecionado = form.periodo.value;
  
    if (!dataSelecionada || !formatoSelecionado || !nivelSelecionado || !periodoSelecionado) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
  
    // Validação de dia da semana
    const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
    const diaSelecionado = new Date(dataSelecionada).getDay();
    const diaTexto = diasSemana[diaSelecionado];
    
    // Verifica se o dia está disponível para o intérprete
    const diasDisponiveis = document.getElementById('datas-int').textContent.split(", ");
    if (!diasDisponiveis.includes(diaTexto)) {
      alert("Esse intérprete não atende nesse dia! Escolha outro dia.");
      return;
    }
  
    // Tudo certo - pode enviar para o servidor
    alert("Agendamento confirmado com sucesso!");
    form.reset();
    
    // Aqui você adicionaria o código para enviar para o backend
    // enviarAgendamentoParaBackend(formData);
  }