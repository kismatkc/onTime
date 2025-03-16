//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  SectionList,
} from "react-native";
import Sleep from "./sleep";
import { format, add } from "date-fns";
import uuid from "react-native-uuid";
import Loader from "./loader";
import TTCAlert from "./ttc-alerts";
import axios from "axios";
import { Button } from "./ui/button";
import ModifyStops from "./modify-button";

type frequentBus = {
  routeTitle: string;
  predication: { time: string; branch: string }[];
};

export default function TTC({
  news,
  busTimings,
}: {
  news: string[] | null;
  busTimings: frequentBus[] | null;
}) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const DATA = [
    {
      title: "bus",
      data: busTimings,
    },
    {
      title: "news",
      data: news,
    },
  ];

  if (!(news || busTimings))
    return (
      <View className="h-full ">
        <ActivityIndicator size="large" className="relative top-1/4" />
      </View>
    );

  return (
    <View className="flex flex-col px-3 h-full">
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          if (item.title === "bus") {
            return (
              <View>
                <View className="flex flex-col mt-4 gap-y-2">
                  <Text className="text-4xl font-bold">
                    Current Time is {format(time, "hh:mm aa")}
                  </Text>
                </View>

                <View>
                  {data?.length > 0 && (
                    <View className="flex flex-col items-end">
                      <Text className="text-3xl font-semibold text-center mt-3 pt-3 self-center">
                        Frequently used
                      </Text>
                      <ModifyStops />
                    </View>
                  )}
                  <View className="flex flex-row gap-x-2 flex-wrap">
                    {data &&
                      data.length > 0 &&
                      data.map((bus, index) => (
                        <View key={bus.routeTitle + index}>
                          <Text className="text-xl font-semibold pb-1">
                            {bus.routeTitle}
                          </Text>
                          <FlatList
                            data={bus.prediction}
                            keyExtractor={(item) => uuid.v4()}
                            renderItem={({ item }) => {
                              return (
                                <Text className="text-lg  font-medium">
                                  {`${format(
                                    add(time, { seconds: Number(item.time) }),
                                    "hh:mm aa"
                                  )}(${item.branch})`}
                                </Text>
                              );
                            }}
                          />
                        </View>
                      ))}
                  </View>
                </View>
              </View>
            );
          }
          if (item.title === "news") {
            <TTCAlert news={item.data}></TTCAlert>;
          }
        }}
      />
    </View>
  );
}
