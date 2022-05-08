export const serverPath = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
export const maxCharactersInput = 300;
