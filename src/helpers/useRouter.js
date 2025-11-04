import {
  useParams,
  useLocation,
  useNavigate,
  useMatch
} from 'react-router-dom';
import queryString from 'query-string';

export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const match = useMatch('');

  // Return our custom router object
  return {
    // Navigation helpers
    push: (url) => navigate(url),
    replace: (url) => navigate(url, { replace: true }),
    back: () => window.history.length > 1 ? navigate(-1) : navigate('/'),

    // Basic router info
    pathname: location.pathname,

    // Combine params + query
    query: {
      ...queryString.parse(location.search),
      ...params
    },

    // Expose raw router objects
    match,
    location,
    navigate
  };
}
