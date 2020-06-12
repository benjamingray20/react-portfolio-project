import axios from 'axios'

export default async (lastName) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/players/${lastName}`) // eslint-disable-line no-undef

    return data
  } catch (error) {
    return {}
  }
}
