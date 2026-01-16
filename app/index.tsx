import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Redirect } from 'expo-router';

export default function Home() {
  return <Redirect href="/toDo" />;
}
