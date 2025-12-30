import { fetcher } from "./utils";


export function getCampaigns() {
  return fetcher("/campaigns");
}

export function getCampaignInsights() {
  return fetcher("/campaigns/insights");
}
