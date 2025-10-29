import type { CommentResponse, PostListResponse, SubredditListResponse } from '@/types/ApiResponses';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type QueryParams = 
  | { count: number; after: string; before?: never }
  | { count: number; before: string; after?: never }
  | void;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_ROOT || 'https://www.reddit.com' 
  }),
  endpoints: (builder) => ({
    getSubreddits: builder.query<SubredditListResponse, QueryParams>({
      query: (params) => {
        if (!params) return '/subreddits.json';
        
        const queryParams = new URLSearchParams();
        queryParams.set('count', params.count.toString());
        
        if (params.after) {
          queryParams.set('after', params.after);
        } else if (params.before) {
          queryParams.set('before', params.before);
        }
        
        return `/subreddits.json?${queryParams.toString()}`;
      },
    }),
    getSearch: builder.query<PostListResponse, string>({
      query: (searchTerm) => `/search.json?q=${encodeURIComponent(searchTerm)}`,
    }),
    getPosts: builder.query<PostListResponse, string | undefined>({
      query: (subreddit) =>
        subreddit ? `/r/${subreddit}.json` : '/.json',
    }),
    getComments: builder.query<CommentResponse, { subreddit: string; postId: string }>({
      query: ({ subreddit, postId }) =>
        `/r/${subreddit}/comments/${postId}.json`,
    }),
  }),
});

export const {
  useGetSubredditsQuery,
  useGetSearchQuery,
  useGetPostsQuery,
  useGetCommentsQuery,
} = apiSlice;