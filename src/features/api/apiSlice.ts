import type { CommentResponse, PostListResponse, SubredditListResponse } from '@/types/ApiResponses';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type QueryParams = 
  | { count: number; after: string; before?: never }
  | { count: number; before: string; after?: never }
  | void;

export type PostsQueryParams = {
  subreddit: string;
  queryParams?: QueryParams;
}

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
    getPosts: builder.query<PostListResponse, PostsQueryParams>({
      query: ({ subreddit, queryParams }) => {
        if (!queryParams) return `/r/${subreddit}.json`;

        const urlParams = new URLSearchParams();
        urlParams.set('count', queryParams.count.toString());

        if (queryParams.after) {
          urlParams.set('after', queryParams.after);
        } else if (queryParams.before) {
          urlParams.set('before', queryParams.before);
        }

        return `/r/${subreddit}.json?${urlParams.toString()}`;
      },
    }),
    getSearch: builder.query<PostListResponse, string>({
      query: (searchTerm) => `/search.json?q=${encodeURIComponent(searchTerm)}`,
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