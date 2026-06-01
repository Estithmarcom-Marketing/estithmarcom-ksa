import { SettingsType } from "@/lib/types/settings";
import { fetcher } from "@/lib/fetch-server";

export async function getSettings(): Promise<SettingsType> {
  const res = await fetcher<any>(`/settings`, {
    next: {
      tags: ["settings"],
      revalidate: 3600,
    },
  });
  return res.data.settings;
}
