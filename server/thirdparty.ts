"use server";

import { TwitterApiRateLimitPlugin } from "@twitter-api-v2/plugin-rate-limit";
import { unstable_cache as cache } from "next/cache";
import { TwitterApi } from "twitter-api-v2";

const CACHE_DURATION = 3600 * 1.5; // 1.5 hours
const USE_MOCK_DATA_FOR_DEVELOPMENT = true;
const DEFAULT_X_RESPONSE = {
	data: { public_metrics: { followers_count: 100 } },
};
const DEFAULT_GITHUB_RESPONSE = {
	data: {
		viewer: {
			login: "anonymous",
			repositories: {
				totalCount: 30,
				nodes: [
					{
						nameWithOwner: "anonymous/repo1",
						name: "repo1",
						description: "Sample repository 1",
						forkCount: 100,
						stargazerCount: 500,
						createdAt: "2023-01-01T00:00:00Z",
						updatedAt: "2024-01-01T00:00:00Z",
					},
					{
						nameWithOwner: "anonymous/repo2",
						name: "repo2", 
						description: "Sample repository 2",
						forkCount: 50,
						stargazerCount: 200,
						createdAt: "2023-02-01T00:00:00Z",
						updatedAt: "2024-02-01T00:00:00Z",
					}
				],
			},
			followers: {
				totalCount: 100,
			},
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: 500,
					weeks: [
						{
							contributionDays: [
								{
									contributionCount: 5,
									date: "2024-01-01T00:00:00Z"
								},
								{
									contributionCount: 3,
									date: "2024-01-02T00:00:00Z"
								}
							]
						}
					]
				}
			}
		}
	}
};

const rateLimitPlugin = new TwitterApiRateLimitPlugin();
const client = new TwitterApi(
	{
		appKey: process.env.X_API_KEY!,
		appSecret: process.env.X_API_SECRET!,
		accessToken: process.env.X_MY_ACCESS_TOKEN!,
		accessSecret: process.env.X_MY_ACCESS_TOKEN_SECRET!,
	},
	{
		plugins: [rateLimitPlugin],
	},
);

export const getGithubInfo = cache(
	async (): Promise<Externals.Github.ApiResponse> => {
		try {
			// Avoid rate limiting in development
			// set USE_MOCK_DATA_FOR_DEVELOPMENT false to use real data
			if (
				process.env.NODE_ENV === "development" &&
				USE_MOCK_DATA_FOR_DEVELOPMENT
			) {
				return DEFAULT_GITHUB_RESPONSE;
			}

			const query = `
{
  viewer {
    login
    repositories(
      first: 20
      affiliations: OWNER
      isFork: false
      orderBy: {field: STARGAZERS, direction: DESC}
    ) {
      totalCount
      nodes {
        nameWithOwner
        name
        description
        forkCount
        stargazerCount
        createdAt
        updatedAt
      }
    }
    followers {
      totalCount
    }
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

			console.log("API HIT: github");
			const res = await fetch("https://api.github.com/graphql", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
				body: JSON.stringify({
					query,
				}),
				next: { revalidate: CACHE_DURATION },
			});

			return await res.json();
		} catch (error) {
			console.error("github api error", error);
			return DEFAULT_GITHUB_RESPONSE;
		}
	},
	["mahmut-github-data"],
	{
		revalidate: CACHE_DURATION,
	},
);

export const getXInfo = cache(
	async () => {
		try {
			// Avoid rate limiting in development
			// set USE_MOCK_DATA_FOR_DEVELOPMENT false to use real data
			if (
				process.env.NODE_ENV === "development" &&
				USE_MOCK_DATA_FOR_DEVELOPMENT
			) {
				return DEFAULT_X_RESPONSE;
			}

			const currentRateLimitForMe =
				await rateLimitPlugin.v2.getRateLimit("users/me");
			console.log("API RATES: X", currentRateLimitForMe);

			console.log("API HIT: X");
			const user = await client.v2.me({
				"user.fields": "public_metrics",
			});
			console.log("API RESPONSE: X", user);

			return user;
		} catch (error) {
			console.error("x api error", error);
			return DEFAULT_X_RESPONSE;
		}
	},
	["mahmut-x-data"],
	{
		revalidate: false,
	},
);
