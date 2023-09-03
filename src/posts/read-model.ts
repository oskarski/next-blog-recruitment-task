import { IPostDto } from '@/app/types'

export interface IPost extends IPostDto {
  createdAtDate: Date
}