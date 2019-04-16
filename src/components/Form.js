import React from 'react'
import styled from 'styled-components'
import { sectionSpace, titleFont, gutter, bgColor } from '../vars'
import Grid from './Grid'
import HackerTitle from './HackerTitle'
import BorderButton from './BorderButton'
import AnimateIns from './AnimateIns'
import serialize from 'form-serialize'
import Loader from './Loader'

const Container = styled.div`
  margin: ${sectionSpace} 0;
`
const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`
const Input = styled.input`
  display: block;
  margin: ${gutter * 2}px 0;
`
const TextArea = styled.textarea`
  display: block;
  margin-bottom: ${gutter * 2}px;
`

const Screen = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${bgColor};
  z-index: 5;
  align-items: center;
  justify-content: center;
  display: flex;
`

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class Form extends React.Component {
  form = React.createRef()

  state = {
    message: '',
    email: '',
    loading: false,
    done: false,
  }

  onSubmit = async e => {
    try {
      this.setState({
        loading: true,
      })

      e.preventDefault()

      const el = this.form.current
      const { formName = 'contact' } = this.props
      const { loading, bot, ...data } = this.state

      if (bot) {
        return
      }

      console.log(encode({ 'form-name': formName, ...data }))

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': formName, ...data }),
      })

      this.setState({
        loading: false,
        message: '',
        email: '',
        done: true,
      })
    } catch (e) {
      console.log(e)
      alert(e)
      this.setState({
        loading: false,
        message: '',
        email: '',
      })
    }
  }

  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  render() {
    return null
    const { title = 'Contact us!' } = this.props
    const { loading, done } = this.state
    const showScreen = loading || done

    return (
      <Container>
        <Grid>
          <Wrapper>
            {showScreen && (
              <Screen>
                {loading && <Loader />}
                {done && <h2>Thanks for contacting us!</h2>}
              </Screen>
            )}
            <form
              onSubmit={this.onSubmit}
              name="contact"
              method="post"
              netlify="true"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              ref={this.form}
            >
              <input type="hidden" name="form-name" value="contact" />
              <AnimateIns>
                <HackerTitle title={title} as="h2" />
                <input
                  hidden
                  name="bot-field"
                  onChange={e => this.handleChange('bot', e.target.value)}
                />
                <Input
                  onChange={e => this.onChange('email', e.target.value)}
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  required
                  type="email"
                />
                <TextArea
                  value={this.state.message}
                  onChange={e => this.onChange('message', e.target.value)}
                  name="message"
                  placeholder="Message"
                  required
                />
                <BorderButton type="submit">Send</BorderButton>
              </AnimateIns>
            </form>
          </Wrapper>
        </Grid>
      </Container>
    )
  }
}

export default Form
