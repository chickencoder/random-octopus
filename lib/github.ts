import { RepositoryResponse } from "../types";

const maxDaysOld = 7; // Find repositories from the last 7 days

function getCreatedAtDate(): string {
  let date = new Date();
  date.setDate(date.getDate() - maxDaysOld);
  return date.toISOString().split("T")[0];
}

export async function getRepositories(
  language: string
): Promise<RepositoryResponse> {
  const requestUrl = new URL("https://api.github.com/search/repositories");
  requestUrl.searchParams.set(
    "q",
    `created:>${getCreatedAtDate()} language:${language}`
  );
  requestUrl.searchParams.set("sort", "stars");
  requestUrl.searchParams.set("order", "desc");

  try {
    const response = await fetch(requestUrl.toString());
    if (response.ok && response.status === 200) {
      return {
        data: await response.json(),
        error: null,
      };
    } else {
      throw new Error("Bad response from API");
    }
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Failed to fetch repositories",
    };
  }
}
