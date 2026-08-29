import "./navbar.css"
function Navbar() {


  return (
    <nav className="overflow-hidden w-full px-5 py-2 bg-[#131314e7] backdrop-blur-lg text-off-white">
      <ul className="flex items-center justify-center w-full flex-1 gap-2">

        <li className="navbar-Item">
          <div>
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 17.1V5.7L7.6 0L15.2 5.7V17.1H9.5V10.45H5.7V17.1H0Z" fill="#CBC3D7"/>

            </svg>
          </div>
          <p>Home</p>
        </li>

        <li className="navbar-Item">
          <div>
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 0L4 4H7L5 0H7L9 4H12L10 0H12L14 4H17L15 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0V0V0M2 6V14V14V14H18V14V14V6H2V6M2 6V6V14V14V14V14V14V14V6V6" fill="#CBC3D7"/>
            </svg>

          </div>

          <p>Movies</p>
        </li>

        <li className="navbar-Item">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 18V16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H14V18H6V18M2 14H18V14V14V2V2V2H2V2V2V14V14V14V14M2 14V14V14V2V2V2V2V2V2V14V14V14V14V14" fill="#CBC3D7"/>
</svg>

          <p>TV Shows</p>
        </li>

        <li className="navbar-Item">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18V18M6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11V11" fill="#CBC3D7"/>
</svg>

          <p>Search</p>
        </li>

      </ul>
    </nav>
  )
}

export default Navbar