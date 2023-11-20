import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39913816-3a64d839dc0a58f3e1831719d';

const fetchImages = async ({ query, page, perPage = 12 }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );
    return response.data.hits;
  } catch (error) {
    throw error;
  }
};
export default fetchImages;
