import {
  useParams,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router";
import queryString from "query-string";

export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const match = useMatch("");

  // Return our custom router object
  return {
    // Navigation helpers
    // push: (url) => navigate(url),
    replace: (url) => navigate(url, { replace: true }),
    back: (state = null, fallback = "/home") => {
      if (state) {
        sessionStorage.setItem("__router_back_state", JSON.stringify(state));
      }
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate(fallback);
      }
    },
    push: (state = null, url) => {
      if (state) {
        sessionStorage.setItem("__router_back_state", JSON.stringify(state));
      }
      navigate(url);
    },

    // Basic router info
    pathname: location.pathname,

    // Combine params + query
    query: {
      ...queryString.parse(location.search),
      ...params,
    },

    // Expose raw router objects
    match,
    location,
    navigate,
  };
}
