const green = '#00B977'
const magenta = '#E01C9C'
const blue = '#001A66'
const yellow = '#FFC923'

const primary = '#00B977'
const black = '#151515'
const white = 'white'

class Color {
  constructor(color, text, arrow) {
    this.color = color
    this.text = text
    this.arrow = arrow
  }

  getTextColor = (index = 0) => this.text[index]

  getArrowColor = (index = 0) => this.arrow[index]
}

export default {
  magenta: new Color(magenta, [white], [white]),
  green: new Color(green, [white], [yellow]),
  blue: new Color(blue, [white], [yellow]),
  white: new Color(white, [magenta], [magenta]),
  yellow: new Color(yellow, [white], [magenta]),
  black: new Color(black, [white], [white]),
}
