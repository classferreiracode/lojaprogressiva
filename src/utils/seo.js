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

const ensureScriptTag = (id, type = "application/ld+json") => {
  let tag = document.querySelector(`script[data-seo="${id}"]`);
  if (!tag) {
    tag = document.createElement("script");
    tag.setAttribute("type", type);
    tag.setAttribute("data-seo", id);
    document.head.appendChild(tag);
  }
  return tag;
};

const setMetaContent = (attr, value, content) => {
  if (!content) return;
  const tag = ensureMetaTag(attr, value);
  tag.setAttribute("content", content);
};

export const setMeta = ({
  title,
  description,
  image,
  url,
  keywords,
  robots = "index, follow",
  type = "website",
  schema,
}) => {
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

  if (keywords) {
    setMetaContent("name", "keywords", keywords);
  }

  if (robots) {
    setMetaContent("name", "robots", robots);
  }

  setMetaContent("property", "og:type", type);
  setMetaContent("property", "og:locale", "pt_BR");
  setMetaContent("name", "twitter:card", "summary_large_image");

  if (schema) {
    const schemaTag = ensureScriptTag("structured-data");
    schemaTag.textContent = JSON.stringify(schema);
  }
};

export const truncateText = (value, maxLength = 160) => {
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}…`;
};
