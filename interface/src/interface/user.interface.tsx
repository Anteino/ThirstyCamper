interface ISkippedDinner {
  date: Date;
  amount: number;
}

interface IUser {
  name: string;
  beers: number;
  sodas: number;
  arrivalDate: string;
  departureDate: string;
  skippedDinners: ISkippedDinner[];
}

export default IUser;
