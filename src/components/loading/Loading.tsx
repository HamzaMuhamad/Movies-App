import "./loading.css";

export default function Loading() {

  return (
    <section id="loadingContainer" className="text-off-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
      <div>Loading <span>.</span> <span>.</span> <span>.</span></div>
      <p className="text-xs text-[#545454]">Please wait a moment...</p>
    </section>
  )
}