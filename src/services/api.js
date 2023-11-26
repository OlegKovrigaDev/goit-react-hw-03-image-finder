import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39913816-3a64d839dc0a58f3e1831719d';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const fetchGalleryItems = async (
  nextQuery,
  nextPage,
  onSuccess,
  onError
) => {
  try {
    const response = await instance.get('', {
      params: {
        q: nextQuery,
        page: nextPage,
        per_page: 12,
      },
    });

    const data = response.data;
    onSuccess(data);
  } catch (error) {
    onError();
  }
};
