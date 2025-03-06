import { Text, View } from "react-native";
import Card from "~/components/sleep";
const Home = ({}) => {
  return (
    <View className="flex flex-col h-full px-2 gap-y-3">
      <Card topic="Sleep" />
      <Card topic="Weather" />
      <Card topic="TTC" />
    </View>
  );
};

export default Home;
