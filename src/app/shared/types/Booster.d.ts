export interface ICard{
  name: string
  manaCost: string
  colorIdentity: string[]
  text: string
  imageUrl: string
  types: string[]
}

export interface ICardsResponse{
  cards: ICard[]
}
