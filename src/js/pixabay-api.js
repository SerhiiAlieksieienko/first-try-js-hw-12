import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49647970-80f040e49b2c31806d94ce79c';

export async function getImagesByQuery(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images');
  }
}

getImagesByQuery();

