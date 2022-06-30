const form = document.querySelector('.formulario')
const input = document.querySelector('.player')

const enviarForm = (event) => {
  event.preventDefault()
  localStorage.setItem('player', JSON.stringify(input.value))
  window.location = 'jogo.html'
}

form.addEventListener('submit', enviarForm)