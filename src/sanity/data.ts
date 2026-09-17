import { fetchSanity } from "./live";
import {
  COURSE_POSTERS_QUERY,
  GALLERY_QUERY,
  NEWS_ARTICLE_QUERY,
  NEWS_LIST_QUERY,
  NEWS_SLUGS_QUERY,
  RELATED_NEWS_QUERY,
  SCHEDULE_QUERY,
  STORY_QUERY,
  TESTIMONIALS_QUERY,
  TRAINERS_QUERY,
} from "./queries";
import type {
  CoursePoster,
  GalleryItem,
  NewsArticle,
  NewsCard,
  ScheduleDoc,
  StoryMilestone,
  Testimonial,
  Trainer,
} from "./types";

export const getTrainers = () => fetchSanity<Trainer[]>(TRAINERS_QUERY);
export const getCoursePosters = () => fetchSanity<CoursePoster[]>(COURSE_POSTERS_QUERY);
export const getSchedule = () => fetchSanity<ScheduleDoc[]>(SCHEDULE_QUERY);
export const getGallery = () => fetchSanity<GalleryItem[]>(GALLERY_QUERY);
export const getNewsList = () => fetchSanity<NewsCard[]>(NEWS_LIST_QUERY);
export const getNewsSlugs = () => fetchSanity<string[]>(NEWS_SLUGS_QUERY);
export const getTestimonials = () => fetchSanity<Testimonial[]>(TESTIMONIALS_QUERY);
export const getStory = () => fetchSanity<StoryMilestone[]>(STORY_QUERY);

export const getArticle = (slug: string) =>
  fetchSanity<NewsArticle | null>(NEWS_ARTICLE_QUERY, { slug });

export const getRelatedNews = (slug: string) =>
  fetchSanity<NewsCard[]>(RELATED_NEWS_QUERY, { slug });
