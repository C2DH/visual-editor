export const TAG_THEME = parseInt(process.env.REACT_APP_TAG_THEME_PK || 1, 10);
export const TAG_CHAPTER = parseInt(
  process.env.REACT_APP_TAG_CHAPTER_PK || 2,
  10
);
export const TAG_EDUCATION = parseInt(
  process.env.REACT_APP_TAG_EDUCATION_PK || 3,
  10
);

export const DEFAULT_BG_COLOR = "#ddd";
export const DEFAULT_OVERLAY_COLOR = "#1E1E1E";

export const DOCUMENT_SCHEMA = process.env.REACT_APP_DOCUMENT_SCHEMA || '/static/schema/document/payload.json';

export const MEDIAT_TYPES = (process.env.REACT_APP_MEDIA_TYPES || 'image,pdf,video,audio,entity').split(',');
