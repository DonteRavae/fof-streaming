// INTERNAL
import Showcase from "@/components/Showcase/Showcase";
import SectionalVideoCardSlider from "@/components/SectionalVideoCardSlider/SectionalVideoCardSlider";

export default function CatalogOverviewPage() {
  return (
    <main>
      <Showcase />
      <SectionalVideoCardSlider label="Continue Watching" />
      <SectionalVideoCardSlider label="New on Force of Faith" />
      <SectionalVideoCardSlider label="Trending Now" />
    </main>
  );
}
