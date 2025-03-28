export type topicsType = "Sleep" | "TTC" | "Weather";

export const topics: topicsType[] = ["Sleep", "TTC", "Weather"];

export const gradients: gradientsType = {
  morning: ["#FFB88C", "#FFDDE1"],
  afternoon: ["#6ED4FF", "#3A7BD5"],
  evening: ["#FF6B6B", "#4B6CB7"],
  night: ["#0F2027", "#2C5364"],
};

interface gradientsType {
  morning: string[];
  afternoon: string[];
  evening: string[];
  night: string[];
}
