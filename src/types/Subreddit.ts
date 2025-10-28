import type { LanguageCode } from "iso-639-1";
import type {
  BaseData,
  SubredditType,
  FlairPosition,
} from "./RedditApiTypes.ts";

/**
 * Les données (`data`) d'un objet Subreddit (kind: "t5").
 * Basé sur DataSubreddit.ts.
 */
export interface SubredditData extends BaseData {
  title: string;
  display_name: string;
  display_name_prefixed: string;
  url: string;
  subscribers: number;
  public_description: string;
  description: string;
  description_html: string;
  community_icon: string;
  banner_img: string;
  banner_background_image: string;
  header_img: string | null;
  icon_img: string;
  primary_color: string;
  key_color: string;
  created: number;
  created_utc: number;
  lang: LanguageCode;
  subreddit_type: SubredditType;
  over18: boolean;
  quarantine: boolean;
  wls: number | null;
  advertiser_category: string;
  all_original_content: boolean;
  allow_discovery: boolean;
  allow_galleries: boolean;
  allow_images: boolean;
  allow_polls: boolean;
  allow_videos: boolean;
  allow_videogifs: boolean;
  allow_talks: boolean;
  allow_predictions: boolean;
  allow_predictions_tournament: boolean;
  allow_prediction_contributors: boolean;
  allowed_media_in_comments: string[]; // "static" | "giphy" | "animated" | "expression"
  spoilers_enabled: boolean;
  show_media: boolean;
  show_media_preview: boolean;
  accept_followers: boolean;
  can_assign_link_flair: boolean;
  can_assign_user_flair: boolean;
  collapse_deleted_comments: boolean;
  comment_score_hide_mins: number;
  disable_contributor_requests: boolean;
  emojis_enabled: boolean;
  free_form_reports: boolean;
  has_menu_widget: boolean;
  hide_ads: boolean;
  is_crosspostable_subreddit: boolean;
  link_flair_enabled: boolean;
  link_flair_position: FlairPosition;
  mobile_banner_image: string;
  original_content_tag_enabled: boolean;
  prediction_leaderboard_entry_type: number;
  public_traffic: boolean;
  restrict_commenting: boolean;
  restrict_posting: boolean;
  should_archive_posts: boolean;
  should_show_media_in_comments_setting: boolean;
  submission_type: "any" | "self" | "link";
  submit_link_label: string;
  submit_text_label: string;
  submit_text: string;
  submit_text_html: string | null;
  suggested_comment_sort: string | null;
  user_flair_enabled_in_sr: boolean;
  user_flair_position: FlairPosition;
  user_flair_type: "text" | "richtext";
  user_has_favorited: boolean | null;
  user_is_banned: boolean | null;
  user_is_contributor: boolean | null;
  user_is_moderator: boolean | null;
  user_is_muted: boolean | null;
  user_is_subscriber: boolean | null;
  user_sr_theme_enabled: boolean;
  wiki_enabled: boolean;
  banner_size: number[] | null;
  community_reviewed: boolean;
  emojis_custom_size: number[] | null;
  header_size: number[] | null;
  icon_size: number[] | null;
  is_enrolled_in_new_modmail: boolean | null;
  notification_level: string | null;
  public_description_html: string | null;
  user_can_flair_in_sr: boolean | null;
  user_flair_background_color: string | null;
  user_flair_css_class: string | null;
  user_flair_richtext: unknown[];
  user_flair_template_id: string | null;
  user_flair_text_color: string | null;
  user_flair_text: string | null;
  user_sr_flair_enabled: boolean | null;
  videostream_links_count?: number;
  content_category?: string;
}
