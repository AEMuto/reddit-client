import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useGetSubredditsQuery } from "../api/apiSlice";
import { setSelectedSubreddit } from "@/store/redditSlice";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import getRandomInt from "@/utils/getRandomInt";
import type { QueryParams } from "../api/apiSlice";
import { getContrastColor } from "@/utils/getContrastColor";

export const Subreddits = () => {
  const [count, setCount] = useState(0);
  const [queryParams, setQueryParams] = useState<QueryParams>();

  const { data, error, isLoading } = useGetSubredditsQuery(queryParams);
  const dispatch = useAppDispatch();

  const handleSubredditSelect = (subreddit: string) => {
    // Dispatch action to set selected subreddit
    dispatch(setSelectedSubreddit(subreddit));
  };

  /**
   * TODO: Currently not as efficient as it could be since we re-fetch data already in state, sort of. Example:
   * 1. initial load -> /subreddits.json
   * 2. click next button -> /subreddits.json?count=25&after=t5_2cneq
   * 3. click previous button -> /subreddits.json?count=26&before=t5_2th52
   * Data from step 1 is already in state but my current implementation re-fetches it.
   * There should be something about that in RTK Query docs but I haven't found it yet.
   * From the docs about caching:
   * "With RTK Query, caching is based on:
   * - API endpoint definitions
   * - The serialized query parameters used when components subscribe to data from an endpoint
   * - Active subscription reference counts"
   * Since my query parameters are different for step 1 and step 3, it treats them as separate requests,
   * even though the data is effectively the same.
   * @returns void
   */
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
    <div className="p-4 border-2">
      <ul className="flex flex-wrap justify-start items-start gap-2">
        {import.meta.env.MODE === "development" && <li>Count: {count}</li>}
        {data.data.children.map(({ data: subreddit }) => {
          const hasBgColor = subreddit.primary_color.length > 0;
          return hasBgColor ? (
            <Button
              className="cursor-pointer hover:brightness-90"
              style={{
                backgroundColor: subreddit.primary_color,
                color: getContrastColor(subreddit.primary_color),
              }}
              key={subreddit.id}
              onClick={() => handleSubredditSelect(subreddit.display_name)}
            >
              {subreddit.display_name}
            </Button>
          ) : (
            <Button
              className="cursor-pointer bg-transparent border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 text-foreground"
              key={subreddit.id}
              onClick={() => handleSubredditSelect(subreddit.display_name)}
            >
              {subreddit.display_name}
            </Button>
          );
        })}
      </ul>
      <div className="flex justify-between gap-4 mt-4">
        <Button
          className="cursor-pointer"
          onClick={handlePrevious}
          disabled={!data.data.before}
        >
          Previous
        </Button>
        <Button
          className="cursor-pointer"
          onClick={handleNext}
          disabled={!data.data.after}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const SkeletonSubreddits = ({ count = 25 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        // Random width between 35 and 160
        const width = getRandomInt(35, 160);
        return (
          <Skeleton
            key={index}
            className={`h-5 w-(--skeleton-width) mb-2`}
            style={{ "--skeleton-width": `${width}px` } as React.CSSProperties}
          />
        );
      })}
    </>
  );
};
