# Side nav

The collapsible left navigation. The brand lockup (mountain + water mark beside the "Deschutes Water Bank" wordmark) links home. Primary destinations (Parcel Discovery Tool, Scenarios) sit above a divider; secondary utilities (News, Help) below it.

## Key decisions
- 280px expanded / 72px collapsed rail, animated with a width transition.
- Active item = blue tint (--noria-blue-100) + semibold + primary text. No colored left-border indicator.
- Same blue-tinted neutral as the top bar, one value-step lighter, so the rail sits just under the bar.
- Two SVGs for the logo: a full mark+wordmark lockup (expanded) and a separate viewBox-cropped mark (collapsed), toggled by the .collapsed class.

## Gotchas
- Do not scale one logo SVG between states — swap between the full lockup and the cropped mark; the collapsed mark is capped at max-width:40px so it never spills the 72px rail.
- Labels are hidden (display:none), not removed, when collapsed — the icons stay.

## Done when
- Toggle collapses the rail to a 72px icon-only column and back.
- The active route is highlighted; the logo links to home.

## Markup
```html
<nav class="side-nav" id="side-nav" aria-label="Primary">
  <div class="sidebar-header">
    <a href="/noria-design/" class="brand" aria-label="Deschutes Water Bank home">
      <svg
        class="brand__logo brand__logo--full"
        viewBox="0 0 265 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Deschutes Water Bank"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.132 20.253C17.248 20.0786 26.0368 20.753 34.9495 25.6162C19.9511 20.7766 9.20989 20.9022 4.80346 23.17L10.132 20.253Z"
          fill="#75B6D4"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M84.6119 21.0179C78.6027 25.7935 65.956 25.4576 53.8952 23.0401C63.3993 26.6315 77.6023 27.9763 88.9442 23.0829L84.6119 21.0179Z"
          fill="#75B6D4"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 29.0521L11.1453 35.24C31.0301 22.9565 50.5681 47.1573 70.4712 41.5009C71.2225 41.2849 71.8639 40.7947 72.5593 40.4426C61.6485 41.0518 48.9818 38.3219 44.591 34.0613C55.3208 38.6296 66.534 39.8464 76.6754 38.2474L80.6849 36.0093C53.001 41.307 17.7872 14.7378 0 29.0521Z"
          fill="#75B6D4"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.7747 18.6636L17.2853 16.1606C36.0024 13.7845 65.1372 36.4297 90.4361 24.1725L96.4494 27.3023L89.1854 31.1822C61.3344 40.4046 35.7389 18.0784 12.7747 18.6636Z"
          fill="#75B6D4"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.8433 39.0564C29.4215 32.0964 45.0623 46.6529 62.8063 44.6923L60.3733 46.0025C42.6824 53.0217 32.1607 39.3072 20.8433 39.0564Z"
          fill="#859B44"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.1207 12.5143C41.9522 13.5038 61.3944 28.0414 80.7452 18.7748L67.7272 11.5319L64.4087 13.2502L58.1425 7.48075L53.3002 7.73316L46.8061 0L35.1746 8.71525L32.9631 7.48075L24.1207 12.5143Z"
          fill="#4E4B45"
        ></path>
        <path
          d="M118.813 20H113.884V5.45455H118.912C120.357 5.45455 121.597 5.74574 122.634 6.32812C123.676 6.90578 124.476 7.73674 125.035 8.82102C125.593 9.9053 125.873 11.2027 125.873 12.7131C125.873 14.2282 125.591 15.5303 125.027 16.6193C124.469 17.7083 123.661 18.544 122.606 19.1264C121.554 19.7088 120.29 20 118.813 20ZM116.519 17.7202H118.685C119.698 17.7202 120.544 17.5355 121.221 17.1662C121.898 16.7921 122.407 16.2358 122.748 15.4972C123.089 14.7538 123.259 13.8258 123.259 12.7131C123.259 11.6004 123.089 10.6771 122.748 9.94318C122.407 9.20455 121.902 8.65294 121.235 8.28835C120.572 7.91903 119.748 7.73438 118.763 7.73438H116.519V17.7202ZM131.976 20V5.45455H141.436V7.66335H134.611V11.6122H140.946V13.821H134.611V17.7912H141.493V20H131.976ZM155.629 9.45312C155.563 8.83286 155.284 8.34991 154.791 8.00426C154.304 7.65862 153.669 7.4858 152.888 7.4858C152.339 7.4858 151.868 7.56866 151.475 7.73438C151.082 7.90009 150.781 8.125 150.573 8.40909C150.364 8.69318 150.258 9.01752 150.253 9.3821C150.253 9.68513 150.322 9.94792 150.459 10.1705C150.601 10.393 150.793 10.5824 151.034 10.7386C151.276 10.8902 151.543 11.018 151.837 11.1222C152.13 11.2263 152.426 11.3139 152.725 11.3849L154.088 11.7259C154.638 11.8537 155.165 12.0265 155.672 12.2443C156.183 12.4621 156.64 12.7367 157.043 13.0682C157.45 13.3996 157.772 13.7997 158.009 14.2685C158.245 14.7372 158.364 15.2865 158.364 15.9162C158.364 16.7685 158.146 17.5189 157.71 18.1676C157.275 18.8116 156.645 19.3158 155.821 19.6804C155.002 20.0402 154.01 20.2202 152.845 20.2202C151.714 20.2202 150.731 20.045 149.898 19.6946C149.069 19.3442 148.421 18.8329 147.952 18.1605C147.488 17.4882 147.237 16.669 147.199 15.7031H149.791C149.829 16.2098 149.986 16.6312 150.26 16.9673C150.535 17.3035 150.892 17.5545 151.333 17.7202C151.778 17.8859 152.275 17.9688 152.824 17.9688C153.397 17.9688 153.899 17.8835 154.33 17.7131C154.765 17.5379 155.106 17.2964 155.352 16.9886C155.599 16.6761 155.724 16.3116 155.729 15.8949C155.724 15.5161 155.613 15.2036 155.395 14.9574C155.177 14.7064 154.872 14.4981 154.479 14.3324C154.091 14.1619 153.636 14.0104 153.115 13.8778L151.46 13.4517C150.263 13.1439 149.316 12.6776 148.62 12.0526C147.928 11.4228 147.583 10.5871 147.583 9.54545C147.583 8.68845 147.815 7.93797 148.279 7.29403C148.747 6.65009 149.384 6.15057 150.189 5.79545C150.994 5.43561 151.906 5.25568 152.924 5.25568C153.956 5.25568 154.86 5.43561 155.637 5.79545C156.418 6.15057 157.031 6.64536 157.476 7.27983C157.921 7.90956 158.151 8.634 158.165 9.45312H155.629ZM176.763 10.3622H174.107C174.031 9.92661 173.892 9.54072 173.688 9.20455C173.484 8.86364 173.231 8.57481 172.928 8.33807C172.625 8.10133 172.279 7.92377 171.891 7.8054C171.508 7.68229 171.093 7.62074 170.648 7.62074C169.857 7.62074 169.157 7.8196 168.546 8.21733C167.935 8.61032 167.457 9.18797 167.111 9.95028C166.766 10.7079 166.593 11.6335 166.593 12.7273C166.593 13.84 166.766 14.7775 167.111 15.5398C167.462 16.2973 167.94 16.8703 168.546 17.2585C169.157 17.642 169.855 17.8338 170.641 17.8338C171.077 17.8338 171.484 17.777 171.863 17.6634C172.246 17.545 172.589 17.3722 172.892 17.1449C173.2 16.9176 173.458 16.6383 173.667 16.3068C173.88 15.9754 174.026 15.5966 174.107 15.1705L176.763 15.1847C176.664 15.8759 176.448 16.5246 176.117 17.1307C175.79 17.7367 175.362 18.2718 174.831 18.7358C174.301 19.1951 173.681 19.5549 172.971 19.8153C172.26 20.071 171.472 20.1989 170.606 20.1989C169.327 20.1989 168.186 19.9029 167.182 19.3111C166.178 18.7192 165.388 17.8646 164.81 16.7472C164.232 15.6297 163.944 14.2898 163.944 12.7273C163.944 11.16 164.235 9.82008 164.817 8.70739C165.4 7.58996 166.193 6.73532 167.196 6.14347C168.2 5.55161 169.337 5.25568 170.606 5.25568C171.415 5.25568 172.168 5.36932 172.864 5.59659C173.56 5.82386 174.18 6.15767 174.725 6.59801C175.269 7.03362 175.717 7.56866 176.067 8.20312C176.422 8.83286 176.654 9.55256 176.763 10.3622ZM182.776 20V5.45455H185.411V11.6122H192.151V5.45455H194.793V20H192.151V13.821H185.411V20H182.776ZM210.428 5.45455H213.063V14.9574C213.063 15.9991 212.817 16.9152 212.324 17.706C211.837 18.4967 211.15 19.1146 210.265 19.5597C209.379 20 208.345 20.2202 207.161 20.2202C205.973 20.2202 204.936 20 204.05 19.5597C203.165 19.1146 202.478 18.4967 201.991 17.706C201.503 16.9152 201.259 15.9991 201.259 14.9574V5.45455H203.894V14.7372C203.894 15.3433 204.027 15.883 204.292 16.3565C204.562 16.83 204.94 17.2017 205.428 17.4716C205.916 17.7367 206.493 17.8693 207.161 17.8693C207.829 17.8693 208.406 17.7367 208.894 17.4716C209.386 17.2017 209.765 16.83 210.03 16.3565C210.295 15.883 210.428 15.3433 210.428 14.7372V5.45455ZM218.888 7.66335V5.45455H230.493V7.66335H225.997V20H223.384V7.66335H218.888ZM236.33 20V5.45455H245.79V7.66335H238.965V11.6122H245.3V13.821H238.965V17.7912H245.847V20H236.33ZM259.983 9.45312C259.917 8.83286 259.638 8.34991 259.145 8.00426C258.658 7.65862 258.023 7.4858 257.242 7.4858C256.693 7.4858 256.222 7.56866 255.829 7.73438C255.436 7.90009 255.135 8.125 254.927 8.40909C254.718 8.69318 254.612 9.01752 254.607 9.3821C254.607 9.68513 254.676 9.94792 254.813 10.1705C254.955 10.393 255.147 10.5824 255.388 10.7386C255.63 10.8902 255.897 11.018 256.191 11.1222C256.484 11.2263 256.78 11.3139 257.079 11.3849L258.442 11.7259C258.991 11.8537 259.519 12.0265 260.026 12.2443C260.537 12.4621 260.994 12.7367 261.397 13.0682C261.804 13.3996 262.126 13.7997 262.363 14.2685C262.599 14.7372 262.718 15.2865 262.718 15.9162C262.718 16.7685 262.5 17.5189 262.064 18.1676C261.629 18.8116 260.999 19.3158 260.175 19.6804C259.356 20.0402 258.364 20.2202 257.199 20.2202C256.068 20.2202 255.085 20.045 254.252 19.6946C253.423 19.3442 252.775 18.8329 252.306 18.1605C251.842 17.4882 251.591 16.669 251.553 15.7031H254.145C254.183 16.2098 254.339 16.6312 254.614 16.9673C254.889 17.3035 255.246 17.5545 255.687 17.7202C256.132 17.8859 256.629 17.9688 257.178 17.9688C257.751 17.9688 258.253 17.8835 258.684 17.7131C259.119 17.5379 259.46 17.2964 259.706 16.9886C259.953 16.6761 260.078 16.3116 260.083 15.8949C260.078 15.5161 259.967 15.2036 259.749 14.9574C259.531 14.7064 259.226 14.4981 258.833 14.3324C258.445 14.1619 257.99 14.0104 257.469 13.8778L255.814 13.4517C254.616 13.1439 253.669 12.6776 252.973 12.0526C252.282 11.4228 251.937 10.5871 251.937 9.54545C251.937 8.68845 252.169 7.93797 252.633 7.29403C253.101 6.65009 253.738 6.15057 254.543 5.79545C255.348 5.43561 256.259 5.25568 257.277 5.25568C258.31 5.25568 259.214 5.43561 259.99 5.79545C260.772 6.15057 261.385 6.64536 261.83 7.27983C262.275 7.90956 262.505 8.634 262.519 9.45312H259.983Z"
          fill="#4E4B45"
        ></path>
        <path
          d="M116.412 43L112.833 29.9091H114.444L117.179 40.571H117.307L120.094 29.9091H121.884L124.671 40.571H124.799L127.535 29.9091H129.145L125.566 43H123.929L121.04 32.5682H120.938L118.049 43H116.412ZM134.598 43H132.936L137.743 29.9091H139.379L144.186 43H142.524L138.612 31.9801H138.51L134.598 43ZM135.212 37.8864H141.91V39.2926H135.212V37.8864ZM147.94 31.3153V29.9091H157.758V31.3153H153.642V43H152.056V31.3153H147.94ZM164.165 43V29.9091H172.065V31.3153H165.75V35.7386H171.656V37.1449H165.75V41.5938H172.167V43H164.165ZM178.882 43V29.9091H183.306C184.328 29.9091 185.168 30.0838 185.824 30.4332C186.48 30.7784 186.966 31.2536 187.282 31.8587C187.597 32.4638 187.755 33.152 187.755 33.9233C187.755 34.6946 187.597 35.3786 187.282 35.9751C186.966 36.5717 186.483 37.0405 185.831 37.3814C185.179 37.718 184.345 37.8864 183.331 37.8864H179.752V36.4545H183.28C183.979 36.4545 184.541 36.3523 184.968 36.1477C185.398 35.9432 185.709 35.6534 185.901 35.2784C186.097 34.8991 186.195 34.4474 186.195 33.9233C186.195 33.3991 186.097 32.9411 185.901 32.549C185.705 32.157 185.392 31.8544 184.961 31.6413C184.531 31.424 183.962 31.3153 183.255 31.3153H180.468V43H178.882ZM185.044 37.1193L188.266 43H186.425L183.255 37.1193H185.044ZM203.379 43V29.9091H207.955C208.867 29.9091 209.619 30.0668 210.212 30.3821C210.804 30.6932 211.245 31.1129 211.535 31.6413C211.825 32.1655 211.969 32.7472 211.969 33.3864C211.969 33.9489 211.869 34.4134 211.669 34.7798C211.473 35.1463 211.213 35.4361 210.889 35.6491C210.57 35.8622 210.222 36.0199 209.847 36.1222V36.25C210.248 36.2756 210.651 36.4162 211.055 36.6719C211.46 36.9276 211.799 37.294 212.072 37.7713C212.344 38.2486 212.481 38.8324 212.481 39.5227C212.481 40.179 212.332 40.7692 212.033 41.2933C211.735 41.8175 211.264 42.233 210.621 42.5398C209.977 42.8466 209.14 43 208.109 43H203.379ZM204.964 41.5938H208.109C209.144 41.5938 209.879 41.3935 210.314 40.9929C210.753 40.5881 210.972 40.098 210.972 39.5227C210.972 39.0795 210.859 38.6705 210.634 38.2955C210.408 37.9162 210.086 37.6136 209.668 37.3878C209.251 37.1577 208.756 37.0426 208.185 37.0426H204.964V41.5938ZM204.964 35.6619H207.904C208.381 35.6619 208.812 35.5682 209.195 35.3807C209.583 35.1932 209.89 34.929 210.116 34.5881C210.346 34.2472 210.461 33.8466 210.461 33.3864C210.461 32.8111 210.261 32.3232 209.86 31.9226C209.46 31.5178 208.825 31.3153 207.955 31.3153H204.964V35.6619ZM219.583 43H217.921L222.727 29.9091H224.364L229.171 43H227.509L223.597 31.9801H223.494L219.583 43ZM220.196 37.8864H226.895V39.2926H220.196V37.8864ZM245.55 29.9091V43H244.016L236.883 32.7216H236.755V43H235.17V29.9091H236.704L243.863 40.2131H243.991V29.9091H245.55ZM252.682 43V29.9091H254.268V36.4034H254.421L260.302 29.9091H262.373L256.876 35.8153L262.373 43H260.455L255.904 36.9148L254.268 38.7557V43H252.682Z"
          fill="#4E4B45"
        ></path>
      </svg>
      <svg
        class="brand__logo brand__logo--mark"
        viewBox="0 0 97 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.132 20.253C17.248 20.0786 26.0368 20.753 34.9495 25.6162C19.9511 20.7766 9.20989 20.9022 4.80346 23.17L10.132 20.253Z"
          fill="#75B6D4"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M84.6119 21.0179C78.6027 25.7935 65.956 25.4576 53.8952 23.0401C63.3993 26.6315 77.6023 27.9763 88.9442 23.0829L84.6119 21.0179Z"
          fill="#75B6D4"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 29.0521L11.1453 35.24C31.0301 22.9565 50.5681 47.1573 70.4712 41.5009C71.2225 41.2849 71.8639 40.7947 72.5593 40.4426C61.6485 41.0518 48.9818 38.3219 44.591 34.0613C55.3208 38.6296 66.534 39.8464 76.6754 38.2474L80.6849 36.0093C53.001 41.307 17.7872 14.7378 0 29.0521Z"
          fill="#75B6D4"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.7747 18.6636L17.2853 16.1606C36.0024 13.7845 65.1372 36.4297 90.4361 24.1725L96.4494 27.3023L89.1854 31.1822C61.3344 40.4046 35.7389 18.0784 12.7747 18.6636Z"
          fill="#75B6D4"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.8433 39.0564C29.4215 32.0964 45.0623 46.6529 62.8063 44.6923L60.3733 46.0025C42.6824 53.0217 32.1607 39.3072 20.8433 39.0564Z"
          fill="#859B44"
        ></path>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.1207 12.5143C41.9522 13.5038 61.3944 28.0414 80.7452 18.7748L67.7272 11.5319L64.4087 13.2502L58.1425 7.48075L53.3002 7.73316L46.8061 0L35.1746 8.71525L32.9631 7.48075L24.1207 12.5143Z"
          fill="#4E4B45"
        ></path>
      </svg>
    </a>
  </div>
  <div class="main-nav">
    <a
      href="/noria-design/prototypes/parcel-discovery"
      class="nav-sublink active"
      aria-current="page"
    >
      <span class="esa-icon esa-icon--sm" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          focusable="false"
        >
          <path
            d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"
          ></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </span>
      <span class="nav-sublink__label">Parcel Discovery Tool</span> </a
    ><a href="/noria-design/prototypes/scenarios" class="nav-sublink">
      <span class="esa-icon esa-icon--sm" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          focusable="false"
        >
          <path d="M16 7h6v6"></path>
          <path d="m22 7-8.5 8.5-5-5L2 17"></path>
        </svg>
      </span>
      <span class="nav-sublink__label">Scenarios</span>
    </a>
    <hr class="nav-divider" aria-hidden="true" />
    <a href="#" class="nav-sublink">
      <span class="esa-icon esa-icon--sm" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          focusable="false"
        >
          <path d="m3 11 18-5v12L3 14v-3z"></path>
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
        </svg>
      </span>
      <span class="nav-sublink__label">News</span> </a
    ><a href="#" class="nav-sublink">
      <span class="esa-icon esa-icon--sm" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          focusable="false"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <path d="M12 17h.01"></path>
        </svg>
      </span>
      <span class="nav-sublink__label">Help</span>
    </a>
  </div>
</nav>
```

