import { useState } from "react";
import { Layout } from "./components/Layout";
import { useStore } from "./hooks/useStore";
import type { View } from "./lib/types";
import { Abitudini } from "./views/Abitudini";
import { Attivita } from "./views/Attivita";
import { Note } from "./views/Note";
import { Oggi } from "./views/Oggi";

export default function App() {
  const [view, setView] = useState<View>("oggi");
  const store = useStore();

  return (
    <Layout view={view} onChange={setView}>
      {view === "oggi" && <Oggi store={store} onOpen={setView} />}
      {view === "attivita" && <Attivita store={store} />}
      {view === "note" && <Note store={store} />}
      {view === "abitudini" && <Abitudini store={store} />}
    </Layout>
  );
}
