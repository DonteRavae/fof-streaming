import SectionalVideoCardSlider from "@/components/SectionalVideoCardSlider/SectionalVideoCardSlider";
import Showcase from "@/components/Showcase/Showcase";

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
