import { useState } from "react";

export default function useUserFilters() {
  const [filters, setFilters] = useState({
    name: "",
    role: "all",
    order: "asc",
    page: 1,
    limit: 10,
  });

  const setFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? value : 1,
    }));
  };

  return [filters, setFilter];
}