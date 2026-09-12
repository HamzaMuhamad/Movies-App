import "./navbar.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
function Navbar() {
  /**
   * There is a new data-type I learnt called JSX.Element, this is what I use to return JSX elements.
   * ```jsx
   * let searchBar: React.JSX.Element = (<li className="">...</li>)
   * ```
   * * __________________________________
   * 
   * Framer motion => Animates before removing from the dom (Read More)
   * 
   * *___________________________________
   *
   */

  let [openSearch, setOpenSearch] = useState(false);

  function searchIconClick() {
    setOpenSearch(!openSearch);
  }

  let searchBar: React.JSX.Element = (
    <li className="flex items-center border-2 rounded-full px-5 border-[#b4b1b9] overflow-hidden ">
      <form action="" method="GET" className="flex items-center">
        <input
          type="text"
          name="search"
          id=""
          placeholder="Movie/TV Show/actor"
          className="outline-0"
        />
      </form>
      <div
        onClick={searchIconClick}
        className="min-h-15.5 p-2 flex flex-col items-center justify-center w-12 translate-x-5 cursor-pointer hover:bg-[#b4b1b925] rounded-3xl duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          fill="#CBC3D7"
          height="18"
          width="18"
          version="1.1"
          id="Capa_1"
          viewBox="0 0 460.775 460.775"
          xmlSpace="preserve"
          className="x-icon"
        >
          <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
        </svg>
      </div>
    </li>
  );

  

  // Change the active class to the clicked item
  useEffect(() => {

    const navBarElements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("nav ul li a");

    const handleNavElements: Map<HTMLAnchorElement, () => void> = new Map(); 

    navBarElements.forEach((element) => {
      function clickHander () {
        navBarElements.forEach((ele) => {
          ele.classList.remove("active")
        });
        
        element.classList.add("active")
      }
      handleNavElements.set(element, clickHander);
      element.addEventListener("click", clickHander)

    })
    // Clean UP
    return () => {
      handleNavElements.forEach((clickHander, element) => {
        element.removeEventListener("click", clickHander);
      }) 
    }
  }, [openSearch]) 

  

  return (
    <nav className="overflow-hidden w-full px-5 py-2 bg-[#131314e7] backdrop-blur-lg text-off-white">
      <ul>
        <AnimatePresence>
            {!openSearch && (
              
              <motion.ul initial={{height: "0px", opacity: 0}} animate={{height: "66px", opacity: 1}} exit={{height: "0px", opacity: 0}} transition={{duration: 0.2}} className="flex items-center justify-center w-full flex-1 gap-2">
                <li>
                  <a href="#" className="navbar-Item active">
                    <div>
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient
                            id="iconGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop stopColor="#D0BCFF" offset="18%" />
                            <stop stopColor="#7D7199" offset="100%" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 17.1V5.7L7.6 0L15.2 5.7V17.1H9.5V10.45H5.7V17.1H0Z"
                          fill="#CBC3D7"
                        />
                      </svg>
                    </div>
                    <p>Home</p>
                  </a>
                </li>

                <li>
                  <a href="#" className="navbar-Item">
                    <div>
                      <svg
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 0L4 4H7L5 0H7L9 4H12L10 0H12L14 4H17L15 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0V0V0M2 6V14V14V14H18V14V14V6H2V6M2 6V6V14V14V14V14V14V14V6V6"
                          fill="#CBC3D7"
                        />
                      </svg>
                    </div>

                    <p>Movies</p>
                  </a>
                </li>

                <li>
                  <a href="#" className="navbar-Item">
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18V16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H14V18H6V18M2 14H18V14V14V2V2V2H2V2V2V14V14V14V14M2 14V14V14V2V2V2V2V2V2V14V14V14V14V14"
                        fill="#CBC3D7"
                      />
                    </svg>

                    <p>TV Shows</p>
                  </a>
                </li>

                <li>
                  <div
                    onClick={searchIconClick}
                    className="navbar-Item cursor-pointer"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="search-icon"
                    >
                      <path
                        d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18V18M6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11V11"
                        fill="#CBC3D7"
                      />
                    </svg>

                    <p>Search</p>
                  </div>
                </li>
              </motion.ul>
            )}

        </AnimatePresence>

        <AnimatePresence>
          {openSearch && (
            <motion.ul initial={{height: "0px", opacity: 0}} animate={{height: "66px", opacity: 1}} exit={{height: "0px", opacity: 0}} transition={{duration: 0.2}} className="flex items-center justify-center w-full flex-1 gap-2 ">

              {searchBar}
            </motion.ul>
          )
        }
            
        </AnimatePresence>
      </ul>
    </nav>
  );
}

export default Navbar;
