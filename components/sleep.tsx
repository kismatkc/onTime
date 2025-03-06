import { Text, View } from "react-native";

const Card = ({ topic }: { topic: string }) => {
  return (
    <View className="bg-[#F3EFE0] w-full h-[20%] rounded-3xl flex items-center justify-center">
      <Text className="text-3xl font-bold ">{topic}</Text>
    </View>
  );
};

export default Card;
