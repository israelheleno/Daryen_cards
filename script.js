document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("card");
    const cardText = document.getElementById("card-text");
    const nextBtn = document.getElementById("next-btn");
    const resetBtn = document.getElementById("reset-btn");
    const drawnList = document.getElementById("drawn-list");

    let allCards = [];
    let availableCards = [];
    let drawnCards = [];

    // Carrega as cartas do arquivo JSON
    fetch("cards.json")
        .then(response => response.json())
        .then(data => {
            allCards = data;
            shuffleAndReset();
        });

    // Embaralha as cartas e reinicia o jogo
    function shuffleAndReset() {
        availableCards = [...allCards];
        drawnCards = [];
        updateDrawnList();
        card.classList.remove("flipped");
        
        // Embaralha o array de cartas disponíveis usando o algoritmo Fisher-Yates melhorado
        // Executa múltiplas passadas para garantir um embaralhamento mais eficaz
        for (let pass = 0; pass < 3; pass++) {
            for (let i = availableCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableCards[i], availableCards[j]] = [availableCards[j], availableCards[i]];
            }
        }
        
        // Embaralhamento adicional usando uma abordagem diferente
        const tempArray = [];
        while (availableCards.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCards.length);
            tempArray.push(availableCards.splice(randomIndex, 1)[0]);
        }
        availableCards = tempArray;
    }

    // Atualiza a lista de cartas que já saíram
    function updateDrawnList() {
        drawnList.innerHTML = "";
        drawnCards.forEach(drawnCard => {
            const li = document.createElement("li");
            // Formato: Tarefa primeiro, premiação em linha separada (se houver)
            if (drawnCard.prize && drawnCard.prize.trim() !== "") {
                li.innerHTML = `<strong>${drawnCard.task}</strong><br><em>${drawnCard.prize}</em>`;
            } else {
                li.innerHTML = `<strong>${drawnCard.task}</strong>`;
            }
            drawnList.appendChild(li);
        });
    }

    // Sorteia a próxima carta
    nextBtn.addEventListener("click", () => {
        if (availableCards.length > 0) {
            const drawnCard = availableCards.pop();
            drawnCards.push(drawnCard);
            
            // Mostrar o conteúdo da carta no formato: tarefa primeiro, premiação em linha separada
            let cardContent = `<strong>${drawnCard.task}</strong>`;
            if (drawnCard.prize && drawnCard.prize.trim() !== "") {
                cardContent += `<br><br><em>${drawnCard.prize}</em>`;
            }
            
            card.classList.remove("flipped"); // Garante que a carta comece virada para trás
            setTimeout(() => {
                cardText.innerHTML = cardContent;
                card.classList.add("flipped"); // Vira a carta para mostrar o conteúdo
            }, 300); // Pequeno atraso para a animação de virar para trás ser visível
            updateDrawnList();
        } else {
            cardText.innerHTML = "<strong>Todas as cartas já foram sorteadas!</strong>";
        }
    });

    // Reinicia o jogo
    resetBtn.addEventListener("click", () => {
        shuffleAndReset();
        cardText.innerHTML = ""; // Limpa o texto da carta ao reiniciar
    });

    // Service Worker para funcionalidade offline
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").then(registration => {
            console.log("Service Worker registrado com sucesso:", registration);
        }).catch(error => {
            console.log("Falha ao registrar o Service Worker:", error);
        });
    }
});

