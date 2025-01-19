export const FILTEROPTIONS = [
  { value: "lashArtist", label: "Lash Artists" },
  { value: "student", label: "Students" },
  { value: "partner", label: "Retail Partners" },
  { value: "educator", label: "Educators" },
];

export const allRoles = [
  "student",
  "lashArtist",
  "partner",
  "educator",
  "lightHQ",
];

export const SORTOPTIONS = [
  { value: 100, label: "100 KM Radius" },
  { value: 500, label: "500 KM Radius" },
  { value: 1000, label: "1000 KM Radius" },
  { value: 10000, label: "10000 KM Radius" },
];

export const userTypeIcons = {
  lashArtist: "/assets/svgs/icons/map-star.svg",
  student: "/assets/svgs/icons/map-heart.svg",
  partner: "/assets/svgs/icons/map-cart.svg",
  educator: "/assets/svgs/icons/map-student.svg",
};

export const userCardIcons = {
  lashArtist: "/assets/svgs/icons/card-star.svg",
  student: "/assets/svgs/icons/card-heart.svg",
  partner: "/assets/svgs/icons/card-retail.svg",
  educator: "/assets/svgs/icons/card-educator.svg",
};

export const InitialCheckboxText = {
  student: "#2A2A2A",
  lashArtist: "#787777",
  educator: "#787777",
  partner: "#787777",
  lightHQ: "#787777",
};

export const ValueToUserTypeMap = {
  student: "student",
  lashArtist: "lashArtist",
  educator: "educator",
  partner: "partner",
};

export const Radius = 100;

export const PageLimit = 100;

export const DEFAULT_LOCATION = [33.5817771, -111.9305882];

export const isAuthPaths = ["/reset-password", "/login", "/forget-password"];
