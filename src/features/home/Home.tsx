import { useAppSelector } from "@/store/hooks";
import { Subreddits } from "../subreddits/Subreddits";
import { selectSearchTerm, selectSelectedSubreddit } from "@/store/redditSlice";
import { useEffect } from "react";

export const Home = () => {
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedSubreddit = useAppSelector(selectSelectedSubreddit);
  useEffect(() => {
    console.log("Search Term:", searchTerm);
    console.log("Selected Subreddit:", selectedSubreddit);
  }, [searchTerm, selectedSubreddit]);
  return (
    <main className="p-4 bg-gray-300">
      <Subreddits />
    </main>
  );
};
