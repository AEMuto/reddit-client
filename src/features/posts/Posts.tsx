import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSelectedSubreddit } from "@/store/redditSlice";
import { useGetPostsQuery, type PostsQueryParams } from "../api/apiSlice";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getRandomInt } from "@/utils";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ChevronRightIcon } from "lucide-react";

export const Posts = () => {
  const dispatch = useAppDispatch();
  const currentSubreddit = useAppSelector(selectSelectedSubreddit);
  const [index, setIndex] = useState(0);
  const [distance] = useState(25);
  const [queryParams, setQueryParams] = useState<PostsQueryParams>({
    subreddit: currentSubreddit,
  });

  const { data, error, isLoading, isFetching } = useGetPostsQuery(queryParams);

  const handlePostSelect = (postId: string) => {
    // Dispatch action to set selected post
    // dispatch(setSelectedPost(postId));
  };

  const handlePrevious = () => {
    if (!data?.data.before) return;
    // For the API call, we use the current count + 1 with the 'before' cursor
    setQueryParams({
      subreddit: currentSubreddit,
      queryParams: { count: index + 1, before: data.data.before },
    });
    // Then, we update our local state to reflect the new page's position
    setIndex(index - distance);
  };

  // todo: add scroll to top on page change
  const handleNext = () => {
    if (!data?.data.after) return;
    const newCount = index + distance;
    setIndex(newCount);
    setQueryParams({
      subreddit: currentSubreddit,
      queryParams: { count: newCount, after: data.data.after },
    });
  };

  useEffect(() => {
    setQueryParams({ subreddit: currentSubreddit });
    setIndex(0);
  }, [currentSubreddit]);

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts</div>;
  if (!data) return <div>No posts found.</div>;

  return (
    <div className="p-4 border-2">
      {/* Posts Container */}
      <ItemGroup className="gap-2">
        {data.data.children.map(({ data: post }) => (
          <Item
            variant="outline"
            key={post.id}
            onClick={() => handlePostSelect(post.id)}
            className="cursor-pointer hover:brightness-90"
          >
            {post.thumbnail.length > 0 && (
              <ItemMedia variant="image" className="w-14 h-14">
                {/* Placeholder for post thumbnail or media */}
                <img
                  src={post.thumbnail}
                  alt={
                    post.thumbnail === "spoiler" ? "Spoiler" : "Post Thumbnail"
                  }
                  className="object-cover bg-muted-foreground flex justify-center items-center"
                />
              </ItemMedia>
            )}
            <ItemContent>
              <ItemTitle className="font-bold">{post.title}</ItemTitle>
              <ItemDescription className="line-clamp-1">
                {/* Will need to implement markdown rendering, selftext value is markdown */}
                {post.selftext}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
      {/* Pagination Controls */}
      <div className="flex justify-between gap-4 mt-4">
        <Button
          onClick={handlePrevious}
          disabled={!data.data.before || isFetching}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!data.data.after || isFetching}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const SkeletonPosts = ({ count = 25 }: { count?: number }) => {
  return (
    <div className="p-4 border-2">
      <div className="flex flex-wrap justify-start items-start gap-2">
        {Array.from({ length: count }).map((_, index) => {
          // Random width between 35 and 160
          const width = getRandomInt(35, 160);
          return (
            <Skeleton
              key={index}
              className={`h-5 w-(--skeleton-width) rounded-none`}
              style={
                { "--skeleton-width": `${width}px` } as React.CSSProperties
              }
            />
          );
        })}
      </div>
      <div className="flex justify-between gap-4 mt-4">
        <Button disabled>Previous</Button>
        <Button disabled>Next</Button>
      </div>
    </div>
  );
};
