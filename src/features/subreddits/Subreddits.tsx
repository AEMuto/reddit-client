import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useGetSubredditsQuery } from "../api/apiSlice";
import { setSelectedSubreddit } from "@/store/redditSlice";
import { Button } from "@/components/ui/button";
import type { QueryParams } from "../api/apiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import getRandomInt from "@/utils/getRandomInt";

export const Subreddits = () => {
  const [count, setCount] = useState(0);
  const [queryParams, setQueryParams] = useState<QueryParams>();

  const { data, error, isLoading } = useGetSubredditsQuery(queryParams);
  const dispatch = useAppDispatch();

  const handleSubredditSelect = (subreddit: string) => {
    // Dispatch action to set selected subreddit
    dispatch(setSelectedSubreddit(subreddit));
  };

  const handlePrevious = () => {
    if (!data?.data.before) return;
    // For the API call, we use the current count + 1 with the 'before' cursor
    setQueryParams({ count: count + 1, before: data.data.before });
    // Then, we update our local state to reflect the new page's position
    setCount(count - 25);
  };

  const handleNext = () => {
    if (!data?.data.after) return;
    const newCount = count + 25;
    setCount(newCount);
    setQueryParams({ count: newCount, after: data.data.after });
  };

  if (isLoading) return <SkeletonSubreddits />;
  if (error) return <div>Error loading subreddits</div>;
  if (!data) return <div>No subreddits found.</div>;
  return (
    <>
      <ul className="flex flex-col justify-start items-start">
        {import.meta.env.MODE === "development" && <li>Count: {count}</li>}
        {data.data.children.map((subreddit) => (
          <li
            key={subreddit.data.id}
            onClick={() => handleSubredditSelect(subreddit.data.display_name)}
          >
            {subreddit.data.display_name}
          </li>
        ))}
      </ul>
      <div className="flex gap-4 mt-4">
        {data.data.before && (
          <Button className="cursor-pointer" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {data.data.after && (
          <Button className="cursor-pointer" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </>
  );
};

const SkeletonSubreddits = ({ count = 25 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        // Random width between 35 and 160
        const width = getRandomInt(35, 160);
        return <Skeleton key={index} className={`h-5 w-(--skeleton-width) mb-2`} style={{ "--skeleton-width": `${width}px` } as React.CSSProperties} />;
      })}
    </>
  );
};
