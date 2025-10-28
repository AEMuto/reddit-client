import type { Listing } from "./Listing.ts";
import type { PostData } from "./Post.ts";
import type { SubredditData } from "./Subreddit.ts";
import type { CommentData, MoreData } from "./Comment.ts";

/**
 * Réponse de:
 * - `GET /subreddits.json`
 */
export type SubredditListResponse = Listing<SubredditData>;

/**
 * Réponse de:
 * - `GET /search.json?q=...`
 * - `GET /r/{{subreddit}}.json`
 * - `GET /` (Frontpage)
 */
export type PostListResponse = Listing<PostData>;

/**
 * Réponse de:
 * - `GET /r/{{subreddit}}/comments/{{post_id}}.json`
 *
 * C'est un tuple (tableau de 2 éléments) :
 * - [0]: Un Listing contenant UN SEUL Post (le post original).
 * - [1]: Un Listing contenant les commentaires (Comment) et les "More".
 */
export type CommentResponse = [
  Listing<PostData>,
  Listing<CommentData | MoreData>,
];
