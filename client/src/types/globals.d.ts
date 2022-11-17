export {};

declare global {
  interface Criteria {
    genre: string;
    typeEntertainment: string;
    rating: number | null;
    keyword: string;
  }
}
