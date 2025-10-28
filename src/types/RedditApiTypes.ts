/**
 * Les "Kinds" (types) de base de l'API Reddit.
 * t1: Commentaire
 * t3: Post (Link/Submission)
 * t5: Subreddit
 * more: Objet "Charger plus de commentaires"
 * Listing: Une liste paginée d'autres objets
 */
export type Kind = "t1" | "t3" | "t5" | "more" | "Listing";

/**
 * Nom complet d'un objet, incluant son Kind (ex: "t3_1odeei4").
 */
export type FullName = `${Kind}_${string}`;

// --- Types de base des objets ---

/**
 * Données communes à presque tous les objets (t1, t3, t5...).
 */
export interface BaseData {
  id: string;
  /** Nom complet, ex: "t3_1odeei4" */
  name: FullName;
}

/**
 * Données communes aux objets "votables" (Posts et Commentaires).
 */
export interface VotableData extends BaseData {
  ups: number;
  downs: number;
  /**
   * Le vote de l'utilisateur actuel.
   * true = upvote, false = downvote, null = pas de vote.
   */
  likes: boolean | null;
  score: number;
}

/**
 * Données communes aux objets "créés" (Posts et Commentaires).
 */
export interface CreatedData extends VotableData {
  created: number;
  created_utc: number;
  author: string;
  author_fullname: FullName;
  /** Peut être `true` ou un timestamp (nombre) si édité */
  edited: boolean | number;
}

// --- Types de Subreddit ---

export type SubredditName = string;
export type SubredditNamePrefixed = `r/${SubredditName}`;
export type SubredditID = `t5_${string}`;
export type SubredditType =
  | "public"
  | "private"
  | "restricted"
  | "gold_only"
  | "archived"
  | "employees_only"
  | "user"
  | "mod"
  | "gold_restricted"
  | "wiki"
  | "livehub";

// --- Types de Flair ---

export type FlairTextColor = "dark" | "light";
export type AuthorFlairType = "text" | "richtext";

export type FlairRichtext = {
  e: AuthorFlairType | "emoji";
  t?: string; // Texte
  a?: string; // Emoji shortcode (ex: ":snoo:")
  u?: string; // URL de l'emoji
};

export type FlairPosition = "right" | "left";

// --- Types de Média ---

export type Source = {
  url: string;
  width: number;
  height: number;
};

export type Image = {
  source: Source;
  resolutions: Source[];
  variants: Record<string, unknown>; // Pour les gifs, mp4, etc.
  id: string;
};

export type Preview = {
  images: Image[];
  enabled: boolean;
};

export type MediaMetadatum = {
  status: "valid" | "invalid";
  e: string; // Type, ex: "Image"
  m: string; // Mime type, ex: "image/jpg"
  p: Source[]; // Différentes tailles
  s: Source; // Source principale
  id: string;
};

export type MediaMetadata = {
  [media_id: string]: MediaMetadatum;
};

export type GalleryDataItem = {
  media_id: string;
  id: number;
  caption?: string;
};

export type GalleryData = {
  items: GalleryDataItem[];
};

export type RedditVideo = {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
  has_audio?: boolean;
};

export type Media = {
  reddit_video?: RedditVideo;
  // oembed?: { ... } // Pour les vidéos externes (YouTube, etc.)
  // ... autres types de média
};

export type PostHint =
  | "self"
  | "image"
  | "hosted:video"
  | "rich:video"
  | "link";
