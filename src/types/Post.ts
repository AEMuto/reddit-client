import type {
  CreatedData,
  SubredditName,
  SubredditNamePrefixed,
  SubredditID,
  SubredditType,
  FlairTextColor,
  AuthorFlairType,
  FlairRichtext,
  Media,
  MediaMetadata,
  GalleryData,
  Preview,
  PostHint,
} from "./RedditApiTypes.ts";

/**
 * Les données (`data`) d'un objet Post (kind: "t3").
 * Fusionne les champs de DataPost.ts et DataSearch.ts.
 */
export interface PostData extends CreatedData {
  title: string;
  selftext: string;
  selftext_html: string | null;
  num_comments: number;
  permalink: string;
  url: string;
  domain: string;
  thumbnail: string;
  thumbnail_height: number | null;
  thumbnail_width: number | null;
  is_self: boolean;
  is_video: boolean;
  is_gallery?: boolean;
  is_original_content: boolean;
  is_crosspostable: boolean;
  is_reddit_media_domain: boolean;
  is_robot_indexable: boolean;
  is_meta: boolean;
  over_18: boolean;
  spoiler: boolean;
  stickied: boolean;
  locked: boolean;
  hidden: boolean;
  pinned: boolean;
  archived: boolean;
  clicked: boolean;
  visited: boolean;
  saved: boolean;
  no_follow: boolean;
  send_replies: boolean;
  contest_mode: boolean;

  // --- Subreddit ---
  subreddit: SubredditName;
  subreddit_id: SubredditID;
  subreddit_name_prefixed: SubredditNamePrefixed;
  subreddit_subscribers: number;
  subreddit_type: SubredditType;

  // --- Flairs (Auteur) ---
  author_flair_text: string | null;
  author_flair_text_color: FlairTextColor | null;
  author_flair_type: AuthorFlairType;
  author_flair_richtext: FlairRichtext[];
  author_flair_background_color: string | null;
  author_flair_css_class: string | null;
  author_flair_template_id: string | null;

  // --- Flairs (Post) ---
  link_flair_text: string | null;
  link_flair_text_color: FlairTextColor | null;
  link_flair_type: AuthorFlairType;
  link_flair_richtext: FlairRichtext[];
  link_flair_background_color: string | null;
  link_flair_css_class: string | null;
  link_flair_template_id?: string;

  // --- Votes & Awards ---
  upvote_ratio: number;
  total_awards_received: number;
  gilded: number;
  awarders: unknown[];
  all_awardings: unknown[];
  gildings: Record<string, unknown>;

  // --- Média ---
  media: Media | null;
  secure_media: Media | null;
  media_embed: Record<string, unknown>;
  secure_media_embed: Record<string, unknown>;
  media_metadata?: MediaMetadata;
  gallery_data?: GalleryData;
  preview?: Preview;
  post_hint?: PostHint;
  url_overridden_by_dest?: string;

  // --- Divers ---
  allow_live_comments: boolean;
  discussion_type: string | null;
  suggested_sort: string | null;
  content_categories: string[] | null;
  category: string | null;
  wls: number | null;
  pwls: number | null;
  num_crossposts: number;
  view_count: number | null;
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
  is_created_from_ads_ui: boolean;
  author_is_blocked: boolean;
  author_patreon_flair: boolean;
  author_premium: boolean;
  can_gild: boolean;
  can_mod_post: boolean;
  media_only: boolean;
  quarantine: boolean;
}
