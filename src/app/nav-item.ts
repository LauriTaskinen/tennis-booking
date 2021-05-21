//Rajapintaluokka NavItem määrittää navigointipalkin oliot.
export interface NavItem {
  label: string;
  icon: string;
  path: string;
  mobileView: boolean;
  tabletView: boolean;
  desktopView: boolean;
  logIn?: Function;
  logOut?: Function;
}
