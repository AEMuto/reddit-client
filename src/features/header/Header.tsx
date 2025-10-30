import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchTerm } from "@/store/redditSlice";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { FaReddit } from "react-icons/fa";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const subreddit = useAppSelector((state) => state.reddit.selectedSubreddit);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission logic here
    dispatch(setSearchTerm(searchQuery));
  };
  return (
    <header className="p-4 h-(--header-height) bg-foreground text-background dark:bg-background dark:text-foreground flex justify-between items-center">
      <div className="flex items-center gap-3">
        <FaReddit className="size-8 text-red-300" />
        <h1 className="text-2xl font-bold">Jezzit {subreddit && `- r/${subreddit}`}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Field>
          <FieldLabel htmlFor="search" className="sr-only">
            Search
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="secondary" type="submit">
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </form>
    </header>
  );
};
