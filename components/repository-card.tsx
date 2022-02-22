import { useFavourites } from "../lib/favourites";
import { Respository } from "../types";

type RepositoryCardProps = {
  repository: Respository;
  isFavourite: boolean;
};

export default function RepositoryCard({
  repository,
  isFavourite,
}: RepositoryCardProps) {
  const { toggleFavourite } = useFavourites();

  return (
    <div className="card relative space-y-2 rounded-md border p-4 shadow-sm">
      <button
        type="button"
        aria-pressed={isFavourite}
        className="favourite-button absolute top-2 right-2 mb-2 rounded-md bg-gray-100 px-6 py-2"
        aria-label="Favourite repository"
        onClick={() => toggleFavourite(repository.id)}
      >
        {isFavourite ? (
          <span className="text-green-500">&#10003;</span>
        ) : (
          <span className="text-red-500">&hearts;</span>
        )}
      </button>
      <div className="flex items-center space-x-2">
        <a href={repository.html_url} target="_blank">
          <h2 className="card--title text-xl">{repository.name}</h2>
        </a>
        <div className="space-x-2">
          <a
            href={`https://github.com/${repository.owner.login}`}
            className="text-gray-500"
          >
            {repository.owner.login}
          </a>
          {repository.language && (
            <span className="card--language text-blue-700">
              {repository.language}
            </span>
          )}
          <span className="space-x-1">
            <span role="img">⭐️</span>
            <span>{repository.stargazers_count}</span>
          </span>
        </div>
      </div>
      <p className="max-w-[52ch] text-gray-700">{repository.description}</p>
    </div>
  );
}
