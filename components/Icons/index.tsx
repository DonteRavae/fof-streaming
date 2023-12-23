export const Icons = ({
  type,
  className,
}: {
  className?: string;
  type: string;
}) => {
  return (
    <>
      {/* INFORMATION CIRCLE*/}
      {type === "info-circle" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path
            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
            fill="#000"
          ></path>
        </svg>
      )}
      {/* GREEN CHECK */}
      {type === "green-check" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path
            d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
            fill="rgba(100,205,138,1)"
          ></path>
        </svg>
      )}
      {/* RED "X" */}
      {type === "red-x" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path
            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
            fill="rgba(255,0,0,1)"
          ></path>
        </svg>
      )}
      {/* DROPDOWN ARROW */}
      {type === "dropdown-arrow" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
        </svg>
      )}
      {/* USER */}
      {type === "user" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={className}
          fill="none"
        >
          <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
        </svg>
      )}
      {/* USER - PROFESSIONAL */}
      {type === "user-professional" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10C8.48448 10 7.03103 9.47322 5.95939 8.53553C4.88775 7.59785 4.28571 6.32608 4.28571 5C4.28571 3.67392 4.88775 2.40215 5.95939 1.46447C7.03103 0.526784 8.48448 0 10 0C11.5155 0 12.969 0.526784 14.0406 1.46447C15.1122 2.40215 15.7143 3.67392 15.7143 5C15.7143 6.32608 15.1122 7.59785 14.0406 8.53553C12.969 9.47322 11.5155 10 10 10ZM9.33482 14.0313L8.50446 12.8203C8.21875 12.4023 8.5625 11.875 9.11607 11.875H10H10.8795C11.433 11.875 11.7768 12.4063 11.4911 12.8203L10.6607 14.0313L12.1518 18.8711L13.7589 13.1328C13.8482 12.8164 14.1964 12.6094 14.558 12.6914C17.6875 13.3789 20 15.8555 20 18.8008C20 19.4648 19.3839 20 18.6295 20H12.7455C12.6518 20 12.567 19.9844 12.4866 19.957L12.5 20H7.5L7.51339 19.957C7.43304 19.9844 7.34375 20 7.25446 20H1.37054C0.616071 20 0 19.4609 0 18.8008C0 15.8516 2.31696 13.375 5.44196 12.6914C5.80357 12.6133 6.15179 12.8203 6.24107 13.1328L7.84821 18.8711L9.33929 14.0313H9.33482Z"
            fill="#C6400F"
          />
        </svg>
      )}
      {/* USER - GROUP */}
      {type === "user-group" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 20"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.625 0C6.4538 0 7.24866 0.32924 7.83471 0.915291C8.42076 1.50134 8.75 2.2962 8.75 3.125C8.75 3.9538 8.42076 4.74866 7.83471 5.33471C7.24866 5.92076 6.4538 6.25 5.625 6.25C4.7962 6.25 4.00134 5.92076 3.41529 5.33471C2.82924 4.74866 2.5 3.9538 2.5 3.125C2.5 2.2962 2.82924 1.50134 3.41529 0.915291C4.00134 0.32924 4.7962 0 5.625 0ZM20 0C20.8288 0 21.6237 0.32924 22.2097 0.915291C22.7958 1.50134 23.125 2.2962 23.125 3.125C23.125 3.9538 22.7958 4.74866 22.2097 5.33471C21.6237 5.92076 20.8288 6.25 20 6.25C19.1712 6.25 18.3763 5.92076 17.7903 5.33471C17.2042 4.74866 16.875 3.9538 16.875 3.125C16.875 2.2962 17.2042 1.50134 17.7903 0.915291C18.3763 0.32924 19.1712 0 20 0ZM0 11.668C0 9.36719 1.86719 7.5 4.16797 7.5H5.83594C6.45703 7.5 7.04687 7.63672 7.57812 7.87891C7.52734 8.16016 7.50391 8.45313 7.50391 8.75C7.50391 10.2422 8.16016 11.582 9.19531 12.5C9.1875 12.5 9.17969 12.5 9.16797 12.5H0.832031C0.375 12.5 0 12.125 0 11.668ZM15.832 12.5C15.8242 12.5 15.8164 12.5 15.8047 12.5C16.8438 11.582 17.4961 10.2422 17.4961 8.75C17.4961 8.45313 17.4688 8.16406 17.4219 7.87891C17.9531 7.63281 18.543 7.5 19.1641 7.5H20.832C23.1328 7.5 25 9.36719 25 11.668C25 12.1289 24.625 12.5 24.168 12.5H15.832ZM8.75 8.75C8.75 7.75544 9.14509 6.80161 9.84835 6.09835C10.5516 5.39509 11.5054 5 12.5 5C13.4946 5 14.4484 5.39509 15.1517 6.09835C15.8549 6.80161 16.25 7.75544 16.25 8.75C16.25 9.74456 15.8549 10.6984 15.1517 11.4017C14.4484 12.1049 13.4946 12.5 12.5 12.5C11.5054 12.5 10.5516 12.1049 9.84835 11.4017C9.14509 10.6984 8.75 9.74456 8.75 8.75ZM5 18.957C5 16.082 7.33203 13.75 10.207 13.75H14.793C17.668 13.75 20 16.082 20 18.957C20 19.5312 19.5352 20 18.957 20H6.04297C5.46875 20 5 19.5352 5 18.957Z"
            fill="#C6400F"
          />
        </svg>
      )}

      {/* PROFILE */}
      {type === "profile" && (
        <svg
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            d="M21.0082 3C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM20 5H4V19H20V5ZM18 15V17H6V15H18ZM12 7V13H6V7H12ZM18 11V13H14V11H18ZM10 9H8V11H10V9ZM18 7V9H14V7H18Z"
            fill="rgba(255,255,255,1)"
          ></path>
        </svg>
      )}

      {/* CALENDAR */}
      {type === "calendar" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 2H19C19.5523 2 20 2.44772 20 3V19C20 19.5523 19.5523 20 19 20H1C0.44772 20 0 19.5523 0 19V3C0 2.44772 0.44772 2 1 2H5V0H7V2H13V0H15V2ZM2 8V18H18V8H2ZM4 10H6V12H4V10ZM4 14H6V16H4V14ZM8 10H16V12H8V10ZM8 14H13V16H8V14Z"
            fill="#C6400F"
          />
        </svg>
      )}
      {/* MESSAGE */}
      {type === "message" && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 0C1.00898 0 0 1.00898 0 2.25V12.375C0 13.616 1.00898 14.625 2.25 14.625H5.625V17.4375C5.625 17.652 5.74453 17.8453 5.93438 17.9402C6.12422 18.0352 6.35273 18.0141 6.525 17.8875L10.8738 14.625H15.75C16.991 14.625 18 13.616 18 12.375V2.25C18 1.00898 16.991 0 15.75 0H2.25Z"
            fill="#C6400F"
          />
        </svg>
      )}
      {/* NOTIFICATION */}
      {type === "notifications" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            d="M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"
            fill="rgba(255,255,255,1)"
          ></path>
        </svg>
      )}
      {/* BILLINGS OR PAYMENTS */}
      {(type === "billing" || type === "payments") && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            d="M3.00488 3H21.0049C21.5572 3 22.0049 3.44772 22.0049 4V20C22.0049 20.5523 21.5572 21 21.0049 21H3.00488C2.4526 21 2.00488 20.5523 2.00488 20V4C2.00488 3.44772 2.4526 3 3.00488 3ZM20.0049 11H4.00488V19H20.0049V11ZM20.0049 9V5H4.00488V9H20.0049ZM14.0049 15H18.0049V17H14.0049V15Z"
            fill="rgba(255,255,255,1)"
          ></path>
        </svg>
      )}
      {/* LOGIN */}
      {type === "login" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path
            d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"
            fill="rgba(255,255,255,1)"
          ></path>
        </svg>
      )}
      {/* LOGOUT */}
      {type === "logout" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.366229 8.09196C-0.122076 8.5942 -0.122076 9.40982 0.366229 9.91205L5.36647 15.0549C5.85478 15.5571 6.64779 15.5571 7.13609 15.0549C7.6244 14.5527 7.6244 13.7371 7.13609 13.2348L4.26876 10.2857L12.4996 10.2857C13.1911 10.2857 13.7497 9.71116 13.7497 9C13.7497 8.28884 13.1911 7.71429 12.4996 7.71429H4.26876L7.13609 4.76518C7.6244 4.26295 7.6244 3.44732 7.13609 2.94509C6.64779 2.44286 5.85478 2.44286 5.36647 2.94509L0.366229 8.08795V8.09196ZM13.7497 15.4286C13.0583 15.4286 12.4996 16.0031 12.4996 16.7143C12.4996 17.4254 13.0583 18 13.7497 18H16.2498C18.3202 18 20 16.2723 20 14.1429V3.85714C20 1.72768 18.3202 2.38419e-07 16.2498 2.38419e-07H13.7497C13.0583 2.38419e-07 12.4996 0.574554 12.4996 1.28571C12.4996 1.99688 13.0583 2.57143 13.7497 2.57143H16.2498C16.9413 2.57143 17.4999 3.14598 17.4999 3.85714V14.1429C17.4999 14.854 16.9413 15.4286 16.2498 15.4286H13.7497Z"
            fill="white"
          />
        </svg>
      )}
      {/* MENU */}
      {type === "menu" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1.66667C0 0.744792 0.638393 0 1.42857 0H18.5714C19.3616 0 20 0.744792 20 1.66667C20 2.58854 19.3616 3.33333 18.5714 3.33333H1.42857C0.638393 3.33333 0 2.58854 0 1.66667ZM0 10C0 9.07812 0.638393 8.33333 1.42857 8.33333H18.5714C19.3616 8.33333 20 9.07812 20 10C20 10.9219 19.3616 11.6667 18.5714 11.6667H1.42857C0.638393 11.6667 0 10.9219 0 10ZM20 18.3333C20 19.2552 19.3616 20 18.5714 20H1.42857C0.638393 20 0 19.2552 0 18.3333C0 17.4115 0.638393 16.6667 1.42857 16.6667H18.5714C19.3616 16.6667 20 17.4115 20 18.3333Z"
            fill="white"
          />
        </svg>
      )}
      {/* SEARCH */}
      {type === "search" && (
        <svg
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
        </svg>
      )}

      {/* CART */}
      {type === "cart" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          height="24"
          width="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"></path>
        </svg>
      )}

      {/* ORDERS */}
      {type === "orders" && (
        <svg
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            d="M22 20V7L20 3H4L2 7.00353V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20ZM4 9H20V19H4V9ZM5.236 5H18.764L19.764 7H4.237L5.236 5ZM15 11H9V13H15V11Z"
            fill="rgba(255,255,255,1)"
          ></path>
        </svg>
      )}

      {/* CLOSE */}
      {type === "close" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path
            d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
            fill="rgba(97,35,118,1)"
          ></path>
        </svg>
      )}

      {/* RIGHT ARROW */}
      {type === "right-arrow" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="50"
          className={className}
        >
          <path
            d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"
            fill="rgba(97,35,118,1)"
          ></path>
        </svg>
      )}

      {/* EDIT DARK PENCIL */}
      {type === "edit-dark" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"></path>
        </svg>
      )}

      {/* EDIT LIGHT PENCIL */}
      {type === "edit-light" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
          fill="#FFF"
        >
          <path d="M15.7279 9.57629L14.3137 8.16207L5 17.4758V18.89H6.41421L15.7279 9.57629ZM17.1421 8.16207L18.5563 6.74786L17.1421 5.33365L15.7279 6.74786L17.1421 8.16207ZM7.24264 20.89H3V16.6474L16.435 3.21233C16.8256 2.8218 17.4587 2.8218 17.8492 3.21233L20.6777 6.04075C21.0682 6.43128 21.0682 7.06444 20.6777 7.45497L7.24264 20.89Z"></path>
        </svg>
      )}

      {/* ADD */}
      {type === "add" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
          fill="#FFF"
        >
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
        </svg>
      )}

      {/* ADD IN CIRCLE */}
      {type === "add-circle" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
          fill="#FFF"
        >
          <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
        </svg>
      )}

      {/* VOLUME MUTED */}
      {type === "volume-muted" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path
            d="M10 7.22056L6.60282 10.0001H3V14.0001H6.60282L10 16.7796V7.22056ZM5.88889 16.0001H2C1.44772 16.0001 1 15.5524 1 15.0001V9.00007C1 8.44778 1.44772 8.00007 2 8.00007H5.88889L11.1834 3.66821C11.3971 3.49335 11.7121 3.52485 11.887 3.73857C11.9601 3.8279 12 3.93977 12 4.05519V19.9449C12 20.2211 11.7761 20.4449 11.5 20.4449C11.3846 20.4449 11.2727 20.405 11.1834 20.3319L5.88889 16.0001ZM20.4142 12.0001L23.9497 15.5356L22.5355 16.9498L19 13.4143L15.4645 16.9498L14.0503 15.5356L17.5858 12.0001L14.0503 8.46454L15.4645 7.05032L19 10.5859L22.5355 7.05032L23.9497 8.46454L20.4142 12.0001Z"
            fill="rgba(255,255,255,1)"
          ></path>
        </svg>
      )}

      {/* VOLUME UP */}
      {type === "volume-up" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path
            d="M6.60282 10.0001L10 7.22056V16.7796L6.60282 14.0001H3V10.0001H6.60282ZM2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 15.292 21.5539 18.2463 19.2622 20.2622L17.8445 18.8444C19.7758 17.1937 21 14.7398 21 12C21 9.26016 19.7758 6.80629 17.8445 5.15557L19.2622 3.73779C21.5539 5.75368 23 8.70795 23 12ZM18 12C18 10.0883 17.106 8.38548 15.7133 7.28673L14.2842 8.71584C15.3213 9.43855 16 10.64 16 12C16 13.36 15.3213 14.5614 14.2842 15.2841L15.7133 16.7132C17.106 15.6145 18 13.9116 18 12Z"
            fill="rgba(255,255,255,1)"
          ></path>
        </svg>
      )}

      {/* VISA BRAND */}
      {type === "brand-visa" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path d="M22.2215 15.7683L21.9974 14.6431L19.4831 14.6431L19.0837 15.7599L17.0677 15.7643C18.3633 12.6514 19.3247 10.3455 19.952 8.84657C20.1159 8.45511 20.4072 8.25543 20.8364 8.25848C21.1638 8.26094 21.6991 8.26124 22.4421 8.25942L24 15.7648L22.2215 15.7683ZM20.0485 13.1018H21.6692L21.0642 10.2819L20.0485 13.1018ZM7.06069 8.2567L9.08703 8.25933L5.95498 15.7683L3.90367 15.7675C3.21013 13.0896 2.70084 11.1042 2.37581 9.81122C2.27616 9.4148 2.07796 9.13797 1.69702 9.00705C1.35736 8.89031 0.791683 8.7098 0 8.46553V8.25942C1.48023 8.25924 2.55921 8.25924 3.23694 8.25942C3.7974 8.25959 4.12411 8.53015 4.22922 9.08566C4.33473 9.6435 4.60127 11.0616 5.02884 13.3398L7.06069 8.2567ZM11.8702 8.25934L10.2695 15.7676L8.34108 15.7648C8.37914 15.5824 8.91202 13.0797 9.93972 8.2567L11.8702 8.25934ZM15.7815 8.12012C16.3578 8.12012 17.0846 8.2992 17.5035 8.46553L17.1652 10.0221C16.7871 9.87023 16.1657 9.66491 15.6424 9.67294C14.8813 9.68462 14.4117 10.004 14.4117 10.3105C14.4117 10.808 15.2277 11.0586 16.0681 11.603C17.0265 12.2237 17.1531 12.78 17.1412 13.3856C17.1277 14.6413 16.0681 15.8801 13.8322 15.8801C12.8111 15.8648 12.4444 15.7791 11.6122 15.4839L11.9637 13.8595C12.8106 14.2142 13.1698 14.327 13.8935 14.327C14.5569 14.327 15.1263 14.0589 15.1312 13.5919C15.1347 13.2598 14.9316 13.0955 14.1871 12.6847C13.4427 12.2739 12.3994 11.706 12.4128 10.5631C12.43 9.10074 13.815 8.12012 15.7815 8.12012Z"></path>
        </svg>
      )}

      {/* MASTERCARD BRAND */}
      {type === "brand-mastercard" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className={className}
        >
          <path d="M12.001 18.2944C10.916 18.9336 9.65132 19.3002 8.30098 19.3002C4.2693 19.3002 1.00098 16.0319 1.00098 12.0002C1.00098 7.96852 4.2693 4.7002 8.30098 4.7002C9.65132 4.7002 10.916 5.06683 12.001 5.70599C13.0859 5.06683 14.3506 4.7002 15.701 4.7002C19.7327 4.7002 23.001 7.96852 23.001 12.0002C23.001 16.0319 19.7327 19.3002 15.701 19.3002C14.3506 19.3002 13.0859 18.9336 12.001 18.2944ZM13.7027 16.9106C14.3194 17.1618 14.994 17.3002 15.701 17.3002C18.6281 17.3002 21.001 14.9273 21.001 12.0002C21.001 9.07309 18.6281 6.7002 15.701 6.7002C14.994 6.7002 14.3194 6.83861 13.7027 7.08982C14.8821 8.38643 15.601 10.1094 15.601 12.0002C15.601 13.891 14.8821 15.614 13.7027 16.9106ZM10.2992 7.08982C9.68255 6.83861 9.00793 6.7002 8.30098 6.7002C5.37387 6.7002 3.00098 9.07309 3.00098 12.0002C3.00098 14.9273 5.37387 17.3002 8.30098 17.3002C9.00793 17.3002 9.68255 17.1618 10.2992 16.9106C9.11986 15.614 8.40098 13.891 8.40098 12.0002C8.40098 10.1094 9.11986 8.38643 10.2992 7.08982ZM12.001 8.20546C11.0139 9.16805 10.401 10.5125 10.401 12.0002C10.401 13.4878 11.0139 14.8323 12.001 15.7949C12.9881 14.8323 13.601 13.4878 13.601 12.0002C13.601 10.5125 12.9881 9.16805 12.001 8.20546Z"></path>
        </svg>
      )}

      {/* FILE UPLOAD */}
      {type === "file-upload" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="48"
          height="48"
        >
          <path
            d="M7 20.9811C3.64378 20.7257 1 17.9216 1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811V21H7V20.9811ZM13 13H16L12 8L8 13H11V17H13V13Z"
            fill="rgba(204,204,204,1)"
          ></path>
        </svg>
      )}
    </>
  );
};
