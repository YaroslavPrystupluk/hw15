export interface IParam {
  page: number
  size: number
}

export interface IUsers {
  id: number
  email: string
  password: string
  confirmPassword?: string
}

export interface INewspost {
  id: number
  title: string
  text: string
  author: IUsers
  createdAt: Date
  updatedAt: Date
}
