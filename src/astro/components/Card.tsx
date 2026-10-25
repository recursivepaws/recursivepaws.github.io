import { formatDate } from "../utils";
import type { Category, Post } from "../utils/sanity";
import { GalleryItem } from "./GalleryItem";
import { Icon } from "./Icon";
import { Badge } from "./ui/badge";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function Card({
  post,
  categories,
}: {
  post: Post;
  categories: Category[];
}) {
  const tags = categories.filter((c) =>
    post.tags.some((t) => t._ref === c._id),
  );

  return (
    <CardComponent className="w-full">
      <CardHeader>
        <CardTitle>
          <a href={`/post/${post.slug.current}`}>{post.title}</a>
        </CardTitle>
        <CardDescription>{formatDate(post.date)}</CardDescription>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag._id} className="gap-2">
                {tag.title}
                <Icon icon={tag.icon} />
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent style={{ position: "relative" }} className="w-full">
        {post.gallery?.length ? (
          <GalleryItem
            item={
              post.gallery.find((item) => item.preview === true) ||
              post.gallery[0]
            }
          />
        ) : (
          <div className="card__cover--none" />
        )}
      </CardContent>
    </CardComponent>
  );
}
