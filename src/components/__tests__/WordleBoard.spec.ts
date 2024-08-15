import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '../../settings'
describe('WordleBoard', () => {
  let wordOfTheDay = 'hello'
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
  })

  async function makeGuess(guess: string) {
    const guessInput = wrapper.find('input[type="text"]')
    await guessInput.setValue(guess)
    await guessInput.trigger('keydown.enter')
  }
  
  test('a victory message is displayed when the user makes a guess that matches the word of the day', async () => {
    await makeGuess(wordOfTheDay)

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  test('a defeat message is displayed when the user makes a guess that matches the word of the day', async () => {
    await makeGuess('goodbye')

    expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
  })

  test('no end-of-game message is displayed when the user makes a guess that matches the word of the day', async () => {  
    expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
    expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  })

  test('if a word of the day does not have exactly 5 characters, a warning is emitted', async () => {
    vi.spyOn(console, 'warn')

    mount(WordleBoard, { props: { wordOfTheDay: 'helloo' } })
    
    expect(console.warn).toHaveBeenCalled()
  })
})
