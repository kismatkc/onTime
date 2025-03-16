import axios from "axios";
import { useEffect, useState } from "react";
async function getAlerts(setNews: (data: any) => void) {
  try {
    const response = await axios.get(
      "https://puppeter-kismat-kcs-projects.vercel.app/scrape-news"
    );

    setNews(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchBusTimes(
  setBusTimings: (data: any) => void,
  setStops: (data: any) => void
) {
  try {
    const response = await axios.get(
      "https://puppeter-kismat-kcs-projects.vercel.app/bus-times"
    );

    setBusTimings(response.data.data.times);

    setStops(response.data.data.stops.toString());
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

type frequentBus = {
  routeTitle: string;
  predication: { time: string; branch: string }[];
};
export const useFetchTtcData = () => {
  const [busTimings, setBusTimings] = useState<frequentBus[] | null>(null);
  const [news, setNews] = useState<string[] | null>(null);
  const [stops, setStops] = useState<string>("");

  const refreshBusTimes = async () =>
    await fetchBusTimes(setBusTimings, setStops);

  useEffect(() => {
    getAlerts(setNews);

    const timer = setInterval(() => {
      getAlerts(setNews);
    }, 50000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchBusTimes(setBusTimings, setStops);

    const timer = setInterval(() => {
      fetchBusTimes(setBusTimings, setStops);
    }, 20000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return { news, busTimings, stops, refreshBusTimes };
};
