function fixStory() {
    const title = document.createElement('h1');
    title.textContent = 'Little Red Riding Hood';
    
    const article = document.querySelector('article');
    document.body.insertBefore(title, article);
    
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        if (p.textContent.includes('The frog just sat there')) {
            p.remove();
        }
    });
    
    let earsParagraph = null;
    let armsParagraph = null;
    let earsQuestion = null;
    let armsQuestion = null;
    
    const allParagraphs = document.querySelectorAll('p');
    allParagraphs.forEach(p => {
        if (p.textContent.includes('why are your ears so big')) {
            earsQuestion = p;
        } else if (p.textContent.includes('It is the better to hear you')) {
            earsParagraph = p;
        } else if (p.textContent.includes('why are your arms so big')) {
            armsQuestion = p;
        } else if (p.textContent.includes('It is the better to embrace you')) {
            armsParagraph = p;
        }
    });
    
    if (earsQuestion && earsParagraph && armsQuestion && armsParagraph) {
        const earsQuestionNext = earsQuestion.nextSibling;
        const armsQuestionNext = armsQuestion.nextSibling;
        
        earsQuestion.parentNode.insertBefore(armsQuestion, earsQuestionNext);
        earsQuestion.parentNode.insertBefore(armsParagraph, armsQuestionNext);
        
        armsQuestion.parentNode.insertBefore(earsQuestion, armsQuestionNext);
        armsQuestion.parentNode.insertBefore(earsParagraph, armsQuestionNext);
    }
    
    allParagraphs.forEach(p => {
        if (p.textContent.includes('THE END')) {
            p.textContent = 'However, the good hunter was passing by and heard what was happening. He was able to cut open the wolf and save both girl and granny.';
        }
    });
}

document.addEventListener('keydown', function(event) {
    fixStory();
});