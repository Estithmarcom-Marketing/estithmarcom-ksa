import { getSettings } from "@/lib/apis/settings";
import ContactUsClient from "./_components/contact-us-client";
import { getCountries } from "@/lib/apis/country";

export default async function ContactUsPage(){
  const [settings, countries] = await Promise.all([
    getSettings(),
    getCountries()
  ]);
  return(
    <div>
      <ContactUsClient settings={settings} countries={countries} />
    </div>
  )
}
