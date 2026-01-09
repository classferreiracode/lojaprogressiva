const ensureMetaTag = (attr, value) => {
  let tag = document.querySelector(`meta[${attr}="${value}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }
  return tag;
};

const ensureLinkTag = (rel) => {
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  return tag;
};

const setMetaContent = (attr, value, content) => {
  if (!content) return;
  const tag = ensureMetaTag(attr, value);
  tag.setAttribute("content", content);
};

export const setMeta = ({ title, description, image, url }) => {
  if (title) {
    document.title = title;
    setMetaContent("property", "og:title", title);
    setMetaContent("name", "twitter:title", title);
  }

  if (description) {
    setMetaContent("name", "description", description);
    setMetaContent("property", "og:description", description);
    setMetaContent("name", "twitter:description", description);
  }

  if (image) {
    setMetaContent("property", "og:image", image);
    setMetaContent("name", "twitter:image", image);
  }

  if (url) {
    setMetaContent("property", "og:url", url);
    const canonical = ensureLinkTag("canonical");
    canonical.setAttribute("href", url);
  }

  setMetaContent("name", "twitter:card", "summary_large_image");
};

export const truncateText = (value, maxLength = 160) => {
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}…`;
};
