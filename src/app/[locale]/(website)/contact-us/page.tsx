import { getSettings } from "@/lib/apis/settings";
import ContactUsClient from "./_components/contact-us-client";

export default async function ContactUsPage(){
  const settings = await getSettings()
  return(
    <div>
      <ContactUsClient settings={settings} />
    </div>
  )
}
