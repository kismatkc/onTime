import { format,add } from "date-fns";
import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
const Sleep = ({}) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <View className="flex flex-col px-2">
      <View className="flex flex-col mt-10 gap-y-2">
        <Text className="text-4xl font-bold">
          Today is {format(time, "MMM, dd yyyy")}
        </Text>
        <Text className="text-4xl font-bold">
          Time is {add()}

        </Text>
      </View>
      <View className="flex flex-col mt-6">
        <Text className="text-4xl font-bold">For 8hrs 10mins sleep</Text>
        <Text className="text-4xl font-bold">For 8hrs 10mins sleep</Text>
        
      </View>
    </View>
  );
};

export default Sleep;
