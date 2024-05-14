export interface ISet{
  code: string
  name: string
  block: string
  releaseDate: string
}

export interface ISetResponse{
  sets: ISet[]
}
