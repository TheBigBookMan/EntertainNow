export {};

declare global {
  interface Criteria {
    genre: string;
    typeEntertainment: string;
    rating: number;
    title: string;
  }

  interface MovieProps {
    image: string;
    title: string;
    description: string;
    imDbRating: string;
    contentRating: string;
    genres: string;
    stars: string;
    plot: string;
  }
}
