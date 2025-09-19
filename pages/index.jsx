import Head from "next/head";
import EnterScreen from "../components/EnterScreen";

export default function Home() {
  return (
    <>
      <Head>
        <title>Impact Sandbox</title>
      </Head>
      <EnterScreen />
    </>
  );
}