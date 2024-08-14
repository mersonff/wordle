import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE } from '../../settings'
describe('WordleBoard', () => {
  let wordOfTheDay = 'hello'
  
  it('a victory message is displayed when the user makes a guess that matches the word of the day', async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay } })

    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('hello')
    await guessInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  it('a defeat message is displayed when the user makes a guess that matches the word of the day', async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay } })

    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue('wrong')
    await guessInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain('Better luck next time!')
  })
})
