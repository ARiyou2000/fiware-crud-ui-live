import Image from 'next/image'
import {Inter} from 'next/font/google'
import useSWR from "swr";
import {useEffect} from "react";
import dynamic from 'next/dynamic';

const DynamicJsonViewer = dynamic(() => import('react-json-view'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const inter = Inter({subsets: ['latin']})

const fetchUrl = async (url, init = {}) => {
  const {method = "GET", header, body} = init

  return new Promise(async (resolve, reject) => {
    let response;
    try {
      const params = {
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
          "Host": "localhost:1026",
          "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          ...header,
        },
      };
      if (method !== "GET" || method !== "DELETE") {
        params.body = JSON.stringify(body);
      }

      // Actual Data fetch with given url and request description
      response = await fetch(url);

      const result = await response.json();

      // console.log("response in fetchUrl: ", response);
      // console.log("result (json response) in fetchUrl: ", result);

      // Following statements will run only if fetch return resolved value
      if (response.ok) {
        // console.log(url, result.result)
        resolve(result);
      } else {
        // HTTP Response such as 404 and 500 are considered Resolved fetch data (since it will get something as answer)
        reject(result);
      }
      // Following statements will run if fetch result is rejected or fetch has thrown an Error for connection issues
    } catch (e) {
      console.groupCollapsed("fetchUrl error : ");
      console.error("error : ", e);
      console.groupEnd();
      reject("a network error is encountered or there is syntax error");
    }
  });
};

export default function Home() {

  const {
    data,
    error
  } = useSWR("http://localhost:1026/v2/entities?type=Product", (url) => fetchUrl(url), {refreshInterval: 1000})

  useEffect(() => {
    const getData = async () => {
      const response = await fetchUrl("http://localhost:1026/v2/entities?type=Product");
      console.log(response)
    }

    getData();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <a href={"https://github.com/ARiyou2000"} className={"hover:text-blue-500 duration-700"}>
          <p
            className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Coded with L♥VE by&nbsp;
            <code className="font-mono font-bold">ARiyou2000</code>
          </p>
        </a>
        <div
          className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.fiware.org/catalogue/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/*By{' '}*/}
            <Image
              src="/fiware.png"
              alt="FIWARE Logo"
              className="dark:invert"
              width={200}
              height={50}
              priority
            />
          </a>
        </div>
      </div>

      <div
        className="py-4 text-xl relative flex gap-16 items-center justify-between w-full before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <div className={"bg-white rounded-2xl shadow-2xl p-8 overflow-auto w-full basis-1/2 h-96 no-scrollbar"}>
          <DynamicJsonViewer src={data || {message: "data is loading or there is problem"}}/>
        </div>

        <div
          className={"bg-white rounded-2xl shadow-2xl p-8 overflow-auto w-full basis-1/2 h-96 no-scrollbar flex flex-col items-start justify-start relative"}>
          <div
            className={"absolute backdrop-blur-[3px] z-10 inset-0"}>
            <div className={"w-full h-full flex items-center justify-around text-red-600 text-center text-5xl"}>
              <h2 className={"animate-pulse hover:animate-bounce drop-shadow-2xl"}>Blockchain connection Error</h2>
            </div>
          </div>
          {/*{["Create New Entity", "Edit an Entity", "Delete an Entity"].map((buttonTitle, index) => {*/}
          {/*  return (*/}
          {/*    <button key={index} className={"block text-3xl"}>{buttonTitle}</button>*/}
          {/*  )*/}
          {/*})}*/}
          <h1 className={"block text-2xl"}>Smart contract logs:</h1>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://www.fiware.org/catalogue/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about FIWARE features and API.
          </p>
        </a>

        <a
          href="https://fiware-tutorials.readthedocs.io/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about FIWARE in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://smartdatamodels.org/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Discover and deploy boilerplate example FIWARE&nbsp;data modales.
          </p>
        </a>

        <a
          href="https://fiware-academy.readthedocs.io/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Academy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Join FIWARE academia and learn how it works.
          </p>
        </a>
      </div>
    </main>
  )
}
