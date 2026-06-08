import { getHighlights } from "@/lib/apis/stats";
import AboutUsClient from "./_components/abous-us-client";

export default async function AboutUsPage() {
  const stats = await getHighlights();
  return <AboutUsClient stats={stats} />;
}
