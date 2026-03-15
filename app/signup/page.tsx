import { useEffect, useState } from "react";

type Plan = {
  name: string;
  price: number;
};

const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

useEffect(() => {
  const storedPlan = localStorage.getItem("selectedPlan");
  if (storedPlan) {
    setSelectedPlan(JSON.parse(storedPlan));
  }
}, []);
<div
  style={{
    background: "#f0f4ff",
    border: "2px solid #3568cf",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  }}
>
  <p
    style={{
      fontSize: "12px",
      color: "#3568cf",
      fontWeight: "bold",
      marginBottom: "8px",
      letterSpacing: "1px",
    }}
  >
    SELECTED SUBSCRIPTION
  </p>

  <h2
    style={{
      margin: "0",
      fontSize: "26px",
      color: "#1a1a1a",
    }}
  >
    {selectedPlan?.name}
  </h2>

  <p
    style={{
      fontSize: "32px",
      fontWeight: "bold",
      color: "#3568cf",
      marginTop: "5px",
    }}
  >
    ${selectedPlan?.price}
  </p>
</div>