import type { Kind } from "./RedditApiTypes.ts";

/**
 * Un objet "Child" (enfant) de l'API Reddit.
 * C'est l'enveloppe de base pour les Posts, Commentaires, Subreddits, etc.
 * @template T Le type de l'objet de données (ex: PostData, CommentData).
 */
export type Child<T> = {
  /** Le "Kind" (type) de l'objet de données, ex: "t3" pour un Post. */
  kind: Kind;
  data: T;
};

/**
 * Les données d'un objet "Listing" (liste) de l'API Reddit.
 * @template T Le type des objets enfants dans ce listing (ex: Post, Comment).
 */
export type ListingData<T> = {
  /** L'ID complet (FullName) du dernier élément, pour la pagination. */
  after: string | null;
  /** L'ID complet (FullName) du premier élément, pour la pagination. */
  before: string | null;
  /** Le nombre d'enfants. */
  dist: number | null;
  modhash: string;
  geo_filter: string;
  /** La liste des objets enfants. */
  children: Child<T>[];
  facets?: Record<string, unknown>;
};

/**
 * Un objet "Listing" (liste) de l'API Reddit.
 * C'est l'enveloppe standard pour les listes de posts, commentaires, etc.
 * @template T Le type de l'objet de données (ex: PostData, CommentData).
 */
export type Listing<T> = {
  kind: "Listing";
  data: ListingData<T>;
};
