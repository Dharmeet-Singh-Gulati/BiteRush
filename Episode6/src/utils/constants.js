export const SWIGGY_API =
  "https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.65420&lng=77.23730&str=Burger&trackingId=30bc26f7-2fbe-70e5-a9b5-4a8aa938c89f&submitAction=ENTER&queryUniqueId=4cb869c2-ac06-e0c4-4eb9-6915a405c46b";

export const SWIGGY_MENU_API =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65420&lng=77.23730&restaurantId=";

export const VEG_SYMBOL = new URL(
  "../utils/assets/veg-symbol.png",
  import.meta.url,
);

export const NON_VEG_SYMBOL = new URL(
  "../utils/assets/non-veg-symbol.png",
  import.meta.url,
);

export const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

export const STAR_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    width="16"
    height="16"
  >
    <path
      d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"
      fill="#7c7a7a"
    />
  </svg>
);

export const CHECK_OUT_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
      fill="#424141"
    ></path>
  </svg>
);
