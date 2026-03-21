import { useState, useEffect } from "react";
import { attacks } from "../data/attacks";

function Alerts() {
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        attacks[Math.floor(Math.random() * attacks.length)];

      setAlert(`⚠️ ${random.type} attack from ${random.source} to ${random.target}`);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return <div className="alert">{alert}</div>;
}

export default Alerts;