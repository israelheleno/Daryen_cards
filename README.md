# Daryen - Jogo de Cartas

Um aplicativo web offline para o jogo de tabuleiro Daryen, com cenário de floresta misteriosa e aventura.

## Características

- **100 cartas únicas** com diferentes efeitos e ações
- **Funcionamento offline** - funciona sem conexão com a internet
- **Design temático** inspirado em floresta misteriosa
- **Animações fluidas** com efeito de flip nas cartas
- **Responsivo** - funciona em desktop, tablet e celular
- **PWA (Progressive Web App)** - pode ser instalado como aplicativo

## Como usar

### Instalação Local

1. Extraia todos os arquivos em uma pasta
2. Abra um terminal na pasta e execute:
   ```bash
   python -m http.server 8000
   ```
   ou
   ```bash
   python3 -m http.server 8000
   ```
3. Abra o navegador e acesse: `http://localhost:8000`

### Funcionalidades

- **Botão "Próximo" (Verde)**: Sorteia uma nova carta do baralho
- **Botão "Reiniciar" (Vermelho)**: Reinicia o jogo, embaralhando todas as cartas
- **Lista de cartas**: Mostra todas as cartas que já foram sorteadas
- **Animação de flip**: A carta vira com animação suave ao ser sorteada

### Instalação como PWA

1. Abra o aplicativo no navegador
2. No Chrome/Edge: Clique no ícone de instalação na barra de endereços
3. No Firefox: Menu > Instalar aplicativo
4. No Safari (iOS): Compartilhar > Adicionar à Tela Inicial

## Arquivos inclusos

- `index.html` - Estrutura principal do aplicativo
- `style.css` - Estilos e animações
- `script.js` - Lógica do jogo
- `cards.json` - Base de dados com as 100 cartas
- `card_back.jpeg` - Imagem do verso da carta
- `manifest.json` - Configuração do PWA
- `sw.js` - Service Worker para funcionamento offline
- `icon-192x192.png` - Ícone do aplicativo (192x192)
- `icon-512x512.png` - Ícone do aplicativo (512x512)

## Compatibilidade

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Navegadores móveis modernos

## Tecnologias utilizadas

- HTML5
- CSS3 (com animações e gradientes)
- JavaScript ES6+
- Service Workers
- Web App Manifest
- Google Fonts (Cinzel)

## Desenvolvido para

Jogo de tabuleiro Daryen - Um jogo com cenário de floresta misteriosa e aventura.

---

**Nota**: Para melhor experiência, use o aplicativo através de um servidor HTTP local conforme as instruções acima.

