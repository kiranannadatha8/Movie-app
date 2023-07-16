export const baseUrl = "http://localhost:3000";

export const homePageSections = [
  { name: "Now Playing", internalName: "now-playing" },
  { name: "Popular", internalName: "popular" },
  { name: "Top Rated", internalName: "top-rated" },
  { name: "Upcoming", internalName: "upcoming" },
];

const size = {
  mobile: "423px",
  tablet: "768px",
  laptop: "1024px",
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
};

export const colors = {};
