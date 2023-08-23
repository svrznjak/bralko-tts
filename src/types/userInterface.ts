export interface IUser {
  id: string;
  email: string;
  premiumCharacters: number;
  reloadDate: number;
  standardCharacters: number;
  subscription?: ISubscription;
}

interface ISubscription {
  expiryDate: number;
  purchaseDate: number;
  subscriptionId: string;
}
