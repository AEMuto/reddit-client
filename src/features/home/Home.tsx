import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectSearchTerm, selectSelectedSubreddit } from "@/store/redditSlice";
import { Subreddits } from "../subreddits/Subreddits";
import { Posts } from "../posts/Posts";

export const Home = () => {
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedSubreddit = useAppSelector(selectSelectedSubreddit);
  useEffect(() => {
    console.log("Search Term:", searchTerm);
    console.log("Selected Subreddit:", selectedSubreddit);
  }, [searchTerm, selectedSubreddit]);
  return (
    <main className="p-4 bg-gray-300 min-h-(--main-height)">
      <Subreddits />
      <Posts />
    </main>
  );
};
