import { useState } from "react";
import { Text, View,TouchableOpacity  } from "react-native";
import Sleep from "~/components/sleep";
import { topics,topicsType } from "~/constants";
const Home = ({}) => {
  const [view, setView] = useState<topicsType| null>("Sleep");
  if(view === "Sleep") return <Sleep />
  return (
    <View className="flex flex-col h-full px-2 gap-y-3">
      {topics.map((subject) => (
        <TouchableOpacity className="bg-[#F3EFE0] w-full h-[20%] rounded-3xl flex items-center justify-center" key={subject} onPress={()=> setView(subject)} >
          <Text className="text-3xl font-bold ">{subject}</Text>
        </TouchableOpacity >
      ))}
    </View>
  );
};

export default Home;