## Styles
```css
.esa-icon {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--_icon-size);
  height: var(--_icon-size);
  line-height: 1;
  color: inherit;
}
.esa-icon--sm {
  --_icon-size: var(--icon-size-sm, var(--icon-size-small, 16px));
}
.esa-icon svg {
  display: block;
  width: var(--_icon-size);
  height: var(--_icon-size);
}
.esa-icon--md {
  --_icon-size: var(--icon-size-md, var(--icon-size-medium, 20px));
}
.esa-icon--xs {
  --_icon-size: var(--icon-size-xs, 14px);
}
.user-trigger > .esa-icon:last-child {
  flex-shrink: 0;
  color: var(--color-text-muted, #737373);
}
.side-nav {
  --_sidenav-bg: color-mix(
    in srgb,
    var(--color-primary, #235069) 3.5%,
    var(--color-surface, #fff)
  );
  --_nav-hover-bg: color-mix(in srgb, var(--color-primary, #235069) 8%, transparent);
  --_nav-active-bg: var(--noria-blue-100, #e7f1f7);
  --_nav-active-color: var(--color-primary, #235069);
  width: var(--_sidenav-w, 280px);
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--_sidenav-bg);
  font-size: 0.9375rem;
  overflow: visible;
  transition: width 0.2s ease-in-out;
  border-right: 1px solid var(--_chrome-border);
  flex-shrink: 0;
}
.sidebar-header {
  flex-shrink: 0;
  padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
  transition: padding 0.2s ease-in-out;
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-250, 0.625rem);
  padding: var(--spacing-200, 0.5rem);
  border-radius: var(--radius-100, 4px);
  text-decoration: none;
  transition: background 0.15s ease;
}
.brand__logo {
  display: block;
  flex-shrink: 0;
}
.brand__logo--full {
  height: 32px;
  width: auto;
}
.brand__logo--mark {
  height: 30px;
  width: auto;
}
.side-nav:not(.collapsed) .brand__logo--mark {
  display: none;
}
.main-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: visible;
  padding: var(--spacing-200, 0.5rem) var(--spacing-400, 1rem) var(--spacing-400, 1rem);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-050, 0.125rem);
  transition: padding 0.2s ease-in-out;
  scrollbar-width: none;
}
.nav-sublink {
  display: flex;
  align-items: center;
  gap: var(--spacing-250, 0.625rem);
  padding: var(--spacing-250, 0.625rem) var(--spacing-200, 0.5rem);
  color: var(--color-text-secondary, #404040);
  text-decoration: none;
  border-radius: var(--radius-100, 0.25rem);
  font-size: 0.9375rem;
  font-weight: var(--font-weight-medium, 500);
  transition: all 0.15s ease;
  line-height: 1.2;
  white-space: nowrap;
}
.nav-sublink.active {
  background: var(--_nav-active-bg, #f3f8fc);
  color: var(--_nav-active-color, #235069);
  font-weight: var(--font-weight-semibold, 600);
}
.nav-sublink .esa-icon {
  flex-shrink: 0;
  color: var(--color-text-tertiary, #525252);
  transition: color 0.15s ease;
}
.nav-sublink.active .esa-icon {
  color: var(--_nav-active-color, #235069);
}
.nav-sublink__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav-divider {
  flex-shrink: 0;
  height: 1px;
  margin: var(--spacing-200, 0.5rem) var(--spacing-100, 0.25rem);
  border: 0;
  background: var(--_chrome-border);
}
```

## Tokens
- `--color-primary`: #235069 _(semantic)_
- `--color-surface`: #ffffff _(semantic)_
- `--color-text-muted`: #737373 _(semantic)_
- `--color-text-secondary`: #525252 _(semantic)_
- `--color-text-tertiary`: #404040 _(semantic)_
- `--font-weight-medium`: 450 _(primitive)_
- `--font-weight-semibold`: 550 _(primitive)_
- `--icon-size-md`: 20px _(primitive)_
- `--icon-size-medium`: 20px _(component)_
- `--icon-size-sm`: 16px _(primitive)_
- `--icon-size-small`: 16px _(component)_
- `--icon-size-xs`: 14px _(primitive)_
- `--noria-blue-100`: #e7f1f7 _(component)_
- `--radius-100`: .25rem _(primitive)_
- `--spacing-050`: .125rem _(primitive)_
- `--spacing-100`: .25rem _(primitive)_
- `--spacing-200`: .5rem _(primitive)_
- `--spacing-250`: .625rem _(primitive)_
- `--spacing-300`: .75rem _(primitive)_
- `--spacing-400`: 1rem _(primitive)_
