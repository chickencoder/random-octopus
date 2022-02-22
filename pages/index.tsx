import Head from "next/head";
import RepositoryView from "../components/repository-view";

export default function Home() {
  return (
    <>
      <Head>
        <title>Frontend Coding Challenge 🖥</title>
      </Head>
      <main className="mx-auto mt-8 max-w-2xl p-4">
        <span className="mb-2 block text-center text-3xl">📈</span>
        <h1 className="mb-12 text-center text-3xl font-bold">
          Trending Repositories
        </h1>
        <RepositoryView />
      </main>
    </>
  );
}
