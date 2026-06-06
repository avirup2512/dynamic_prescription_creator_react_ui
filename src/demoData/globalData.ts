import type { InputEntityRecord } from './globalStore'

const globalData: {
  inputs: {
    input: InputEntityRecord[]
    dropdown: InputEntityRecord[]
    textbox: InputEntityRecord[]
  }
} = {
  inputs: {
    input: [
      { id: 1, name: 'Address', value: '54,sukantasarani' },
      { id: 2, name: 'Phone number', value: '7044709863' },
    ],
    dropdown: [
      {
        id: 1,
        name: 'Seeds',
        values: ['Pumpkin seeds', 'Chia seeds', 'sunflower seeds', 'Jeera and Methi'],
      },
      { id: 2, name: 'Misc', values: ['Jeera and Methi', 'Curd'] },
    ],
    textbox: [
      {
        id: 1,
        name: 'Address',
        value: '54,sukantasarani, postoffice:itelgachha, kolkata:700079',
      },
    ],
  },
}

export default globalData
