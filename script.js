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
    const exportButton = document.getElementById('export-button');
    const emailDataButton = document.getElementById('email-data-button');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    const goalsListContainer = document.getElementById('goals-list');
    const noGoalsMessage = document.getElementById('no-goals-message');
    
    const moodChartCanvas = document.getElementById('mood-chart');
  
    // Verificar que todos los elementos existen
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
        'export-button': exportButton,
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
  
    // Exportar datos
    if (exportButton) {
      exportButton.addEventListener('click', handleExport);
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
  
    // Inicializar
    checkElements();
    updateHistory();
    updateGoalsList();
    console.log('Estado del historial:', moodHistory.length, 'registros');
    console.log('Estado de objetivos:', goalHistory.length, 'objetivos');
    // Intentar sincronizar registros pendientes
    syncPendingMoods();
  
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
    
      // Enviar a Google Sheets
      console.log('Enviando datos a Google Sheets:', newEntry);
      sendToGoogleSheets(newEntry);
  
      // Actualizar historial
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
  
    function handleExport() {
      const dataStr = JSON.stringify(moodHistory, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'mood_history.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
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
      
      window.location.href = `mailto:kareng@tec.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    
    function contactMentor() {
      const defaultName = localStorage.getItem('studentName') || "Estudiante";
      const studentName = prompt("Ingresa tu nombre:", defaultName) || defaultName;
      const message = prompt("¿Qué te gustaría compartir con tu mentora?") || "Me gustaría hablar sobre mi estado de ánimo actual.";
      
      const subject = `[Mood Meter] ${studentName} necesita apoyo`;
      const body = `Hola mentora,\n\nSoy ${studentName}. ${message}\n\nGracias.`;
      
      window.location.href = `mailto:kareng@tec.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
        // Añadir después de los otros event listeners
        if (document.getElementById('clear-history-button')) {
            document.getElementById('clear-history-button').addEventListener('click', clearMoodHistory);
        }
        
        // Añadir la función de borrado
        function clearMoodHistory() {
            if (confirm('¿Estás seguro de que quieres borrar todo tu historial de estados de ánimo? Esta acción no se puede deshacer.')) {
            // Borrar solo del almacenamiento local (no de Google Sheets)
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
    // Añadir después de la sección de event listeners
    if (document.getElementById('sync-button')) {
        document.getElementById('sync-button').addEventListener('click', syncPendingMoods);
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
  
  function updateMoodChart() {
    if (!moodChartCanvas) {
      console.error('Canvas para el gráfico no encontrado');
      return;
    }
    
    // Solo proceder si hay datos y el canvas existe
    if (moodHistory.length === 0) {
      console.log('No hay datos para crear el gráfico');
      return;
    }
    
    console.log('Actualizando gráfico de estados de ánimo');
    
    // Preparar datos para el gráfico
    const lastEntries = [...moodHistory].reverse().slice(0, 10);
    
    const quadrantCounts = {
      red: 0,
      yellow: 0,
      blue: 0,
      green: 0
    };
    
    // Contar ocurrencias de cada cuadrante
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
    
    // Crear gráfico (limpiar canvas primero si ya hay un gráfico)
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
              text: 'Distribución de tus estados de ánimo'
            }
          }
        }
      });
      console.log('Gráfico creado correctamente');
    } catch (error) {
      console.error('Error al crear el gráfico:', error);
    }
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
  
  // Función para enviar datos a Google Sheets con mejor manejo de errores
  function sendToGoogleSheets(moodData) {
    // URL de tu implementación de Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz_0GcVXNo8VHFrZ313pPDbRjMc5zfCDY20qSgz4v0dN4fzQ-s-y2PExOaWJ1P5T6gd/exec';
    
    // Datos a enviar (en formato JSON y FormData para mayor compatibilidad)
    const jsonData = {
      timestamp: new Date().toISOString(),
      studentId: getStudentId(),
      studentName: localStorage.getItem('studentName') || '',
      studentGroup: localStorage.getItem('studentGroup') || '',
      emotion: moodData.emotion,
      emoji: moodData.emoji,
      quadrant: moodData.quadrant,
      notes: moodData.notes || ''
    };
    
    // Para depuración
    console.log('Enviando datos a Google Sheets:', jsonData);
    
    // Intentar primero con JSON
    fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
      if (!response.ok) {
        // Si falla con JSON, intentar con FormData
        console.log('Intentando con FormData...');
        const formData = new FormData();
        
        // Añadir todos los datos como campos de formulario
        Object.entries(jsonData).forEach(([key, value]) => {
          formData.append(key, value);
        });
        
        return fetch(scriptURL, { 
          method: 'POST', 
          body: formData 
        });
      }
      return response;
    })
    .then(response => {
      console.log('Success!', response);
      showNotification('Datos enviados correctamente a tu mentora');
    })
    .catch(error => {
      console.error('Error al enviar datos:', error.message);
      showNotification('Error al enviar datos. Guardados localmente.', 'error');
      
      // Guardar en localStorage como respaldo
      saveMoodLocally(moodData);
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
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
  
  // Función auxiliar para guardar datos localmente como respaldo
  function saveMoodLocally(moodData) {
    // Obtener datos existentes
    const localBackup = JSON.parse(localStorage.getItem('moodBackup') || '[]');
    
    // Añadir el nuevo registro
    localBackup.push({
      ...moodData,
      pendingSync: true
    });
    
    // Guardar actualización
    localStorage.setItem('moodBackup', JSON.stringify(localBackup));
  }
  
  // Función para sincronizar estados de ánimo pendientes
  function syncPendingMoods() {
    const pendingMoods = JSON.parse(localStorage.getItem('moodBackup') || '[]');
    
    if (pendingMoods.length === 0) {
      console.log('No hay registros pendientes para sincronizar');
      return;
    }
    
    console.log(`Intentando sincronizar ${pendingMoods.length} registros pendientes`);
    
    // Filtrar solo los pendientes de sincronización
    const toSync = pendingMoods.filter(mood => mood.pendingSync);
    
    // Intentar sincronizar cada uno
    let syncedCount = 0;
    
    toSync.forEach(async (mood, index) => {
      try {
        await new Promise(resolve => setTimeout(resolve, index * 1000)); // Espaciar las solicitudes
        sendToGoogleSheets(mood);
        mood.pendingSync = false;
        syncedCount++;
      } catch (error) {
        console.error('Error syncing mood:', error);
      }
    });
    
    // Actualizar el almacenamiento local
    localStorage.setItem('moodBackup', JSON.stringify(pendingMoods));
    
    if (syncedCount > 0) {
      showNotification(`Se sincronizaron ${syncedCount} registros pendientes`);
    }
  }
});
