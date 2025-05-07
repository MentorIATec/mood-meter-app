// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario ya está logueado
    const studentName = localStorage.getItem('studentName');
    const studentId = localStorage.getItem('studentId');
    const studentGroup = localStorage.getItem('studentGroup');
    const loginScreen = document.getElementById('login-screen');
  
    if (studentName && studentId) {
      // Usuario ya logueado, ocultar pantalla de login
      if (loginScreen) {
        loginScreen.classList.add('hidden');
      }
      console.log(`Usuario identificado: ${studentName} (${studentId})`);
    } else if (loginScreen) {
      // Mostrar pantalla de login
      const loginButton = document.getElementById('login-button');
      
      if (loginButton) {
        loginButton.addEventListener('click', function() {
          const nameInput = document.getElementById('student-name');
          const idInput = document.getElementById('student-id');
          const groupInput = document.getElementById('student-group');
          
          if (!nameInput || !idInput) {
            console.error('No se encontraron los campos de login');
            return;
          }
          
          const name = nameInput.value.trim();
          const id = idInput.value.trim();
          const group = groupInput ? groupInput.value.trim() : 'No especificado';
          
          if (name && id) {
            localStorage.setItem('studentName', name);
            localStorage.setItem('studentId', id);
            localStorage.setItem('studentGroup', group);
            
            loginScreen.classList.add('hidden');
            
            // Mostrar mensaje de bienvenida
            showNotification(`¡Bienvenido/a, ${name}!`);
          } else {
            alert('Por favor, completa tu nombre y matricula/correo');
          }
        });
      }
    }
  
    // Definición de emociones por cuadrante
    const emotions = {
      red: [
        { name: 'Enojado/a', emoji: '😠' },
        { name: 'Frustrado/a', emoji: '😤' },
        { name: 'Estresado/a', emoji: '😫' },
        { name: 'Nervioso/a', emoji: '😰' },
        { name: 'Preocupado/a', emoji: '😟' },
        { name: 'Irritado/a', emoji: '😒' },
        { name: 'Ansioso/a', emoji: '😥' }
      ],
      yellow: [
        { name: 'Entusiasmado/a', emoji: '🤩' },
        { name: 'Feliz', emoji: '😄' },
        { name: 'Motivado/a', emoji: '💪' },
        { name: 'Optimista', emoji: '😊' },
        { name: 'Animado/a', emoji: '🙌' },
        { name: 'Energizado/a', emoji: '⚡' },
        { name: 'Alegre', emoji: '😁' }
      ],
      blue: [
        { name: 'Triste', emoji: '😢' },
        { name: 'Cansado/a', emoji: '😴' },
        { name: 'Desanimado/a', emoji: '😞' },
        { name: 'Aburrido/a', emoji: '😑' },
        { name: 'Decepcionado/a', emoji: '😔' },
        { name: 'Melancólico/a', emoji: '🥺' },
        { name: 'Agotado/a', emoji: '😩' }
      ],
      green: [
        { name: 'Tranquilo/a', emoji: '😌' },
        { name: 'Relajado/a', emoji: '🧘' },
        { name: 'Satisfecho/a', emoji: '😏' },
        { name: 'Calmado/a', emoji: '😇' },
        { name: 'Contento/a', emoji: '🙂' },
        { name: 'Sereno/a', emoji: '🧠' },
        { name: 'En paz', emoji: '✨' }
      ]
    };
  
    // Información de los cuadrantes
    const quadrants = {
      red: { title: 'Emociones Intensas', subtitle: 'Alta energía - Bajo agrado', color: '#F27052' },
      yellow: { title: 'Emociones Positivas', subtitle: 'Alta energía - Alto agrado', color: '#FFDC51' },
      blue: { title: 'Emociones Bajas', subtitle: 'Baja energía - Bajo agrado', color: '#51A8FF' },
      green: { title: 'Emociones Tranquilas', subtitle: 'Baja energía - Alto agrado', color: '#92D36E' }
    };
  
    // Recomendaciones por cuadrante
    const recommendations = {
      red: [
        "Tómate 5 minutos para respirar profundamente (4 segundos inhala, 4 aguanta, 4 exhala)",
        "Escribe lo que te está estresando y qué pasos concretos podrías dar",
        "Habla con tu mentora sobre estrategias para manejar situaciones de alta presión",
        "Haz una pausa y sal a caminar brevemente para liberar tensión",
        "Practica la técnica 5-4-3-2-1: nombra 5 cosas que ves, 4 que puedes tocar, 3 que oyes, 2 que hueles y 1 que puedes saborear"
      ],
      yellow: [
        "Aprovecha esta energía positiva para avanzar en proyectos importantes",
        "Comparte tu entusiasmo ayudando a algún compañero que lo necesite",
        "Documenta este momento positivo en tu diario para recordarlo después",
        "Establece una meta específica aprovechando tu buen estado de ánimo",
        "Programa actividades futuras que mantengan esta energía positiva"
      ],
      blue: [
        "Comunícate con tu mentora para recibir apoyo y orientación",
        "Establece una meta pequeña y alcanzable para hoy",
        "Considera hacer algo de actividad física ligera como caminar 10 minutos",
        "Ponte en contacto con un amigo o familiar que te haga sentir bien",
        "Practica el autocuidado: descansa lo suficiente y aliméntate bien"
      ],
      green: [
        "Aprovecha este momento de calma para reflexionar sobre tus metas",
        "Practica la gratitud escribiendo 3 cosas por las que estás agradecido/a",
        "Usa esta claridad mental para planificar tus próximos pasos académicos",
        "Fortalece este estado con una sesión de meditación breve",
        "Aprovecha para revisar tus objetivos a largo plazo mientras estás tranquilo/a"
      ]
    };
  
    // Preguntas de reflexión por cuadrante
    const reflectionQuestions = {
      red: [
        "¿Qué situación específica te está causando tensión?",
        "¿Qué necesitas en este momento para sentirte mejor?",
        "¿Hay alguna acción concreta que puedas tomar para reducir tu estrés?"
      ],
      yellow: [
        "¿Qué ha contribuido a tu buen estado de ánimo hoy?",
        "¿Cómo puedes mantener esta energía positiva?",
        "¿Hay algún proyecto en el que puedas avanzar aprovechando este impulso?"
      ],
      blue: [
        "¿Qué factores han contribuido a que te sientas así?",
        "¿Qué pequeño paso podrías dar hoy para sentirte un poco mejor?",
        "¿Hay alguien con quien podrías hablar que te ayude a sentirte comprendido/a?"
      ],
      green: [
        "¿Qué prácticas te han ayudado a alcanzar este estado de calma?",
        "¿Cómo puedes incorporar más momentos como este en tu rutina?",
        "¿Qué decisiones importantes podrías considerar mientras te sientes centrado/a?"
      ]
    };
  
    // Estado actual
    let currentQuadrant = null;
    let selectedEmotion = null;
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
    let goalHistory = JSON.parse(localStorage.getItem('goalHistory')) || [];
    let activeTab = 'history';
    let currentFilterMode = 'all'; // Para filtros en la pestaña de tendencias
  
    // Elementos del DOM
    const quadrantElements = {
      red: document.getElementById('red-quadrant'),
      yellow: document.getElementById('yellow-quadrant'),
      blue: document.getElementById('blue-quadrant'),
      green: document.getElementById('green-quadrant')
    };
    
    const emotionsPanel = document.getElementById('emotions-panel');
    const emotionsTitle = document.getElementById('emotions-title');
    const emotionsContainer = document.getElementById('emotions-container');
    const closeEmotionsBtn = document.getElementById('close-emotions');
    
    const selectedEmotionContainer = document.getElementById('selected-emotion-container');
    const selectedEmotionEmoji = document.getElementById('selected-emotion-emoji');
    const selectedEmotionName = document.getElementById('selected-emotion-name');
    
    const notesTextarea = document.getElementById('notes');
    const submitButton = document.getElementById('submit-button');
    const successMessage = document.getElementById('success-message');
    
    const recommendationsContainer = document.getElementById('recommendations-container');
    const recommendationsContent = document.getElementById('recommendations-content');
    const contactMentorBtn = document.getElementById('contact-mentor');
    
    const goalSettingContainer = document.getElementById('goal-setting');
    const goalTypeSelect = document.getElementById('goal-type');
    const goalDescriptionTextarea = document.getElementById('goal-description');
    const saveGoalBtn = document.getElementById('save-goal');
    
    const historyContainer = document.getElementById('history-container');
    const historyList = document.getElementById('history-list');
    const emailDataButton = document.getElementById('email-data-button');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    const goalsListContainer = document.getElementById('goals-list');
    const noGoalsMessage = document.getElementById('no-goals-message');
    
    const moodChartCanvas = document.getElementById('mood-chart');
  
    // Verificar que todos los elementos existen (útil para depuración)
    function checkElements() {
      const elements = {
        'red-quadrant': quadrantElements.red,
        'yellow-quadrant': quadrantElements.yellow,
        'blue-quadrant': quadrantElements.blue,
        'green-quadrant': quadrantElements.green,
        'emotions-panel': emotionsPanel,
        'emotions-title': emotionsTitle,
        'emotions-container': emotionsContainer,
        'close-emotions': closeEmotionsBtn,
        'selected-emotion-container': selectedEmotionContainer,
        'selected-emotion-emoji': selectedEmotionEmoji,
        'selected-emotion-name': selectedEmotionName,
        'notes': notesTextarea,
        'submit-button': submitButton,
        'success-message': successMessage,
        'recommendations-container': recommendationsContainer,
        'recommendations-content': recommendationsContent,
        'contact-mentor': contactMentorBtn,
        'goal-setting': goalSettingContainer,
        'goal-type': goalTypeSelect,
        'goal-description': goalDescriptionTextarea,
        'save-goal': saveGoalBtn,
        'history-container': historyContainer,
        'history-list': historyList,
        'email-data-button': emailDataButton,
        'goals-list': goalsListContainer,
        'no-goals-message': noGoalsMessage,
        'mood-chart': moodChartCanvas
      };
      
      const missingElements = [];
      
      for (const [id, element] of Object.entries(elements)) {
        if (!element) {
          missingElements.push(id);
        }
      }
      
      if (missingElements.length > 0) {
        console.error('Elementos faltantes:', missingElements);
      } else {
        console.log('Todos los elementos están correctamente referenciados');
      }
    }
  
    // Añadir event listeners a los cuadrantes
    Object.keys(quadrantElements).forEach(quadrant => {
      const element = quadrantElements[quadrant];
      if (element) {
        element.addEventListener('click', () => {
          currentQuadrant = quadrant;
          showEmotionsPanel(quadrant);
        });
      } else {
        console.error(`Elemento no encontrado: ${quadrant}-quadrant`);
      }
    });
  
    // Cerrar panel de emociones
    if (closeEmotionsBtn) {
      closeEmotionsBtn.addEventListener('click', () => {
        emotionsPanel.classList.add('hidden');
      });
    }
  
    // Enviar formulario
    if (submitButton) {
      submitButton.addEventListener('click', handleSubmit);
    }
    
    // Enviar datos por correo
    if (emailDataButton) {
      emailDataButton.addEventListener('click', emailData);
    }
    
    // Contactar mentora
    if (contactMentorBtn) {
      contactMentorBtn.addEventListener('click', contactMentor);
    }
    
    // Guardar objetivo
    if (saveGoalBtn) {
      saveGoalBtn.addEventListener('click', saveGoal);
    }
    
    // Cambio de pestañas
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Añadir clase active al botón clickeado
        button.classList.add('active');
        
        // Ocultar todos los contenidos
        tabContents.forEach(content => content.classList.add('hidden'));
        
        // Mostrar el contenido correspondiente
        const tabId = button.getAttribute('data-tab');
        const tabContent = document.getElementById(`tab-${tabId}`);
        
        if (tabContent) {
          tabContent.classList.remove('hidden');
          
          // Actualizar pestaña activa
          activeTab = tabId;
          
          // Si es la pestaña de tendencias, actualizar gráfico
          if (tabId === 'trends') {
            updateMoodChart();
          }
        } else {
          console.error(`Contenido de pestaña no encontrado: tab-${tabId}`);
        }
      });
    });
  
    // Añadir listener para borrar historial
    if (document.getElementById('clear-history-button')) {
      document.getElementById('clear-history-button').addEventListener('click', clearMoodHistory);
    }

    // Event listeners para los botones de filtro
    function setupFilterEventListeners() {
      const filterAll = document.getElementById('filter-all');
      const filterMonth = document.getElementById('filter-month');
      const filterWeek = document.getElementById('filter-week');
      const filterDay = document.getElementById('filter-day');
      
      if (filterAll) filterAll.addEventListener('click', () => filterData('all'));
      if (filterMonth) filterMonth.addEventListener('click', () => filterData('month'));
      if (filterWeek) filterWeek.addEventListener('click', () => filterData('week'));
      if (filterDay) filterDay.addEventListener('click', () => filterData('day'));
    }

    // Inicializar
    checkElements();
    updateHistory();
    updateGoalsList();
    console.log('Estado del historial:', moodHistory.length, 'registros');
    console.log('Estado de objetivos:', goalHistory.length, 'objetivos');
  
    // Funciones
    function showEmotionsPanel(quadrant) {
      if (!emotionsPanel || !emotionsTitle || !emotionsContainer) {
        console.error('Elementos del panel de emociones no encontrados');
        return;
      }
      
      // Actualizar título
      emotionsTitle.textContent = `Selecciona una emoción - ${quadrants[quadrant].title}`;
      emotionsTitle.style.color = quadrants[quadrant].color;
      
      // Limpiar contenedor de emociones
      emotionsContainer.innerHTML = '';
      
      // Añadir emociones al panel
      emotions[quadrant].forEach(emotion => {
        const button = document.createElement('button');
        button.className = 'flex items-center px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:translate-y-[-2px] transition-all';
        button.innerHTML = `
          <span class="text-2xl mr-3">${emotion.emoji}</span>
          <span class="font-medium text-gray-800">${emotion.name}</span>
        `;
        
        button.addEventListener('click', () => {
          selectEmotion(emotion, quadrant);
          emotionsPanel.classList.add('hidden');
        });
        
        emotionsContainer.appendChild(button);
      });
      
      // Mostrar panel
      emotionsPanel.classList.remove('hidden');
    }
  
    function selectEmotion(emotion, quadrant) {
      if (!selectedEmotionContainer || !selectedEmotionEmoji || !selectedEmotionName) {
        console.error('Elementos de emoción seleccionada no encontrados');
        return;
      }
      
      selectedEmotion = {
        ...emotion,
        quadrant
      };
      
      selectedEmotionEmoji.textContent = emotion.emoji;
      selectedEmotionName.textContent = `Has seleccionado: ${emotion.name}`;
      selectedEmotionContainer.classList.remove('hidden');
    }
  
    function handleSubmit() {
      if (!selectedEmotion) {
        alert('Por favor, selecciona una emoción antes de enviar');
        return;
      }
      
      if (!notesTextarea || !successMessage) {
        console.error('Elementos del formulario no encontrados');
        return;
      }
    
      // Crear nuevo registro
      const newEntry = {
        id: Date.now(),
        emotion: selectedEmotion.name,
        emoji: selectedEmotion.emoji,
        quadrant: selectedEmotion.quadrant,
        notes: notesTextarea.value.trim(),
        timestamp: new Date().toISOString(),
        studentName: localStorage.getItem('studentName') || '',
        studentId: getStudentId(),
        studentGroup: localStorage.getItem('studentGroup') || ''
      };
    
      // Guardar localmente
      moodHistory = [newEntry, ...moodHistory];
      localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
      
      // Mostrar mensaje de éxito
      successMessage.classList.remove('hidden');
      
      // Mostrar recomendaciones personalizadas
      showRecommendations(selectedEmotion.quadrant);
      
      // Mostrar formulario de objetivos
      if (goalSettingContainer) {
        setTimeout(() => {
          goalSettingContainer.classList.remove('hidden');
        }, 1000);
      }
      
      // Limpiar formulario
      selectedEmotion = null;
      selectedEmotionContainer.classList.add('hidden');
      notesTextarea.value = '';
      
      // Actualizar historial y gráfico
      updateHistory();
      if (activeTab === 'trends') {
        updateMoodChart();
      }
      
      // Ocultar mensaje de éxito después de unos segundos
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 3000);
    }
  
    function showRecommendations(quadrant) {
      if (!recommendationsContainer || !recommendationsContent) {
        console.error('Elementos de recomendaciones no encontrados');
        return;
      }
      
      // Limpiar contenedor
      recommendationsContent.innerHTML = '';
      
      // Obtener recomendaciones aleatorias para el cuadrante
      const quadrantRecommendations = recommendations[quadrant];
      const selectedRecommendations = getRandomElements(quadrantRecommendations, 3);
      
      // Obtener preguntas de reflexión aleatorias
      const quadrantQuestions = reflectionQuestions[quadrant];
      const selectedQuestions = getRandomElements(quadrantQuestions, 2);
      
      // Añadir recomendaciones al contenedor
      const recList = document.createElement('ul');
      recList.className = 'list-disc pl-5 text-blue-700';
      
      selectedRecommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recList.appendChild(li);
      });
      
      recommendationsContent.appendChild(recList);
      
      // Añadir preguntas de reflexión
      const questionsDiv = document.createElement('div');
      questionsDiv.className = 'mt-4 p-3 bg-blue-100 rounded-lg';
      questionsDiv.innerHTML = `
        <h4 class="font-semibold mb-2">Preguntas para reflexionar:</h4>
        <ul class="list-disc pl-5 text-blue-800">
          ${selectedQuestions.map(q => `<li>${q}</li>`).join('')}
        </ul>
      `;
      
      recommendationsContent.appendChild(questionsDiv);
      
      // Mostrar el contenedor
      recommendationsContainer.classList.remove('hidden');
    }
    
    function getRandomElements(array, count) {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  
    function updateHistory() {
      console.log('Actualizando historial...', moodHistory.length, 'registros');
    
      if (!historyContainer || !historyList) {
        console.error('Elementos de historial no encontrados');
        return;
      }
      
      if (moodHistory.length === 0) {
        console.log('No hay registros de historial');
        historyContainer.classList.add('hidden');
        return;
      }
      
      console.log('Mostrando historial');
      historyContainer.classList.remove('hidden');
      historyList.innerHTML = '';
      
      moodHistory.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'p-4 hover:bg-gray-50';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'flex items-start justify-between mb-2';
        
        const emotionDiv = document.createElement('div');
        emotionDiv.innerHTML = `
          <span class="text-2xl mr-2">${entry.emoji}</span>
          <span class="font-semibold">${entry.emotion}</span>
        `;
        
        const timestampSpan = document.createElement('span');
        timestampSpan.className = 'text-sm text-gray-500';
        timestampSpan.textContent = formatDate(entry.timestamp);
        
        headerDiv.appendChild(emotionDiv);
        headerDiv.appendChild(timestampSpan);
        entryElement.appendChild(headerDiv);
        
        if (entry.notes) {
          const notesP = document.createElement('p');
          notesP.className = 'text-gray-700 bg-gray-50 p-3 rounded-lg mt-1';
          notesP.textContent = entry.notes;
          entryElement.appendChild(notesP);
        }
        
        historyList.appendChild(entryElement);
      });
    }
    
    function emailData() {
      const studentName = localStorage.getItem('studentName') || '[Tu nombre]';
      const studentId = getStudentId();
      
      const subject = "Mis datos del Medidor de Estado de Ánimo";
      let body = `Hola mentora,\n\nSoy ${studentName} (${studentId}).\n\nAquí están mis registros de estado de ánimo:\n\n`;
      
      moodHistory.slice(0, 5).forEach(entry => {
        body += `- ${entry.emoji} ${entry.emotion} (${formatDate(entry.timestamp)})\n`;
        if (entry.notes) {
          body += `  Notas: ${entry.notes}\n`;
        }
        body += "\n";
      });
      
      if (moodHistory.length > 5) {
        body += `... y ${moodHistory.length - 5} registros más.\n\n`;
      }
      
      body += "Me gustaría discutir estos resultados contigo.\n\nGracias,\n" + studentName;
      
      window.location.href = `mailto:mentor@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    
    function contactMentor() {
      const defaultName = localStorage.getItem('studentName') || "Estudiante";
      const studentName = prompt("Ingresa tu nombre:", defaultName) || defaultName;
      const message = prompt("¿Qué te gustaría compartir con tu mentora?") || "Me gustaría hablar sobre mi estado de ánimo actual.";
      
      const subject = `[Mood Meter] ${studentName} necesita apoyo`;
      const body = `Hola mentora,\n\nSoy ${studentName}. ${message}\n\nGracias.`;
      
      window.location.href = `mailto:mentor@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    
    function saveGoal() {
      if (!goalDescriptionTextarea) {
        console.error('Elemento de descripción de objetivo no encontrado');
        return;
      }
      
      if (!goalDescriptionTextarea.value.trim()) {
        alert("Por favor, describe tu objetivo");
        return;
      }
      
      // Crear nuevo objetivo
      const newGoal = {
        id: Date.now(),
        type: goalTypeSelect ? goalTypeSelect.value : 'general',
        description: goalDescriptionTextarea.value.trim(),
        completed: false,
        timestamp: new Date().toISOString(),
        relatedMood: selectedEmotion ? selectedEmotion.quadrant : null,
        studentName: localStorage.getItem('studentName') || '',
        studentId: getStudentId(),
        studentGroup: localStorage.getItem('studentGroup') || ''
      };
      
      // Actualizar historial de objetivos
      goalHistory = [newGoal, ...goalHistory];
      localStorage.setItem('goalHistory', JSON.stringify(goalHistory));
      
      // Actualizar lista de objetivos
      updateGoalsList();
      
      // Mensaje de éxito
      alert("¡Objetivo guardado correctamente!");
      
      // Limpiar y ocultar formulario
      goalDescriptionTextarea.value = '';
      if (goalSettingContainer) {
        goalSettingContainer.classList.add('hidden');
      }
      
      // Cambiar a la pestaña de objetivos
      const goalsTab = document.querySelector('.tab-btn[data-tab="goals"]');
      if (goalsTab) {
        goalsTab.click();
      }
    }
    
    function updateGoalsList() {
      console.log('Actualizando lista de objetivos...', goalHistory.length, 'objetivos');
      
      if (!goalsListContainer || !noGoalsMessage) {
        console.error('Elementos de lista de objetivos no encontrados');
        return;
      }
      
      if (goalHistory.length === 0) {
        console.log('No hay objetivos registrados');
        noGoalsMessage.classList.remove('hidden');
        return;
      }
      
      noGoalsMessage.classList.add('hidden');
      goalsListContainer.innerHTML = '';
      
      goalHistory.forEach(goal => {
        const goalElement = document.createElement('div');
        goalElement.className = 'p-4 border-b';
        
        // Determinar color según tipo
        let typeColor = '';
        switch(goal.type) {
          case 'academic': 
            typeColor = 'bg-purple-100 text-purple-800';
            break;
          case 'wellbeing':
            typeColor = 'bg-green-100 text-green-800';
            break;
          case 'social':
            typeColor = 'bg-yellow-100 text-yellow-800';
            break;
          default:
            typeColor = 'bg-gray-100 text-gray-800';
        }
        
        // Determinar estado
        const statusClass = goal.completed ? 'line-through text-gray-500' : '';
        
        goalElement.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <span class="px-2 py-1 rounded-full text-xs ${typeColor}">${formatGoalType(goal.type)}</span>
              <span class="text-sm text-gray-500 ml-2">${formatDate(goal.timestamp)}</span>
            </div>
            <div>
              <button class="toggle-goal text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100" data-id="${goal.id}">
                ${goal.completed ? 'Reactivar' : 'Completar'}
              </button>
              <button class="delete-goal text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100" data-id="${goal.id}">
                Eliminar
              </button>
            </div>
          </div>
          <p class="mt-2 ${statusClass}">${goal.description}</p>
          ${goal.relatedMood ? `<div class="mt-1 text-xs text-gray-500">Relacionado con: ${quadrants[goal.relatedMood].title}</div>` : ''}
        `;
        
        // Añadir event listeners a los botones
        const toggleButton = goalElement.querySelector('.toggle-goal');
        if (toggleButton) {
          toggleButton.addEventListener('click', () => {
            toggleGoalStatus(goal.id);
          });
        }
        
        const deleteButton = goalElement.querySelector('.delete-goal');
        if (deleteButton) {
          deleteButton.addEventListener('click', () => {
            deleteGoal(goal.id);
          });
        }
        
        goalsListContainer.appendChild(goalElement);
      });
    }
    
    // Función para borrar historial
    function clearMoodHistory() {
      if (confirm('¿Estás seguro de que quieres borrar todo tu historial de estados de ánimo? Esta acción no se puede deshacer.')) {
        localStorage.setItem('moodHistory', JSON.stringify([]));
        moodHistory = [];
        updateHistory();
        
        // Actualizar el gráfico si es necesario
        if (activeTab === 'trends') {
          updateMoodChart();
        }
        
        showNotification('Historial borrado correctamente.');
      }
    }
    
    function toggleGoalStatus(goalId) {
      goalHistory = goalHistory.map(goal => {
        if (goal.id === goalId) {
          return { ...goal, completed: !goal.completed };
        }
        return goal;
      });
      
      localStorage.setItem('goalHistory', JSON.stringify(goalHistory));
      updateGoalsList();
    }
    
    function deleteGoal(goalId) {
      if (confirm('¿Estás seguro de que quieres eliminar este objetivo?')) {
        goalHistory = goalHistory.filter(goal => goal.id !== goalId);
        localStorage.setItem('goalHistory', JSON.stringify(goalHistory));
        updateGoalsList();
      }
    }
    
    function formatGoalType(type) {
      switch(type) {
        case 'academic': return 'Académico';
        case 'wellbeing': return 'Bienestar';
        case 'social': return 'Social';
        default: return type;
      }
    }
    
    // Función para filtrar datos según el período seleccionado
    function filterData(period) {
      // Actualizar modo de filtro actual
      currentFilterMode = period;
      
      // Resaltar el botón activo
      const filterButtons = ['filter-all', 'filter-month', 'filter-week', 'filter-day'];
      filterButtons.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
          if (id === `filter-${period === 'all' ? 'all' : period}`) {
            button.classList.remove('bg-gray-100', 'text-gray-700');
            button.classList.add('bg-blue-100', 'text-blue-700');
          } else {
            button.classList.remove('bg-blue-100', 'text-blue-700');
            button.classList.add('bg-gray-100', 'text-gray-700');
          }
        }
      });
      
      // Filtrar los datos según el período seleccionado
      let filteredHistory = [...moodHistory];
      const now = new Date();
      
      if (period === 'month') {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        filteredHistory = moodHistory.filter(entry => new Date(entry.timestamp) >= oneMonthAgo);
      } else if (period === 'week') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        filteredHistory = moodHistory.filter(entry => new Date(entry.timestamp) >= oneWeekAgo);
      } else if (period === 'day') {
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        filteredHistory = moodHistory.filter(entry => new Date(entry.timestamp) >= today);
      }
      
      // Actualizar gráficos con datos filtrados
      updateChartsWithFilteredData(filteredHistory);
    }
    
    // Función para actualizar gráficos con datos filtrados
    function updateChartsWithFilteredData(filteredData) {
      const tempMoodHistory = moodHistory; // Guardar historial original
      moodHistory = filteredData; // Reemplazar temporalmente con datos filtrados
      
      // Actualizar todos los gráficos
      updateBasicChart();
      createTimelineChart();
      createEmotionDistributionRadar();
      createMoodTrendsChart();
      updateStatsSummary();
      
      // Restaurar historial original
      moodHistory = tempMoodHistory;
    }
    
    // Función para actualizar las estadísticas de resumen
    function updateStatsSummary() {
      // Elementos de estadísticas
      const totalCountEl = document.getElementById('stats-total-count');
      const topEmotionEl = document.getElementById('stats-top-emotion');
      const dominantQuadrantEl = document.getElementById('stats-dominant-quadrant');
      const consistencyEl = document.getElementById('stats-consistency');
      
      if (!totalCountEl || !topEmotionEl || !dominantQuadrantEl || !consistencyEl) {
        console.error('No se encontraron elementos de estadísticas');
        return;
      }
      
      // Total de registros
      const totalCount = moodHistory.length;
      totalCountEl.textContent = totalCount;
      
      if (totalCount === 0) {
        topEmotionEl.textContent = '-';
        dominantQuadrantEl.textContent = '-';
        consistencyEl.textContent = '0%';
        return;
      }
      
      // Emoción más frecuente
      const emotionCounts = {};
      moodHistory.forEach(entry => {
        if (!emotionCounts[entry.emotion]) {
          emotionCounts[entry.emotion] = 0;
        }
        emotionCounts[entry.emotion]++;
      });
      
      const topEmotion = Object.entries(emotionCounts)
        .sort((a, b) => b[1] - a[1])[0];
      
      topEmotionEl.innerHTML = `${topEmotion[0]} <span class="text-xl">${moodHistory.find(e => e.emotion === topEmotion[0]).emoji}</span>`;
      
      // Cuadrante dominante
      const quadrantCounts = {
        red: 0,
        yellow: 0,
        blue: 0,
        green: 0
      };
      
      moodHistory.forEach(entry => {
        if (entry.quadrant && quadrantCounts.hasOwnProperty(entry.quadrant)) {
          quadrantCounts[entry.quadrant]++;
        }
      });
      
      const dominantQuadrant = Object.entries(quadrantCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      dominantQuadrantEl.textContent = quadrants[dominantQuadrant].title;
      dominantQuadrantEl.style.color = quadrants[dominantQuadrant].color;
      
      // Consistencia (registros por día)
      const dayCount = {};
      moodHistory.forEach(entry => {
        const date = new Date(entry.timestamp).toISOString().split('T')[0]; // YYYY-MM-DD
        if (!dayCount[date]) {
          dayCount[date] = 0;
        }
        dayCount[date]++;
      });
      
      const totalDays = Object.keys(dayCount).length;
      const consistencyPercentage = Math.round((totalDays / 30) * 100); // Usando 30 días como referencia
      
      consistencyEl.textContent = `${consistencyPercentage}%`;
    }
    
    function updateMoodChart() {
      // Verificar si estamos en la pestaña de tendencias
      if (activeTab === 'trends') {
        // Actualizar estructura HTML primero
        updateTrendsTabContent();
        
        // Si no hay datos, mostrar mensaje
        if (moodHistory.length === 0) {
          console.log('No hay datos para crear los gráficos');
          return;
        }
        
        console.log('Actualizando gráficos...');
        
        // Crear gráficos
        updateBasicChart();
        createTimelineChart();
        createEmotionDistributionRadar();
        createMoodTrendsChart();
        updateStatsSummary();
        
        // Configurar los listeners de los botones de filtro
        setupFilterEventListeners();
      }
    }
    
    // Función para crear/actualizar el gráfico básico de distribución por cuadrantes
    function updateBasicChart() {
      const moodChartCanvas = document.getElementById('mood-chart');
      if (!moodChartCanvas) {
        console.error('Canvas para el gráfico no encontrado');
        return;
      }
      
      // Contar ocurrencias de cada cuadrante
      const quadrantCounts = {
        red: 0,
        yellow: 0,
        blue: 0,
        green: 0
      };
      
      moodHistory.forEach(entry => {
        if (entry.quadrant && quadrantCounts.hasOwnProperty(entry.quadrant)) {
          quadrantCounts[entry.quadrant]++;
        }
      });
      
      // Datos para gráfico de barras
      const barData = {
        labels: ['Emociones Intensas', 'Emociones Positivas', 'Emociones Bajas', 'Emociones Tranquilas'],
        datasets: [{
          label: 'Distribución de estados de ánimo',
          data: [
            quadrantCounts.red,
            quadrantCounts.yellow,
            quadrantCounts.blue,
            quadrantCounts.green
          ],
          backgroundColor: [
            '#F27052',
            '#FFDC51',
            '#51A8FF',
            '#92D36E'
          ]
        }]
      };
      
      // Destruir gráfico anterior si existe
      if (window.moodChartInstance) {
        window.moodChartInstance.destroy();
      }
      
      try {
        window.moodChartInstance = new Chart(moodChartCanvas, {
          type: 'bar',
          data: barData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Distribución de tus estados de ánimo',
                font: {
                  size: 16
                }
              }
            }
          }
        });
        console.log('Gráfico de barras creado correctamente');
      } catch (error) {
        console.error('Error al crear el gráfico de barras:', error);
      }
    }
  
    // Gráfico de línea temporal que muestra la evolución de emociones
    function createTimelineChart() {
      const timelineCanvas = document.getElementById('timeline-chart');
      if (!timelineCanvas) {
        console.error('Canvas para el gráfico de línea temporal no encontrado');
        return;
      }
      
      // Preparar datos (limitamos a los últimos 30 registros para mejor visualización)
      const entries = [...moodHistory].slice(0, 30).reverse();
      
      if (entries.length === 0) {
        console.log('No hay datos suficientes para el gráfico de línea temporal');
        return;
      }
      
      // Mapear cuadrantes a valores numéricos
      const quadrantValues = {
        yellow: 3, // Emociones Positivas (Alta energía, Alto agrado)
        green: 2,  // Emociones Tranquilas (Baja energía, Alto agrado)
        red: 1,    // Emociones Intensas (Alta energía, Bajo agrado)
        blue: 0    // Emociones Bajas (Baja energía, Bajo agrado)
      };
      
      // Preparar datos para Chart.js
      const timelineData = {
        labels: entries.map(entry => {
          const date = new Date(entry.timestamp);
          return date.toLocaleDateString('es-ES', { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit'
          });
        }),
        datasets: [{
          label: 'Estado Emocional',
          data: entries.map(entry => quadrantValues[entry.quadrant] || 0),
          backgroundColor: entries.map(entry => quadrants[entry.quadrant]?.color || '#ccc'),
          borderColor: entries.map(entry => quadrants[entry.quadrant]?.color || '#ccc'),
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          tension: 0.3,
          fill: false
        }]
      };
      
      // Configuración del gráfico
      const timelineConfig = {
        type: 'line',
        data: timelineData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const index = context.dataIndex;
                  const entry = entries[index];
                  return `${entry.emoji} ${entry.emotion}`;
                },
                afterLabel: function(context) {
                  const index = context.dataIndex;
                  const entry = entries[index];
                  return entry.notes ? `Nota: ${entry.notes}` : '';
                }
              }
            },
            title: {
              display: true,
              text: 'Evolución de tu estado emocional',
              font: {
                size: 16
              }
            }
          },
          scales: {
            y: {
              min: -0.5,
              max: 3.5,
              ticks: {
                callback: function(value) {
                  const labels = ['Emociones Bajas', 'Emociones Intensas', 'Emociones Tranquilas', 'Emociones Positivas'];
                  return labels[value] || '';
                },
                stepSize: 1
              },
              grid: {
                color: 'rgba(200, 200, 200, 0.2)'
              }
            },
            x: {
              ticks: {
                maxRotation: 45,
                minRotation: 45
              },
              grid: {
                display: false
              }
            }
          }
        }
      };
      
      // Destruir gráfico anterior si existe
      if (window.timelineChartInstance) {
        window.timelineChartInstance.destroy();
      }
      
      // Crear nuevo gráfico
      window.timelineChartInstance = new Chart(timelineCanvas, timelineConfig);
      console.log('Gráfico de línea temporal creado');
    }
  
    // Gráfico de radar para visualizar la distribución de emociones
    function createEmotionDistributionRadar() {
      const radarCanvas = document.getElementById('emotion-radar');
      if (!radarCanvas) {
        console.error('Canvas para el gráfico de radar no encontrado');
        return;
      }
      
      // Contar ocurrencias de cada emoción
      const emotionCounts = {};
      
      moodHistory.forEach(entry => {
        if (!emotionCounts[entry.emotion]) {
          emotionCounts[entry.emotion] = 0;
        }
        emotionCounts[entry.emotion]++;
      });
      
      if (Object.keys(emotionCounts).length === 0) {
        console.log('No hay datos suficientes para el gráfico de radar');
        return;
      }
      
      // Ordenar las emociones por frecuencia y tomar las 10 principales
      const topEmotions = Object.entries(emotionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      
      // Obtener el cuadrante para cada emoción
      const emotionQuadrants = {};
      
      for (const quadrant in emotions) {
        emotions[quadrant].forEach(emotion => {
          emotionQuadrants[emotion.name] = quadrant;
        });
      }
      
      // Preparar datos para Chart.js
      const radarData = {
        labels: topEmotions.map(([emotion]) => emotion),
        datasets: [{
          label: 'Frecuencia',
          data: topEmotions.map(([_, count]) => count),
          backgroundColor: topEmotions.map(([emotion]) => {
            const quadrant = emotionQuadrants[emotion] || 'blue';
            return quadrants[quadrant]?.color ? `${quadrants[quadrant].color}80` : '#cccccc80'; // Con transparencia (80 = 50%)
          }),
          borderColor: topEmotions.map(([emotion]) => {
            const quadrant = emotionQuadrants[emotion] || 'blue';
            return quadrants[quadrant]?.color || '#cccccc';
          }),
          borderWidth: 2,
          pointBackgroundColor: topEmotions.map(([emotion]) => {
            const quadrant = emotionQuadrants[emotion] || 'blue';
            return quadrants[quadrant]?.color || '#cccccc';
          }),
          pointRadius: 5
        }]
      };
      
      // Configuración del gráfico
      const radarConfig = {
        type: 'radar',
        data: radarData,
        options: {
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Tus Emociones Más Frecuentes',
              font: {
                size: 16
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const emotion = context.label;
                  const count = context.raw;
                  const quadrant = emotionQuadrants[emotion] || 'desconocido';
                  return `${emotion} (${quadrants[quadrant]?.title || 'Desconocido'}): ${count} veces`;
                }
              }
            }
          }
        }
      };
      
      // Destruir gráfico anterior si existe
      if (window.emotionRadarInstance) {
        window.emotionRadarInstance.destroy();
      }
      
      // Crear nuevo gráfico
      window.emotionRadarInstance = new Chart(radarCanvas, radarConfig);
      console.log('Gráfico de radar creado');
    }
  
    // Gráfico de tendencias de estado de ánimo por periodo
    function createMoodTrendsChart() {
      const trendsCanvas = document.getElementById('mood-trends-chart');
      if (!trendsCanvas) {
        console.error('Canvas para el gráfico de tendencias no encontrado');
        return;
      }
      
      if (moodHistory.length === 0) {
        console.log('No hay datos suficientes para el gráfico de tendencias');
        return;
      }
      
      // Agrupar por día o semana según la cantidad de datos
      const useDailyData = moodHistory.length < 30; // Usar datos diarios si hay pocos registros
      
      // Función para obtener la clave de agrupación
      function getGroupKey(date) {
        if (useDailyData) {
          // Agrupar por día
          return date.toISOString().slice(0, 10); // YYYY-MM-DD
        } else {
          // Agrupar por semana (formato: "YYYY-WW")
          const onejan = new Date(date.getFullYear(), 0, 1);
          const weekNum = Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
          return `${date.getFullYear()}-W${weekNum.toString().padStart(2, '0')}`;
        }
      }
      
      // Inicializar contadores por cuadrante
      const groupedData = {};
      
      // Recorrer el historial y agrupar por periodo
      moodHistory.forEach(entry => {
        const date = new Date(entry.timestamp);
        const key = getGroupKey(date);
        
        // Inicializar si no existe
        if (!groupedData[key]) {
          groupedData[key] = {
            red: 0,
            yellow: 0,
            blue: 0,
            green: 0,
            total: 0,
            label: useDailyData 
              ? date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) 
              : `Semana ${key.split('-W')[1]}`
          };
        }
        
        // Incrementar contador del cuadrante correspondiente
        if (entry.quadrant && groupedData[key].hasOwnProperty(entry.quadrant)) {
          groupedData[key][entry.quadrant]++;
          groupedData[key].total++;
        }
      });
      
      // Convertir a arrays para Chart.js
      const periods = Object.keys(groupedData).sort(); // Ordenar cronológicamente
      const labels = periods.map(period => groupedData[period].label);
      
      // Generar conjuntos de datos
      const datasets = [
        {
          label: 'Emociones Positivas',
          data: periods.map(period => (groupedData[period].total > 0 ? (groupedData[period].yellow / groupedData[period].total) * 100 : 0)),
          backgroundColor: quadrants.yellow.color,
          borderColor: quadrants.yellow.color,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: 'Emociones Tranquilas',
          data: periods.map(period => (groupedData[period].total > 0 ? (groupedData[period].green / groupedData[period].total) * 100 : 0)),
          backgroundColor: quadrants.green.color,
          borderColor: quadrants.green.color,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: 'Emociones Intensas',
          data: periods.map(period => (groupedData[period].total > 0 ? (groupedData[period].red / groupedData[period].total) * 100 : 0)),
          backgroundColor: quadrants.red.color,
          borderColor: quadrants.red.color,
          borderWidth: 2,
          tension: 0.3
        },
        {
          label: 'Emociones Bajas',
          data: periods.map(period => (groupedData[period].total > 0 ? (groupedData[period].blue / groupedData[period].total) * 100 : 0)),
          backgroundColor: quadrants.blue.color,
          borderColor: quadrants.blue.color,
          borderWidth: 2,
          tension: 0.3
        }
      ];
      
      // Configuración del gráfico
      const trendsConfig = {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Tendencias de Estado de Ánimo por ${useDailyData ? 'Día' : 'Semana'}`,
              font: {
                size: 16
              }
            },
            tooltip: {
              mode: 'index',
              callbacks: {
                label: function(context) {
                  const value = Math.round(context.raw * 10) / 10; // Redondear a 1 decimal
                  return `${context.dataset.label}: ${value}%`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Porcentaje (%)'
              }
            },
            x: {
              title: {
                display: true,
                text: useDailyData ? 'Día' : 'Semana'
              }
            }
          }
        }
      };
      
      // Destruir gráfico anterior si existe
      if (window.moodTrendsInstance) {
        window.moodTrendsInstance.destroy();
      }
      
      // Crear nuevo gráfico
      window.moodTrendsInstance = new Chart(trendsCanvas, trendsConfig);
      console.log('Gráfico de tendencias creado');
    }
  
    // Actualizar HTML para incluir los nuevos gráficos cuando se cambia a la pestaña de tendencias
    function updateTrendsTabContent() {
      const tabContent = document.getElementById('tab-trends');
      if (!tabContent) {
        console.error('Contenido de pestaña de tendencias no encontrado');
        return;
      }
      
      // Actualizar estructura HTML para incluir nuevos gráficos
      tabContent.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Tendencias de tus estados de ánimo</h2>
        
        <!-- Filtros para las visualizaciones -->
        <div class="mb-6 bg-white rounded-lg shadow-md p-4">
          <h3 class="text-lg font-semibold mb-3">Filtrar datos</h3>
          <div class="flex flex-wrap gap-3">
            <button id="filter-all" class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 active:bg-blue-300 transition-all">
              Todos los datos
            </button>
            <button id="filter-month" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all">
              Último mes
            </button>
            <button id="filter-week" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all">
              Última semana
            </button>
            <button id="filter-day" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all">
              Hoy
            </button>
          </div>
        </div>
        
        <!-- Estadísticas de resumen -->
        <div class="mb-6 bg-white rounded-lg shadow-md p-4">
          <h3 class="text-lg font-semibold mb-4">Resumen de tus emociones</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="p-3 border rounded-lg text-center">
              <h4 class="font-medium text-sm text-gray-500">Total de registros</h4>
              <p id="stats-total-count" class="text-2xl font-bold">0</p>
            </div>
            <div class="p-3 border rounded-lg text-center">
              <h4 class="font-medium text-sm text-gray-500">Emoción más frecuente</h4>
              <p id="stats-top-emotion" class="text-2xl font-bold">-</p>
            </div>
            <div class="p-3 border rounded-lg text-center">
              <h4 class="font-medium text-sm text-gray-500">Cuadrante dominante</h4>
              <p id="stats-dominant-quadrant" class="text-2xl font-bold">-</p>
            </div>
            <div class="p-3 border rounded-lg text-center">
              <h4 class="font-medium text-sm text-gray-500">Consistencia diaria</h4>
              <p id="stats-consistency" class="text-2xl font-bold">0%</p>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Gráfico de distribución por cuadrante -->
          <div class="bg-white rounded-lg shadow-md p-4">
            <canvas id="mood-chart" height="250"></canvas>
          </div>
          
          <!-- Gráfico de línea temporal -->
          <div class="bg-white rounded-lg shadow-md p-4">
            <canvas id="timeline-chart" height="250"></canvas>
          </div>
          
          <!-- Gráfico de distribución de emociones (radar) -->
          <div class="bg-white rounded-lg shadow-md p-4">
            <canvas id="emotion-radar" height="250"></canvas>
          </div>
          
          <!-- Gráfico de tendencias -->
          <div class="bg-white rounded-lg shadow-md p-4">
            <canvas id="mood-trends-chart" height="250"></canvas>
          </div>
        </div>
      `;
    }
  
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
      });
    }
    
    // Función para obtener un ID único para el estudiante
    function getStudentId() {
      // Verificar si ya existe un ID
      let studentId = localStorage.getItem('studentId');
      
      // Si no existe, crear uno nuevo
      if (!studentId) {
        studentId = 'student_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('studentId', studentId);
      }
      
      return studentId;
    }
    
    // Función para mostrar notificación
    function showNotification(message, type = 'success') {
      const notificationsContainer = document.getElementById('notifications-container') || document.body;
      
      const notification = document.createElement('div');
      notification.className = `p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`;
      notification.textContent = message;
      
      notificationsContainer.appendChild(notification);
      
      // Remover después de 5 segundos
      setTimeout(() => {
        notification.remove();
      }, 5000);
    }
  });
