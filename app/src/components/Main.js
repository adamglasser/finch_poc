export default function Main (){
return (
  <header>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">Finch POC APP</h1>

        <p className="mt-1.5 text-md text-gray-500">Let's fetch some data</p>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
        <a
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
          type="button"
          href="https://sandbox.tryfinch.com/"
          target="blank"
        >
          <span className="text-sm font-medium"> Finch API Sandbox Docs </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
  </header>
)
}