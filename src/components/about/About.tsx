
import { useEffect } from "react";


function About({title, paragraph}: {title: string, paragraph: string}): React.JSX.Element {


  useEffect(() => {
    let text = document.getElementById("text");
    let readMoreBtn = document.getElementById("readMore");
    let isClamped = text!.scrollHeight > text!.clientHeight;

    readMoreBtn!.style.display = !isClamped ? "none": "block";

    
    function handleClick() {
      if (text?.classList.contains("line-clamp-5")) {
        text.classList.toggle("line-clamp-5");
        readMoreBtn!.textContent = "Read Less";
      } else {
        text!.classList.toggle("line-clamp-5");
        readMoreBtn!.textContent = "Read More...";

      }
    }

    readMoreBtn?.addEventListener("click", handleClick)

    // Cleaning UP.
    return () => {readMoreBtn?.removeEventListener("click", handleClick)}

    


  })


  return (
    <section className="text-start">
        <h3 className="mb-1 text-[#E5E2E3] font-semibold leading-7.75 text-2xl">{title}</h3>
        <p id="text" className="text-off-white leading-6.5 line-clamp-5 overflow-hidden">{paragraph}</p>
        <label id="readMore" className="text-blue-500 cursor-pointer">Read More...</label>
    </section>
  )

}


export default About;