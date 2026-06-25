import { fetcher } from "../fetch-server";
import { StaticPageType } from "../types/static-page";

export async function getStaticPages(): Promise<StaticPageType[]> {
  const res = await fetcher<any>("/static-pages", {
    next: {
      tags: ["static-pages"],
      revalidate: 60,
    },
  });
  return res.data.pages;
}

export async function getStaticPageByIdentifier(
  identifier: string,
): Promise<StaticPageType | null> {
  try {
    const res = await fetcher<any>(`/static-pages/${identifier}`, {
      next: {
        tags: [`static-page-${identifier}`],
        revalidate: 60,
      },
    });
    return res.data.page;
  } catch (error) {
    return null;
  }
}
