import confetti from 'canvas-confetti'

export const launchConfetti = (seconds = 10): void => {
  const end = Date.now() + seconds * 1000

  // go Buckeyes!
  const colors = ['#34495E', '#41B883']

  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}
