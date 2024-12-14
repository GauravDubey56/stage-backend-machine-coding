export const genre = [
  'Action',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Romance',
  'SciFi',
  'Crime',
  'Thriller',
  'Adventure',
  'Animation',
  'Mystery',
  'Biography',
  'History',
];

export const contentType = ['Movie', 'TVShow'];

export enum ContentType {
  Movie = 'Movie',
  TVShow = 'TVShow',
}

export const getEnv = () => {
  return {
    mongoUri:
      'mongodb+srv://compass:searchguy@cluster0.jasyd.mongodb.net/StageOttDB?retryWrites=true&w=majority&appName=Cluster0',
    jwtSecret: 'stage_ottttt',
  };
};
