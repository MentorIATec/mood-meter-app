// script.js
document.addEventListener('DOMContentLoaded', function() {
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
  
    // Estado actual
    let currentQuadrant = null;
    let selectedEmotion = null;
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
  
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
    
    const historyContainer = document.getElementById('history-container');
    const historyList = document.getElementById('history-list');
    const exportButton = document.getElementById('export-button');
  
    // Añadir event listeners a los cuadrantes
    Object.keys(quadrantElements).forEach(quadrant => {
      quadrantElements[quadrant].addEventListener('click', () => {
        currentQuadrant = quadrant;
        showEmotionsPanel(quadrant);
      });
    });
  
    // Cerrar panel de emociones
    closeEmotionsBtn.addEventListener('click', () => {
      emotionsPanel.classList.add('hidden');
    });
  
    // Enviar formulario
    submitButton.addEventListener('click', handleSubmit);
  
    // Exportar datos
    exportButton.addEventListener('click', handleExport);
  
    // Inicializar historial
    updateHistory();
  
    // Funciones
    function showEmotionsPanel(quadrant) {
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
  
      // Crear nuevo registro
      const newEntry = {
        id: Date.now(),
        emotion: selectedEmotion.name,
        emoji: selectedEmotion.emoji,
        quadrant: selectedEmotion.quadrant,
        notes: notesTextarea.value.trim(),
        timestamp: new Date().toISOString()
      };
  
      // Actualizar historial
      moodHistory = [newEntry, ...moodHistory];
      localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
      
      // Mostrar mensaje de éxito
      successMessage.classList.remove('hidden');
      
      // Limpiar formulario
      selectedEmotion = null;
      selectedEmotionContainer.classList.add('hidden');
      notesTextarea.value = '';
      
      // Actualizar historial
      updateHistory();
      
      // Ocultar mensaje de éxito después de unos segundos
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 3000);
    }
  
    function updateHistory() {
      if (moodHistory.length === 0) {
        historyContainer.classList.add('hidden');
        return;
      }
      
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
  });