import type {
  CreatedData,
  SubredditName,
  SubredditNamePrefixed,
  SubredditID,
  SubredditType,
  FlairTextColor,
  AuthorFlairType,
  FlairRichtext,
  FullName,
} from "./RedditApiTypes.ts";
import type { Child, Listing } from "./Listing.ts";

/**
 * Les données (`data`) d'un objet "More" (kind: "more").
 * Utilisé pour "Charger plus de commentaires" ou "Continuer ce fil".
 */
export interface MoreData {
  count: number;
  name: string; // "t1_..."
  id: string; // "..."
  parent_id: FullName; // "t1_..." ou "t3_..."
  depth: number;
  /** Liste des IDs des enfants à charger */
  children: string[];
}

/**
_Un objet_ "More" (kind: "more").
 */
export type More = Child<MoreData>;

/**
 * Les données (`data`) d'un objet Commentaire (kind: "t1").
 */
export interface CommentData extends CreatedData {
  body: string;
  body_html: string;
  parent_id: FullName; // "t1_..." ou "t3_..."
  link_id: FullName; // Toujours "t3_..." (le post)
  depth: number;
  is_submitter: boolean;
  stickied: boolean;
  locked: boolean;
  archived: boolean;
  collapsed: boolean;
  collapsed_reason: string | null;
  collapsed_reason_code: string | null;
  collapsed_because_crowd_control: string | null;
  controversiality: number;
  send_replies: boolean;
  no_follow: boolean;
  saved: boolean;
  score_hidden: boolean;
  comment_type: string | null; // ex: "REPLY"

  // --- Subreddit ---
  subreddit: SubredditName;
  subreddit_id: SubredditID;
  subreddit_name_prefixed: SubredditNamePrefixed;
  subreddit_type: SubredditType;

  // --- Flairs (Auteur) ---
  author_flair_text: string | null;
  author_flair_text_color: FlairTextColor | null;
  author_flair_type: AuthorFlairType;
  author_flair_richtext: FlairRichtext[];
  author_flair_background_color: string | null;
  author_flair_css_class: string | null;
  author_flair_template_id: string | null;

  // --- Votes & Awards ---
  total_awards_received: number;
  gilded: number;
  awarders: unknown[];
  all_awardings: unknown[];
  gildings: Record<string, unknown>;

  // --- Divers ---
  approved_at_utc: number | null;
  approved_by: string | null;
  banned_at_utc: number | null;
  banned_by: string | null;
  mod_note: string | null;
  mod_reason_by: string | null;
  mod_reason_title: string | null;
  mod_reports: unknown[];
  num_reports: number | null;
  removal_reason: string | null;
  removed_by_category: string | null;
  removed_by: string | null;
  report_reasons: string | null;
  user_reports: unknown[];
  treatment_tags: unknown[];
  associated_award: unknown | null;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean;
  author_cakeday?: boolean;
  can_gild: boolean;
  can_mod_post: boolean;
  distinguished: string | null; // "moderator", "admin", null
  top_awarded_type: string | null;
  unrepliable_reason: string | null;

  /**
   * Les réponses à ce commentaire.
   * C'est un nouveau Listing, qui peut contenir d'autres Commentaires ou
   * des objets "More".
   * Si pas de réponse, l'API retourne `""` (chaîne vide).
   */
  replies: Listing<CommentData | MoreData> | "" | undefined;
}

/**
_Un objet_ Commentaire (kind: "t1").
 */
export type Comment = Child<CommentData>;
