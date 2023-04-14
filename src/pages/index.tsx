import Home from '../screen/Home';
import useMessaging from '@/hooks/messaging';
function HomePage() {
  useMessaging();

  return <Home />;
}

export default HomePage;
