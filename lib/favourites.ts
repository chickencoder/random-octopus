import createPersistedState from "use-persisted-state";
const useFavouritesState = createPersistedState<number[]>("favourites");

export function useFavourites() {
  const [favourites, setFavourites] = useFavouritesState([]);

  const toggleFavourite = (id: number) => {
    if (favourites.includes(id)) {
      // Remove favourite from localstorage
      setFavourites(favourites.filter((favourite) => favourite !== id));
    } else {
      // Add favourite to localstorage
      setFavourites([...favourites, id]);
    }
  };

  return {
    favourites,
    toggleFavourite,
  };
}
