interface ITourDuration {
  label: string;
  value?: number[];
}

export const tourDuration: ITourDuration[] = [
  {
    label: "Менее недели",
    value: [0, 7],
  },
  {
    label: "1-2 недели",
    value: [7, 14],
  },
  {
    label: "2 недели - 1 месяц",
    value: [14, 30],
  },
  {
    label: "Более месяца",
    value: [30, 0],
  },
  {
    label: "Другое:",
  },
];
