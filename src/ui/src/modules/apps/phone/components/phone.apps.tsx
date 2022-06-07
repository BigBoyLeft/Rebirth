import { useMemo } from "react";
import apps from "./Apps";

import Grow from "@mui/material/Grow";

import { app } from "../phone.store";
import { useAppSelector } from "@/hooks/store";
import home from "./phone.home";

const Apps = () => {
  const App = useAppSelector(app)
  const Component = App === 0 ? home : useMemo(() => apps[App - 1].component, [App])

  return <Component />
};

export default Apps;