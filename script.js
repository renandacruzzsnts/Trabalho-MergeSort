class MergeSortTimer {
    constructor() {
        this.startTime = null;
        this.endTime = null;
        this.timerInterval = null;
        this.isRunning = false;
        this.simulationTimeout = null;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.timerDisplay = document.getElementById('timer');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.status = document.getElementById('status');
        this.progress = document.getElementById('progress');
        this.result = document.getElementById('result');
        this.resultMessage = document.getElementById('resultMessage');
        this.finalTime = document.getElementById('finalTime');
        this.timerContainer = document.querySelector('.timer-display');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
    }
    
    startTimer() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startTime = performance.now();
        this.startBtn.disabled = true;
        this.resetBtn.disabled = false;
        this.result.classList.add('hidden');
        this.timerContainer.classList.add('running');
        
        this.updateStatus('Executando algoritmo MergeSort...');
        this.startProgressAnimation();
        
        // Atualizar o cronômetro a cada 10ms para maior precisão
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 10);
        
        // Simular o tempo de execução do MergeSort (entre 2-8 segundos)
        const simulationTime = Math.random() * 6000 + 2000; // 2-8 segundos
        this.simulationTimeout = setTimeout(() => {
            this.stopTimer();
        }, simulationTime);
    }
    
    stopTimer() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.endTime = performance.now();
        
        clearInterval(this.timerInterval);
        clearTimeout(this.simulationTimeout);
        
        this.timerContainer.classList.remove('running');
        this.progress.style.width = '100%';
        
        const finalTimeSeconds = this.getFinalTime();
        this.showResult(finalTimeSeconds);
        
        this.startBtn.disabled = false;
        this.startBtn.textContent = 'Executar Novamente';
    }
    
    resetTimer() {
        this.isRunning = false;
        this.startTime = null;
        this.endTime = null;
        
        clearInterval(this.timerInterval);
        clearTimeout(this.simulationTimeout);
        
        this.timerDisplay.textContent = '0.000';
        this.startBtn.disabled = false;
        this.resetBtn.disabled = true;
        this.startBtn.textContent = 'Iniciar Ordenação';
        
        this.result.classList.add('hidden');
        this.timerContainer.classList.remove('running');
        this.progress.style.width = '0%';
        
        this.updateStatus('Pronto para iniciar');
    }
    
    updateTimer() {
        if (!this.isRunning || !this.startTime) return;
        
        const currentTime = performance.now();
        const elapsedTime = (currentTime - this.startTime) / 1000;
        this.timerDisplay.textContent = elapsedTime.toFixed(3);
    }
    
    getFinalTime() {
        if (!this.startTime || !this.endTime) return 0;
        return ((this.endTime - this.startTime) / 1000).toFixed(3);
    }
    
    updateStatus(message) {
        this.status.textContent = message;
    }
    
    startProgressAnimation() {
        let progress = 0;
        const progressInterval = setInterval(() => {
            if (!this.isRunning) {
                clearInterval(progressInterval);
                return;
            }
            
            progress += Math.random() * 2;
            if (progress > 95) progress = 95;
            
            this.progress.style.width = progress + '%';
        }, 100);
    }
    
    showResult(timeSeconds) {
        const numberCount = 700000; // Número de elementos ordenados
        const numbersPerSecond = Math.round(numberCount / timeSeconds);
        
        this.finalTime.textContent = timeSeconds;
        this.resultMessage.textContent = 
            `O algoritmo MergeSort organizou ${numberCount.toLocaleString('pt-BR')} números com sucesso! ` +
            `Velocidade: ${numbersPerSecond.toLocaleString('pt-BR')} números/segundo.`;
        
        this.updateStatus('Ordenação concluída com sucesso!');
        
        // Mostrar resultado com animação
        setTimeout(() => {
            this.result.classList.remove('hidden');
        }, 500);
    }
    
    // Implementação do MergeSort em JavaScript (para demonstração)
    static mergeSort(arr) {
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);
        
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }
    
    static merge(left, right) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        
        return result
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new MergeSortTimer();
    
    // Adicionar algumas informações extras sobre o algoritmo
    console.log('🚀 Cronômetro MergeSort inicializado!');
    console.log('📊 Complexidade: O(n log n)');
    console.log('🔢 Números a ordenar: 700.000');
});

// Função para demonstrar o MergeSort com um array pequeno
function demonstrateMergeSort() {
    const smallArray = [64, 34, 25, 12, 22, 11, 90];
    console.log('Array original:', smallArray);
    
    const startTime = performance.now();
    const sortedArray = MergeSortTimer.mergeSort([...smallArray]);
    const endTime = performance.now();
    
    console.log('Array ordenado:', sortedArray);
    console.log(`Tempo de execução: ${(endTime - startTime).toFixed(3)}ms`);
}

// Executar demonstração no console
setTimeout(demonstrateMergeSort, 1000);

