import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Sleep from "~/components/sleep";
import TTC from "~/components/ttc";
import WeatherApp from "~/components/weather";
import { topics, topicsType } from "~/constants";
import { useFetchTtcData } from "~/lib/fetch-datas";

const Home = ({}) => {
  const [view, setView] = useState<topicsType | null>(null);
  const { news, busTimings } = useFetchTtcData();
  if (view) {
    return (
      <View className="flex flex-col gap-y-3">
        <Text className="pl-1">
          <ArrowLeft onPress={() => setView(null)} color={"black"} size={30} />
        </Text>
        {view === "Sleep" && <Sleep />}
        {view === "TTC" && <TTC news={news} busTimings={busTimings} />}
        {view === "Weather" && <WeatherApp />}
      </View>
    );
  }
  return (
    <View className="flex flex-col h-full px-2 gap-y-3">
      {topics.map((subject) => (
        <TouchableOpacity
          className="bg-[#F3EFE0] w-full h-[20%] rounded-3xl flex items-center justify-center"
          key={subject}
          onPress={() => setView(subject)}
        >
          <Text className="text-3xl font-bold ">{subject}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Home;
