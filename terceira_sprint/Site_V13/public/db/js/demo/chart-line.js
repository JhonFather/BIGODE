var exibiu_graficoTemp = false;
var exibiu_graficoUmid = false;



function atualizarGrafico() {
  obterDadosGrafico();
  setTimeout(atualizarGrafico, 10000);
}

// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
function configurarGraficoTemp() {
  var configuracoes = {
    maintainAspectRatio: false,
    responsive: true,
    animation: exibiu_graficoTemp ? false : { duration: 1500 },
    hoverMode: 'index',
    stacked: false,
    title: {
      display: false,
      text: 'Histórico recente de temperatura e umidade'
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + " " + number_format(tooltipItem.yLabel) + ' C°';
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'time'
        },
        gridLines: {
          display: true,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 10,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return number_format(value) + '°C';
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        },
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'right',
        id: 'y-temperatura',
      }],
    }
  };

  exibiu_graficoTemp = true;

  return configuracoes;
}

function configurarGraficoUmid() {
  var configuracoes = {
    maintainAspectRatio: false,
    responsive: true,
    animation: exibiu_graficoUmid ? false : { duration: 1500 },
    hoverMode: 'index',
    stacked: false,
    title: {
      display: false,
      text: 'Histórico recente de temperatura e umidade'
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + " " + number_format(tooltipItem.yLabel) + ' %';
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'time'
        },
        gridLines: {
          display: true,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 10,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return number_format(value) + '%';
          }
        },
        // grid line settings
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        },
        type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
        display: true,
        position: 'right',
        id: 'y-umidade',
      }],
    }

  };

  exibiu_graficoUmid = true;

  return configuracoes;
}

// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
function obterDadosGrafico() {

  // neste JSON tem que ser 'labels', 'datasets' etc, 
  // porque é o padrão do Chart.js
  var dadostemp = {
    labels: [],
    datasets: [
      {
        yAxisID: 'y-temperatura',
        label: 'Temperatura',
        lineTension: 0.3,
        backgroundColor: "rgba(231, 74, 59, 0.0)",
        borderColor: "rgba(231, 74, 59, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(231, 74, 59, 1)",
        pointBorderColor: "rgba(231, 74, 59, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(231, 74, 59, 1)",
        pointHoverBorderColor: "rgba(231, 74, 59, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: []
      }

    ]
  };
  var dadosumid = {
    labels: [],
    datasets: [
      {
        yAxisID: 'y-umidade',
        label: 'Umidade',
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.0)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: []
      }
    ]
  }

  fetch('/leituras/ultimas', { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {

        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        resposta.reverse();

        for (i = 0; i < resposta.length; i++) {
          var registro = resposta[i];
          atualizarUmidade(registro.umidade)
          atualizarTemperatura(registro.temperatura)
          // aqui, após 'registro.' use os nomes 
          // dos atributos que vem no JSON 
          // que gerou na consulta ao banco de dados

          dadostemp.labels.push(registro.datahora);
          dadostemp.datasets[0].data.push(registro.temperatura);

          dadosumid.labels.push(registro.datahora);
          dadosumid.datasets[0].data.push(registro.umidade);

        }
        console.log(JSON.stringify(dadostemp, dadosumid));

        div_aguarde.style.display = 'none';
        div_aguarde2.style.display = 'none';
        analytics()
        plotarGrafico(dadostemp, dadosumid);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}
function atualizarTemperatura(temperatura) {
  dado_temp.innerHTML = `${temperatura}°C`;
  if (temperatura <= 17 || temperatura >= 27) {
    $('#fundoCartaoTemperatura2').addClass('bg-warning');
    $('#textoTitulo2').removeClass('text-danger');
    $('#textoTitulo2').addClass('text-light');
  } else {
    $('#fundoCartaoTemperatura2').removeClass('bg-warning');
    $('#textoTitulo2').addClass('text-danger');
    $('#textoTitulo2').removeClass('text-light');

  }
}

function atualizarUmidade(umidade) {
  dado_umid.innerHTML = `${umidade}%`;
  if (umidade <= 40 || umidade >= 55) {
    $('#fundoCartaoTemperatura').addClass('bg-warning');
    $('#textoTitulo').removeClass('text-primary');
    $('#textoTitulo').addClass('text-light');
    $('#fundoCartaoTemperatura').removeClass('border-left-primary');
    $('#fundoCartaoTemperatura').addClass('border-left-danger');
  } else {
    $('#fundoCartaoTemperatura').removeClass('bg-warning');
    $('#textoTitulo').addClass('text-primary');
    $('#textoTitulo').removeClass('text-light');
    $('#fundoCartaoTemperatura').addClass('border-left-primary');
    $('#fundoCartaoTemperatura').removeClass('border-left-danger');
  }
}
// só altere aqui se souber o que está fazendo!
function plotarGrafico(dadostemp, dadosumid) {
  console.log('iniciando plotagem do gráfico...');

  var ctx = canvas_temperatura.getContext('2d');
  window.grafico_linha = Chart.Line(ctx, {
    data: dadostemp,
    options: configurarGraficoTemp()

  });
  var ctx2 = canvas_umidade.getContext('2d');
  window.grafico_linha = Chart.Line(ctx2, {
    data: dadosumid,
    options: configurarGraficoUmid()

  });
}
function analytics() {
  fetch('leituras/estatisticas', { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (respostas) {
        console.log(`Analytics recebidos: ${JSON.stringify(respostas)}`);
        tem_max.innerHTML = `${respostas.temp_maxima}°C`;
        tem_min.innerHTML = `${respostas.temp_minima}°C`;
        tem_med.innerHTML = `${respostas.temp_media}°C`;

        // 
        umi_max.innerHTML = `${respostas.umid_maxima}%`;
        umi_min.innerHTML = `${respostas.umid_minima}%`;
        umi_med.innerHTML = `${respostas.umid_media}%`;


      })
    } else {
      console.error('Erro');

    }
  })
}