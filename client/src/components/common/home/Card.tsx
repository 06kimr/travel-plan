interface CardProps {
  title: string;
  description: string;
  image: string;
}

export default function Card({ title, description, image }: CardProps) {
  return (
    <div className="flex flex-col ">
      <img
        src={image}
        alt={title}
        className="w-[316px] h-190 rounded-10 mb-20"
      />
      <div className="px-11">
        <h3 className="text-22 text-gray900 font-medium mb-10">{title}</h3>
        <p className="text-gray600 text-16">{description}</p>
      </div>
    </div>
  );
}
