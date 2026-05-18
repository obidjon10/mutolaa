import { ContentTypeEnum, HomeSectionType } from "../../models";

// import { HeroSection } from "../hero-section";
import { AuthorSection } from "./author-section";
import { BannerSection } from "./banner-section";
import { BookShelfSection } from "./book-shelf-section";
import { CollectionSection } from "./collection-section";

interface ISectionRendererProps {
  section: HomeSectionType;
}

export const SectionRenderer = ({ section }: ISectionRendererProps) => {
  switch (section.content_type) {
    case ContentTypeEnum.BookBucket:
      return <BookShelfSection section={section} />;
    case ContentTypeEnum.Banner:
      return <BannerSection section={section} />;
    case ContentTypeEnum.Collection:
      return <CollectionSection section={section} />;
    case ContentTypeEnum.Author:
      return <AuthorSection section={section} />;
    default:
      return null;
  }
};
