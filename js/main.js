document.addEventListener('DOMContentLoaded', function () {
    let sliderContainer = document.querySelector('.slider-container');
    let slider = document.querySelector('.slider');

    let initialX = null;
    let initialScrollY = window.scrollY + 500;
    let middleY = window.innerHeight / 2;

    window.addEventListener('scroll', function () {
        if (initialX === null) {
            initialX = slider.getBoundingClientRect().left + window.scrollX;
        }

        let scrollY = window.scrollY + 500;

        let offsetX = (scrollY - initialScrollY) * 1;

        slider.style.transform = `translateX(${initialX - offsetX}px)`;
    });
});

function togglemenu(){
    const navbar = document.querySelector('.navbar-mobile');
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', () => {
 navbar.classList.toggle('show-nav');
    })
}
togglemenu();


const ctx1 = document.getElementById("chart2");

const chart2 = new Chart(ctx1, {
  type: "polarArea",
  data: {
    datasets: [
      {
        data: myData1["chiffres"],
        backgroundColor: ["rgb(92,203,123,0.5)", "rgb(191,239,211,0.5)", "rgb(83,156,103,0.5)  "],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
    labels: myData1["annees"],
  },
  options: {
    maintainAspectRatio: false,
    animation: {
      duration: 3000,
      easing: "easeOutQuad",
    },
    plugins: {
      title: {
        display: true,
        text: "Impact de l'installation de dispositifs hydro-économes",
        font: {
          size: 18
        }
      },
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            var label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += context.formattedValue + ' kWh';
            return label;
          }
        }
      }
    },
    layout: {
      padding: {
        top: 20
      }
    },
    elements: {
      line: {
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.5)',
      },
      arc: {
        borderWidth: 0
      }
    },
    scales: {
      r: {
        ticks: {
          stepSize: 50,
          callback: function(value) {
            return value + ' kWh';
          }
        }
      }
    },
  },
});




const ctx2 = document.getElementById("chart3");

const chart3 = new Chart(ctx2, {
  type: "bar",
  data: {
    datasets: [
      {
        data: myData2["chiffres"],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        
      },
    ],
    labels: myData2["annees"],
  },
  options: {
    borderRadius: 50,
    maintainAspectRatio: false,
    animation: {
      duration: 3000,
      easing: "easeOutQuad",
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "gCO2e/kWh", // Ajout d'un titre à l'axe y
        },
      },
    },
  },
  plugins: {
    title: {
        display: true,
        text: "Graphique",
        font: {
            size: 18
        }
    },
    legend: {
        display: true,
        position: 'bottom', // 'top', 'bottom', 'left', 'right'
        // ...
    },
  },
});

const autocolors = window["chartjs-plugin-autocolors"];
// Récupération du contexte d'affichage du canvas d'id chart
const ctx = document.getElementById("chart");

// Création d'un graphique affichant des courbes dans le canvas d'id chart
let delayed;
const chart = new Chart(ctx, {
  type: "bar",
  plugins: [autocolors],
  data: {
    labels: classeLogement,
    datasets: [
      {
        data: data[0].chiffres,
        label: data[0].catégorie,
      },
      {
        data: data[1].chiffres,
        label: data[1].catégorie,
      },
      {
        data: data[2].chiffres,
        label: data[2].catégorie,
      },
      {
        data: data[3].chiffres,
        label: data[3].catégorie,
      }
    ],
  },
  options: {
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 200 + context.datasetIndex * 2000;
        }
        return delay;
      },
    },
    borderRadius: 10,
    responsive: true,
    maintainaspectratio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        max: 50,
      }
    },
    plugins: {

      autocolors: {
        offset: 39,
      },
      title: {
        display: true,
        text: "Energie de chauffage par classe des logements en %",
        font: {
          size: 18,
        }
      }
    }
  }

});

const ctx3 = document.getElementById("chart1");

const chart1 = new Chart(ctx3, {
    type: "doughnut",
    data: {
        datasets: [{
            data: data2.proportions
        }],

        labels: data2.catégories
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,        
        /* datasets:{
            pie: {
                radius: 180,
                spacing: 1
            }
        }, */
        
        plugins: {
            title: {
                display: true,
                text: "Graphique",
                font: {
                    size: 18
                }
            },
            legend: {
                display: true,
                position: 'bottom', // 'top', 'bottom', 'left', 'right'
                // ...
            },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 2000,
          easing: 'easeInOutQuart',
      }
    }
});

// Récupérer la position verticale de l'élément contenant le graphique
const chartContainer = document.getElementById("chartContainer");
const chartContainerPosition = chartContainer.offsetTop;

// Fonction pour déclencher l'animation du graphique
function triggerChartAnimation() {
    chart2.update(); // Mettre à jour le graphique pour déclencher l'animation
    chart3.update(); // Mettre à jour le graphique pour déclencher l'animation
    chart.update(); // Mettre à jour le graphique pour déclencher l'animation
    chart1.update(); // Mettre à jour le graphique pour déclencher l'animation
    window.removeEventListener('scroll', scrollHandler); // Retirer l'écouteur d'événement après avoir déclenché l'animation
}

// Fonction pour gérer l'événement de défilement de la fenêtre
function scrollHandler() {
    // Récupérer la position actuelle de défilement
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    // Vérifier si la position de défilement atteint ou dépasse la position de l'élément contenant le graphique
    if (scrollPosition >= chartContainerPosition) {
        triggerChartAnimation(); // Déclencher l'animation du graphique
    }
}

// Ajouter un écouteur d'événement pour le défilement de la fenêtre
window.addEventListener('scroll', scrollHandler);
