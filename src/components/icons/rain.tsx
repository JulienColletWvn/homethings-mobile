import Svg, { Path } from "react-native-svg";

export const Rain = ({ width, color }) => (
  <Svg
    width={width}
    height={width}
    viewBox={`0 0 ${width} ${width}`}
    fill="none"
  >
    <Path
      d="M4.15255 11.6926C4.21488 11.7134 4.27251 11.7462 4.32213 11.7893C4.37176 11.8324 4.4124 11.8848 4.44175 11.9436C4.4711 12.0024 4.48857 12.0664 4.49317 12.1319C4.49777 12.1975 4.4894 12.2633 4.46855 12.3256L3.96855 13.8256C3.92303 13.9466 3.83238 14.0453 3.71563 14.1009C3.59888 14.1566 3.46512 14.1648 3.34244 14.1239C3.21975 14.083 3.11768 13.9962 3.05766 13.8816C2.99764 13.7671 2.98434 13.6337 3.02055 13.5096L3.52055 12.0096C3.56233 11.8837 3.65239 11.7796 3.77091 11.7202C3.88943 11.6607 4.02671 11.6508 4.15255 11.6926ZM7.15255 11.6926C7.21488 11.7134 7.27251 11.7462 7.32213 11.7893C7.37176 11.8324 7.4124 11.8848 7.44175 11.9436C7.4711 12.0024 7.48857 12.0664 7.49317 12.1319C7.49777 12.1975 7.4894 12.2633 7.46855 12.3256L6.46855 15.3256C6.42303 15.4466 6.33238 15.5453 6.21563 15.6009C6.09888 15.6566 5.96512 15.6648 5.84244 15.6239C5.71975 15.583 5.61768 15.4962 5.55766 15.3816C5.49764 15.2671 5.48434 15.1337 5.52055 15.0096L6.52055 12.0096C6.56233 11.8837 6.65239 11.7796 6.77091 11.7202C6.88943 11.6607 7.02671 11.6508 7.15255 11.6926V11.6926ZM10.1526 11.6926C10.2149 11.7134 10.2725 11.7462 10.3221 11.7893C10.3718 11.8324 10.4124 11.8848 10.4418 11.9436C10.4711 12.0024 10.4886 12.0664 10.4932 12.1319C10.4978 12.1975 10.4894 12.2633 10.4686 12.3256L9.96855 13.8256C9.92303 13.9466 9.83238 14.0453 9.71563 14.1009C9.59888 14.1566 9.46512 14.1648 9.34244 14.1239C9.21975 14.083 9.11768 13.9962 9.05766 13.8816C8.99764 13.7671 8.98434 13.6337 9.02055 13.5096L9.52055 12.0096C9.56233 11.8837 9.65239 11.7796 9.77091 11.7202C9.88943 11.6607 10.0267 11.6508 10.1526 11.6926ZM13.1526 11.6926C13.2149 11.7134 13.2725 11.7462 13.3221 11.7893C13.3718 11.8324 13.4124 11.8848 13.4418 11.9436C13.4711 12.0024 13.4886 12.0664 13.4932 12.1319C13.4978 12.1975 13.4894 12.2633 13.4686 12.3256L12.4686 15.3256C12.4497 15.3901 12.4181 15.4502 12.3755 15.5023C12.3328 15.5543 12.2802 15.5972 12.2206 15.6285C12.161 15.6597 12.0958 15.6786 12.0287 15.684C11.9617 15.6894 11.8942 15.6812 11.8304 15.6599C11.7666 15.6386 11.7078 15.6047 11.6574 15.5602C11.607 15.5156 11.5661 15.4614 11.5372 15.4007C11.5082 15.3399 11.4919 15.274 11.489 15.2068C11.4861 15.1396 11.4969 15.0725 11.5206 15.0096L12.5206 12.0096C12.5623 11.8837 12.6524 11.7796 12.7709 11.7202C12.8894 11.6607 13.0267 11.6508 13.1526 11.6926ZM13.3996 4.69457C13.1919 3.64773 12.6548 2.69478 11.8668 1.97505C11.0787 1.25532 10.0811 0.806557 9.01979 0.69438C7.95847 0.582202 6.88909 0.812493 5.96801 1.35158C5.04694 1.89067 4.32248 2.71028 3.90055 3.69057C3.42739 3.63606 2.94808 3.6787 2.49197 3.81588C2.03586 3.95305 1.61255 4.18188 1.24795 4.48835C0.88335 4.79481 0.585139 5.17247 0.371573 5.5982C0.158007 6.02393 0.0335803 6.48876 0.00591111 6.96425C-0.0217581 7.43974 0.0479124 7.91587 0.210657 8.36349C0.373402 8.81112 0.625796 9.22082 0.952386 9.5675C1.27898 9.91419 1.67289 10.1906 2.11001 10.3797C2.54713 10.5689 3.01826 10.6668 3.49455 10.6676H12.9946C13.7557 10.6684 14.4886 10.38 15.045 9.86064C15.6014 9.3413 15.9396 8.62989 15.9911 7.87052C16.0426 7.11116 15.8035 6.36061 15.3223 5.77091C14.8412 5.18121 14.1538 4.79645 13.3996 4.69457V4.69457ZM8.49455 1.66757C9.47851 1.66737 10.428 2.02984 11.1615 2.68568C11.895 3.34153 12.3611 4.24472 12.4706 5.22257C12.4841 5.34543 12.5428 5.4589 12.6351 5.54108C12.7274 5.62326 12.8469 5.66832 12.9706 5.66757H12.9946C13.525 5.66757 14.0337 5.87828 14.4088 6.25336C14.7838 6.62843 14.9946 7.13714 14.9946 7.66757C14.9946 8.198 14.7838 8.70671 14.4088 9.08178C14.0337 9.45686 13.525 9.66757 12.9946 9.66757H3.49455C3.14063 9.6674 2.79077 9.59207 2.46813 9.44658C2.14549 9.3011 1.85742 9.08876 1.62297 8.82363C1.38852 8.55849 1.21304 8.24659 1.10813 7.90857C1.00323 7.57055 0.971295 7.2141 1.01444 6.86282C1.05758 6.51153 1.17482 6.17341 1.35841 5.87082C1.54199 5.56823 1.78773 5.30806 2.07937 5.10754C2.37101 4.90701 2.7019 4.7707 3.05016 4.70761C3.39842 4.64452 3.7561 4.6561 4.09955 4.74157C4.22208 4.77213 4.35164 4.7552 4.46219 4.69417C4.57275 4.63314 4.65612 4.53254 4.69555 4.41257C4.95983 3.61375 5.46917 2.91854 6.15117 2.42575C6.83317 1.93296 7.65314 1.66767 8.49455 1.66757V1.66757Z"
      fill={color}
    />
  </Svg>
);