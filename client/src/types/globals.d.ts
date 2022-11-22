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

  interface CriteriaState {
    criteria: Criteria;
    setCriteria: (criteria: Criteria) => void;
  }

  interface UserInfo {
    username: string;
    email: string;
    password: string;
  }
}
