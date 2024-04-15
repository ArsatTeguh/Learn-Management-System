import { ActionType } from '@/app/watch-course/_component/typeData';

type Props = {
  actionSocket: ActionType | {}
  user: string
  like: boolean
  dislike: boolean
};

export function CalculateAction(data: Props) {
  const action = data.actionSocket as ActionType;
  const isLike = action.like.includes(data.user);
  const isDislike = action.dislike.includes(data.user);
  const { like, dislike, id } = action;

  if (isLike && data.like) {
    const newdata = action.like.filter((likeValue: any) => likeValue !== data.user);
    return { id, like: newdata, dislike };
  // eslint-disable-next-line no-else-return
  } else if (isDislike && data.dislike) {
    const newdata = action.dislike
      .filter((dislikeValue: any) => dislikeValue !== data.user);
    return { id, like, dislike: newdata };
  } else if (!isLike && data.like) {
    const newdata = [...action.like, data.user];
    return { id, like: newdata, dislike };
  } else if (!isDislike && data.dislike) {
    const newdata = [...action.dislike, data.user];
    return { id, like, dislike: newdata };
  }
  return data;
}
