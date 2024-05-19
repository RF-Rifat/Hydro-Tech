export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Scan",
    route: "/scan",
  },
  // {
  //   label: 'My Profile',
  //   route: '/detect/diseases',
  // },
];

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}
