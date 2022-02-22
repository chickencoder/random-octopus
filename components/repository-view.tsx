import { Respository } from "../types";
import { useEffect, useState } from "react";
import { getRepositories } from "../lib/github";
import RepositoryCard from "./repository-card";
import { useFavourites } from "../lib/favourites";

export default function RepositoryView() {
  const [repositories, setRepositories] = useState<Respository[] | null>(null);
  const [error, setError] = useState<string | null>("Something went wrong");
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>("*");
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const { favourites } = useFavourites();

  useEffect(() => {
    getRepositories(language).then((response) => {
      let repos = response?.data?.items;
      if (repos) {
        setRepositories(repos);
      }
      setError(response?.error);
      setLoading(false);
    });
  }, [language]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return <span className="text-red-500">Error: {error}</span>;
  }

  return (
    <section>
      {repositories && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isFilterActive}
                onChange={(event) => setIsFilterActive(event.target.checked)}
                className="filter-checkbox rounded-md"
              />
              <span>Filter by favourites</span>
            </label>
            <label className="inline-flex items-center space-x-2">
              <span className="block">Language</span>
              <select
                className="language-select rounded-md"
                value={language}
                onChange={(event) => {
                  setLoading(true);
                  setLanguage(event.target.value);
                }}
              >
                <option value="*">Any</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="go">Go</option>
              </select>
            </label>
          </div>
          <ol className="space-y-4">
            {repositories
              .filter((repository) =>
                isFilterActive ? favourites?.includes(repository.id) : true
              )
              .map((repository) => (
                <li key={repository.id}>
                  <RepositoryCard
                    repository={repository}
                    isFavourite={favourites.includes(repository.id)}
                  />
                </li>
              ))}
          </ol>
        </div>
      )}
    </section>
  );
}
