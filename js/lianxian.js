let currentQuestion = null;  
  
document.querySelectorAll('.question').forEach(question => {  
    question.addEventListener('click', function() {  
        if (currentQuestion) {  
            // Clear previous line if exists  
            const previousLine = document.querySelector('svg line');  
            if (previousLine) {  
                previousLine.remove();  
            }  
        }  
  
        currentQuestion = this;  
        // Highlight the current question (optional)  
        currentQuestion.style.backgroundColor = 'lightblue';  
    });  
});  
  
document.querySelectorAll('.answer').forEach(answer => {  
    answer.addEventListener('click', function() {  
        if (!currentQuestion) {  
            alert('Please click a question first!');  
            return;  
        }  
  
        const questionId = currentQuestion.getAttribute('data-id');  
        const correctAnswerId = this.getAttribute('data-correct');  
  
        if (questionId === correctAnswerId) {  
            // Draw the line if the answer is correct  
            drawLine(currentQuestion, this);  
            alert('Correct!');  
        } else {  
            alert('Incorrect!');  
        }  
  
        // Optionally, reset currentQuestion after validation  
        currentQuestion = null;  
        // Remove highlight from question (optional)  
        if (currentQuestion) {  
            currentQuestion.style.backgroundColor = '';  
        }  
    });  
});  
  
function drawLine(questionElement) {  
    // 假设答案元素是问题元素的下一个同级元素  
    const answerElement = questionElement.nextElementSibling;  
    if (!answerElement || !answerElement.classList.contains('answer')) {  
        console.error('无法找到对应的答案元素');  
        return;  
    }  
  
    const svg = document.querySelector('svg');  
    svg.style.display = 'block';  
    svg.style.position = 'absolute';  
    svg.style.top = '0';  
    svg.style.left = '0';  
    svg.style.width = '100%';  
    svg.style.height = '100%';  
    svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);  
  
    // 清除之前的线条（如果有）  
    svg.innerHTML = ''; // 简单但有效的方式  
  
    // 创建线条  
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');  
    line.setAttribute('stroke', 'black');  
    line.setAttribute('stroke-width', '2');  
  
    // 计算位置和尺寸  
    const questionRect = questionElement.getBoundingClientRect();  
    const answerRect = answerElement.getBoundingClientRect();  
  
    // 连线起点：问题右侧中点  
    const lineX1 = questionRect.right;  
    const lineY1 = questionRect.top + questionRect.height / 2;  
  
    // 连线终点：答案左侧中点  
    const lineX2 = answerRect.left;  
    const lineY2 = answerRect.top + answerRect.height / 2;  
  
    // 设置线条属性  
    line.setAttribute('x1', lineX1);  
    line.setAttribute('y1', lineY1);  
    line.setAttribute('x2', lineX2);  
    line.setAttribute('y2', lineY2);  
  
    // 将线条添加到SVG中  
    svg.appendChild(line);  
}
