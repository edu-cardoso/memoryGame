const inicio = performance.now()

const cardsContainer = document.querySelector('.cards-container')

const personagens = [
  'pokemon01',
  'pokemon02',
  'pokemon03',
  'pokemon04',
  'pokemon05',
  'pokemon06',
  'pokemon07',
  'pokemon08'
]

const criarElemento = (tag, className) => {
  let elemento = document.createElement(tag)
  elemento.className = className
  return elemento
}

let primeiraCarta = ''
let segundaCarta = ''

const verificaFimJogo = () => {
  let cartaVirada = document.querySelectorAll('.carta-virada')

  if (cartaVirada.length == 16) {
    const fim = performance.now() / 1000
    setTimeout(() => {
      alert('Parabéns!')
      let timer = document.querySelector('.timer')
      timer.innerText = `${localStorage.getItem('player')}: ${fim.toFixed(
        2
      )} segundos`
      let gameOver = document.querySelector('.gameOver')
      gameOver.style.display = 'flex'
    }, 2000)
  }
}

const checarCarta = () => {
  let primeiroPersonagem = primeiraCarta.getAttribute('data-personagem')
  let segundoPersonagem = segundaCarta.getAttribute('data-personagem')

  if (primeiroPersonagem == segundoPersonagem) {
    primeiraCarta.firstChild.classList.add('carta-virada')
    segundaCarta.firstChild.classList.add('carta-virada')

    primeiraCarta = ''
    segundaCarta = ''

    verificaFimJogo()
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove('revelar-carta')
      segundaCarta.classList.remove('revelar-carta')

      primeiraCarta = ''
      segundaCarta = ''
    }, 1500)
  }
}

const revelarCarta = ({ target }) => {
  if (target.parentNode.className.includes('revelar-carta')) {
    return
  }

  if (primeiraCarta == '') {
    target.parentNode.classList.add('revelar-carta')
    primeiraCarta = target.parentNode
  } else if (segundaCarta == '') {
    target.parentNode.classList.add('revelar-carta')
    segundaCarta = target.parentNode

    checarCarta()
  }
}

const criarCard = personagens => {
  let cards = criarElemento('div', 'cards')
  let front = criarElemento('div', 'face front')
  let back = criarElemento('div', 'face back')

  front.style.backgroundImage = `url('imagens/${personagens}.jpg')`

  setTimeout(() => {
    cards.addEventListener('click', revelarCarta)
    back.style.backgroundImage = `url('imagens/back.jpg')`
  }, 3000)

  cards.appendChild(front)
  cards.appendChild(back)

  cards.setAttribute('data-personagem', personagens)

  cardsContainer.appendChild(cards)

  return cards
}

const carregarJogo = () => {
  let duplicarPersonagens = [...personagens, ...personagens]

  let embaralharArray = duplicarPersonagens.sort(() => Math.random() - 0.5)

  embaralharArray.forEach(personagens => {
    let card = criarCard(personagens)
    cardsContainer.appendChild(card)
  })
}

carregarJogo()

const reiniciar = () => {
  window.location = 'index.html'
  cardsContainer.innerHTML = ''
  carregarJogo()
  let gameOver = document.querySelector('.gameOver')
  gameOver.style.display = 'none'
}
