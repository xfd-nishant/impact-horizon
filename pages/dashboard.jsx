import Head from "next/head";
import ScenarioDashboard from "../components/ScenarioDashboard";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Scenarios • Impact Horizon</title>
      </Head>
      <ScenarioDashboard />
    </>
  );
}