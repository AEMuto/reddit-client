import { useGetSubredditsQuery } from "../api/apiSlice";

export const Subreddits = () => {
  const { data, error, isLoading } = useGetSubredditsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading subreddits</div>;
  if (!data) return <div>No subreddits found.</div>;
  return (
    <ul>
      {data.data.children.map((subreddit) => (
        <li key={subreddit.data.id}>{subreddit.data.display_name}</li>
      ))}
    </ul>
  );
};
