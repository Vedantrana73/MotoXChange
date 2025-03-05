import { Card, CardContent } from "../components/ui/card.tsx";

export default function ServiceCard({ title, description, image }) {
  return (
    <Card className={`rounded-xl shadow-lg overflow-hidden w-75 md:w-80 min-h-60 md:min-h-90 border border-gray-400`}>
      <div className="h-40 md:h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-b-4xl" />
      </div>
      <CardContent className="p-5 text-center">
        <h3 className="text-lg md:text-xl font-bold">{title}</h3>
        <p className="mt-2 font-semibold text-sm md:text-lg">{description}</p>
      </CardContent>
    </Card>
  );
}
